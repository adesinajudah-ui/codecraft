import { Router, type Response } from "express";
import { db } from "@workspace/db";
import {
  quizzesTable,
  quizQuestionsTable,
  quizAttemptsTable,
  quizSessionsTable,
  userStatsTable,
  type SessionParticipant,
} from "@workspace/db";
import { eq, sql, desc, asc } from "drizzle-orm";
import { requireAuth, getAuth } from "@clerk/express";
import crypto from "crypto";

const router = Router();

// ── SSE infrastructure ────────────────────────────────────────────────────────

/** Map of sessionCode → Set of open SSE response objects */
const sseClients = new Map<string, Set<Response>>();

/** Tracks when the current question started (in-memory, resets on restart) */
const questionStartTimes = new Map<string, number>();

function broadcastToSession(code: string, event: string, data: unknown) {
  const clients = sseClients.get(code);
  if (!clients || clients.size === 0) return;
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of clients) {
    try {
      res.write(payload);
    } catch {
      clients.delete(res);
    }
  }
}

function serializeSession(session: typeof quizSessionsTable.$inferSelect) {
  return { ...session, createdAt: session.createdAt?.toISOString() ?? new Date().toISOString() };
}

function makeParticipant(
  userId: string,
  displayName: string,
  totalXp: number
): SessionParticipant {
  return {
    userId,
    displayName,
    score: 0,
    answeredCount: 0,
    correctCount: 0,
    wrongCount: 0,
    answerTimes: [],
    fastAnswerCount: 0,
    isFinished: false,
    joinedAt: Date.now(),
    totalXp,
  };
}

// ── SSE endpoint ──────────────────────────────────────────────────────────────

// GET /quiz/sessions/:code/events
router.get("/sessions/:code/events", (req, res) => {
  const code = String(req.params.code).toUpperCase();

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // prevent nginx buffering
  res.flushHeaders();

  // Send a heartbeat comment every 20 s to keep the connection alive
  const heartbeat = setInterval(() => {
    try {
      res.write(": heartbeat\n\n");
    } catch {
      clearInterval(heartbeat);
    }
  }, 20_000);

  if (!sseClients.has(code)) sseClients.set(code, new Set());
  sseClients.get(code)!.add(res);

  req.on("close", () => {
    clearInterval(heartbeat);
    sseClients.get(code)?.delete(res);
  });
});

// ── Solo quiz ─────────────────────────────────────────────────────────────────

// GET /quiz/course/:courseId
router.get("/course/:courseId", async (req, res) => {
  const courseId = parseInt(String(req.params.courseId));
  if (isNaN(courseId)) { res.status(400).json({ error: "Invalid courseId" }); return; }

  const quiz = await db.select().from(quizzesTable).where(eq(quizzesTable.courseId, courseId)).limit(1);
  if (!quiz[0]) { res.status(404).json({ error: "Quiz not found" }); return; }

  const questions = await db
    .select()
    .from(quizQuestionsTable)
    .where(eq(quizQuestionsTable.quizId, quiz[0].id))
    .orderBy(asc(quizQuestionsTable.id));
  res.json({ ...quiz[0], questions });
});

// GET /quiz/attempts/me
router.get("/attempts/me", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const attempts = await db
    .select()
    .from(quizAttemptsTable)
    .where(eq(quizAttemptsTable.userId, userId))
    .orderBy(desc(quizAttemptsTable.completedAt));

  res.json(attempts.map((a) => ({ ...a, completedAt: a.completedAt?.toISOString() ?? new Date().toISOString() })));
});

// POST /quiz/attempts
router.post("/attempts", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { quizId, answers } = req.body as { quizId: number; answers: number[] };

  const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.quizId, quizId));
  if (questions.length === 0) { res.status(404).json({ error: "Quiz not found" }); return; }

  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (answers[i] === questions[i].correctIndex) score++;
  }

  const passed = score >= Math.ceil(questions.length * 0.6);
  const xpAwarded = passed ? 50 : 10;

  const [attempt] = await db
    .insert(quizAttemptsTable)
    .values({ userId, quizId, score, totalQuestions: questions.length, xpAwarded })
    .returning();

  if (passed) {
    await db
      .insert(userStatsTable)
      .values({ userId, displayName: "User", email: "", xp: xpAwarded, lessonsCompleted: 0, quizzesPassed: 1 })
      .onConflictDoUpdate({
        target: userStatsTable.userId,
        set: {
          xp: sql`${userStatsTable.xp} + ${xpAwarded}`,
          quizzesPassed: sql`${userStatsTable.quizzesPassed} + 1`,
          lastActive: new Date(),
        },
      });
  }

  res.status(201).json({ ...attempt, completedAt: attempt.completedAt?.toISOString() ?? new Date().toISOString() });
});

// ── Multiplayer sessions ──────────────────────────────────────────────────────

// POST /quiz/sessions — create a session
router.post("/sessions", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { quizId, displayName } = req.body as { quizId: number; displayName?: string };
  const hostName = displayName?.trim() || "Host";
  const code = crypto.randomBytes(3).toString("hex").toUpperCase();

  // Look up host's existing XP
  const stats = await db.select().from(userStatsTable).where(eq(userStatsTable.userId, userId)).limit(1);
  const totalXp = stats[0]?.xp ?? 0;

  const [session] = await db
    .insert(quizSessionsTable)
    .values({
      code,
      quizId,
      status: "waiting",
      hostUserId: userId,
      currentQuestion: 0,
      participants: [makeParticipant(userId, hostName, totalXp)],
    })
    .returning();

  res.status(201).json(serializeSession(session));
});

// GET /quiz/sessions/:code
router.get("/sessions/:code", async (req, res) => {
  const code = String(req.params.code).toUpperCase();
  const session = await db.select().from(quizSessionsTable).where(eq(quizSessionsTable.code, code)).limit(1);
  if (!session[0]) { res.status(404).json({ error: "Session not found" }); return; }
  res.json(serializeSession(session[0]));
});

// GET /quiz/sessions/:code/meta — lightweight: returns courseId so clients can redirect before joining
router.get("/sessions/:code/meta", async (req, res) => {
  const code = String(req.params.code).toUpperCase();
  const rows = await db
    .select({ quizId: quizSessionsTable.quizId, courseId: quizzesTable.courseId })
    .from(quizSessionsTable)
    .innerJoin(quizzesTable, eq(quizSessionsTable.quizId, quizzesTable.id))
    .where(eq(quizSessionsTable.code, code))
    .limit(1);
  if (!rows[0]) { res.status(404).json({ error: "Session not found" }); return; }
  res.json({ quizId: rows[0].quizId, courseId: rows[0].courseId });
});

// POST /quiz/sessions/:code/join
router.post("/sessions/:code/join", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const code = String(req.params.code).toUpperCase();
  const { displayName } = req.body as { displayName?: string };

  // Look up joiner's existing XP (outside transaction is fine — read-only)
  const stats = await db.select().from(userStatsTable).where(eq(userStatsTable.userId, userId)).limit(1);
  const totalXp = stats[0]?.xp ?? 0;

  type JoinResult =
    | { kind: "error"; status: number; message: string }
    | { kind: "ok"; session: typeof quizSessionsTable.$inferSelect; justJoined: boolean; joinedName: string };

  const result = await db.transaction(async (tx): Promise<JoinResult> => {
    const sessions = await tx
      .select()
      .from(quizSessionsTable)
      .where(eq(quizSessionsTable.code, code))
      .for("update")
      .limit(1);

    if (!sessions[0]) return { kind: "error", status: 404, message: "Session not found" };
    const session = sessions[0];
    if (session.status !== "waiting") return { kind: "error", status: 400, message: "Session already started" };

    const existing = session.participants.find((p) => p.userId === userId);
    if (existing) return { kind: "ok", session, justJoined: false, joinedName: existing.displayName };

    const playerName = displayName?.trim() || `Player ${session.participants.length + 1}`;
    const newParticipants: SessionParticipant[] = [
      ...session.participants,
      makeParticipant(userId, playerName, totalXp),
    ];

    // No auto-start and no participant cap: the room stays open in "waiting"
    // status so any number of players can join. The host explicitly starts
    // the competition via POST /sessions/:code/start when ready.
    const [updated] = await tx
      .update(quizSessionsTable)
      .set({ participants: newParticipants })
      .where(eq(quizSessionsTable.code, code))
      .returning();

    return { kind: "ok", session: updated, justJoined: true, joinedName: playerName };
  });

  if (result.kind === "error") {
    res.status(result.status).json({ error: result.message });
    return;
  }

  // When a new player joins, broadcast join notification + updated session
  if (result.justJoined) {
    broadcastToSession(code, "player_joined", { displayName: result.joinedName });
    broadcastToSession(code, "session_update", serializeSession(result.session));
  }

  res.json(serializeSession(result.session));
});

// POST /quiz/sessions/:code/start — host only
router.post("/sessions/:code/start", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const code = String(req.params.code).toUpperCase();
  const session = await db.select().from(quizSessionsTable).where(eq(quizSessionsTable.code, code)).limit(1);
  if (!session[0]) { res.status(404).json({ error: "Session not found" }); return; }
  if (session[0].hostUserId !== userId) { res.status(403).json({ error: "Only the host can start the session" }); return; }
  if (session[0].status !== "waiting") { res.status(400).json({ error: "Session already started" }); return; }

  const [updated] = await db
    .update(quizSessionsTable)
    .set({ status: "active", currentQuestion: 0 })
    .where(eq(quizSessionsTable.code, code))
    .returning();

  questionStartTimes.set(code, Date.now());
  broadcastToSession(code, "session_update", serializeSession(updated));

  res.json(serializeSession(updated));
});

// POST /quiz/sessions/:code/answer
router.post("/sessions/:code/answer", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const code = String(req.params.code).toUpperCase();
  const { questionId, answerIndex } = req.body as { questionId: number; answerIndex: number };

  // Compute answer speed before entering the transaction
  const questionStartedAt = questionStartTimes.get(code) ?? Date.now();
  const answerTimeMs = Date.now() - questionStartedAt;
  const isFastAnswer = answerTimeMs < 10_000; // under 10 seconds

  type TxResult =
    | { kind: "error"; status: number; message: string }
    | { kind: "already_answered"; session: typeof quizSessionsTable.$inferSelect }
    | { kind: "ok"; session: typeof quizSessionsTable.$inferSelect; advancedQuestion: boolean };

  const txResult = await db.transaction(async (tx): Promise<TxResult> => {
    const sessions = await tx
      .select()
      .from(quizSessionsTable)
      .where(eq(quizSessionsTable.code, code))
      .for("update")
      .limit(1);

    const session = sessions[0];
    if (!session) return { kind: "error", status: 404, message: "Session not found" };
    if (session.status !== "active") return { kind: "error", status: 400, message: "Session not active" };

    const currentQ = session.currentQuestion ?? 0;
    const participant = session.participants.find((p) => p.userId === userId);
    if (!participant) return { kind: "error", status: 400, message: "Not a participant" };

    if (participant.answeredCount > currentQ) {
      return { kind: "already_answered", session };
    }

    const questions = await tx
      .select()
      .from(quizQuestionsTable)
      .where(eq(quizQuestionsTable.quizId, session.quizId))
      .orderBy(asc(quizQuestionsTable.id));

    const currentQuestion = questions[currentQ];
    if (!currentQuestion || currentQuestion.id !== questionId) {
      return { kind: "error", status: 400, message: "Question ID does not match current question" };
    }

    const correct = currentQuestion.correctIndex === answerIndex;

    const newParticipants: SessionParticipant[] = session.participants.map((p) => {
      if (p.userId !== userId) return p;
      return {
        ...p,
        score: correct ? p.score + 1 : p.score,
        answeredCount: p.answeredCount + 1,
        correctCount: correct ? p.correctCount + 1 : p.correctCount,
        wrongCount: correct ? p.wrongCount : p.wrongCount + 1,
        answerTimes: [...p.answerTimes, answerTimeMs],
        fastAnswerCount: isFastAnswer ? p.fastAnswerCount + 1 : p.fastAnswerCount,
      };
    });

    const allAnswered = newParticipants.every((p) => p.answeredCount >= currentQ + 1);
    const nextQ = currentQ + 1;
    const finished = allAnswered && nextQ >= questions.length;

    const finalParticipants: SessionParticipant[] = finished
      ? newParticipants.map((p) => ({ ...p, isFinished: true }))
      : newParticipants;

    const [updated] = await tx
      .update(quizSessionsTable)
      .set({
        participants: finalParticipants,
        currentQuestion: allAnswered ? nextQ : currentQ,
        status: finished ? "finished" : "active",
      })
      .where(eq(quizSessionsTable.code, code))
      .returning();

    // Award XP when the competition ends
    if (finished) {
      const sorted = [...finalParticipants].sort((a, b) => b.score - a.score);
      const totalQuestions = questions.length;
      const winnerId = sorted[0]?.userId;

      await Promise.all(
        finalParticipants.map((p) => {
          // XP breakdown per spec:
          // +10 per correct answer, +5 per fast answer, +100 win bonus, +50 perfect score
          const correctXp = p.correctCount * 10;
          const fastXp = p.fastAnswerCount * 5;
          const winBonus = p.userId === winnerId ? 100 : 0;
          const perfectBonus = p.correctCount === totalQuestions ? 50 : 0;
          const xp = correctXp + fastXp + winBonus + perfectBonus;

          return tx
            .insert(userStatsTable)
            .values({
              userId: p.userId,
              displayName: p.displayName,
              email: "",
              xp,
              lessonsCompleted: 0,
              quizzesPassed: 1,
            })
            .onConflictDoUpdate({
              target: userStatsTable.userId,
              set: {
                xp: sql`${userStatsTable.xp} + ${xp}`,
                quizzesPassed: sql`${userStatsTable.quizzesPassed} + 1`,
                displayName: p.displayName,
                lastActive: new Date(),
              },
            });
        })
      );
    }

    return { kind: "ok", session: updated, advancedQuestion: allAnswered && !finished };
  });

  if (txResult.kind === "error") {
    res.status(txResult.status).json({ error: txResult.message });
    return;
  }

  if (txResult.kind === "already_answered") {
    res.json(serializeSession(txResult.session));
    return;
  }

  // If question advanced, record new question start time
  if (txResult.advancedQuestion) {
    questionStartTimes.set(code, Date.now());
  }
  // Clean up start time when session finishes
  if (txResult.session.status === "finished") {
    questionStartTimes.delete(code);
  }

  // Broadcast updated session state to all connected clients
  broadcastToSession(code, "session_update", serializeSession(txResult.session));

  res.json(serializeSession(txResult.session));
});

export default router;
