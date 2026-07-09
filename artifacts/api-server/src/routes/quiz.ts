import { Router } from "express";
import { db } from "@workspace/db";
import {
  quizzesTable,
  quizQuestionsTable,
  quizAttemptsTable,
  quizSessionsTable,
  userStatsTable,
} from "@workspace/db";
import { eq, sql, desc, asc } from "drizzle-orm";
import { requireAuth, getAuth } from "@clerk/express";
import crypto from "crypto";

const router = Router();

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

// POST /quiz/sessions — create a session
router.post("/sessions", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { quizId, displayName } = req.body as { quizId: number; displayName?: string };
  const hostName = displayName?.trim() || "Host";
  const code = crypto.randomBytes(3).toString("hex").toUpperCase();

  const [session] = await db
    .insert(quizSessionsTable)
    .values({
      code,
      quizId,
      status: "waiting",
      hostUserId: userId,
      currentQuestion: 0,
      participants: [{ userId, displayName: hostName, score: 0, answeredCount: 0 }],
    })
    .returning();

  res.status(201).json({ ...session, createdAt: session.createdAt?.toISOString() ?? new Date().toISOString() });
});

// GET /quiz/sessions/:code
router.get("/sessions/:code", async (req, res) => {
  const code = String(req.params.code);
  const session = await db.select().from(quizSessionsTable).where(eq(quizSessionsTable.code, code)).limit(1);
  if (!session[0]) { res.status(404).json({ error: "Session not found" }); return; }
  res.json({ ...session[0], createdAt: session[0].createdAt?.toISOString() ?? new Date().toISOString() });
});

// POST /quiz/sessions/:code/join
router.post("/sessions/:code/join", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const code = String(req.params.code);
  const { displayName } = req.body as { displayName?: string };

  type JoinResult =
    | { kind: "error"; status: number; message: string }
    | { kind: "ok"; session: typeof quizSessionsTable.$inferSelect };

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
    if (existing) return { kind: "ok", session };

    const playerName = displayName?.trim() || `Player ${session.participants.length + 1}`;
    const newParticipants = [
      ...session.participants,
      { userId, displayName: playerName, score: 0, answeredCount: 0 },
    ];
    const [updated] = await tx
      .update(quizSessionsTable)
      .set({ participants: newParticipants })
      .where(eq(quizSessionsTable.code, code))
      .returning();
    return { kind: "ok", session: updated };
  });

  if (result.kind === "error") {
    res.status(result.status).json({ error: result.message });
    return;
  }
  res.json({ ...result.session, createdAt: result.session.createdAt?.toISOString() ?? new Date().toISOString() });
});

// POST /quiz/sessions/:code/start — host only
router.post("/sessions/:code/start", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const code = String(req.params.code);
  const session = await db.select().from(quizSessionsTable).where(eq(quizSessionsTable.code, code)).limit(1);
  if (!session[0]) { res.status(404).json({ error: "Session not found" }); return; }
  if (session[0].hostUserId !== userId) { res.status(403).json({ error: "Only the host can start the session" }); return; }
  if (session[0].status !== "waiting") { res.status(400).json({ error: "Session already started" }); return; }

  const [updated] = await db
    .update(quizSessionsTable)
    .set({ status: "active", currentQuestion: 0 })
    .where(eq(quizSessionsTable.code, code))
    .returning();

  res.json({ ...updated, createdAt: updated.createdAt?.toISOString() ?? new Date().toISOString() });
});

// POST /quiz/sessions/:code/answer
router.post("/sessions/:code/answer", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const code = String(req.params.code);
  const { questionId, answerIndex } = req.body as { questionId: number; answerIndex: number };

  type TxResult =
    | { kind: "error"; status: number; message: string }
    | { kind: "already_answered"; session: typeof quizSessionsTable.$inferSelect }
    | { kind: "ok"; session: typeof quizSessionsTable.$inferSelect; finished: boolean; finalParticipants: Array<{ userId: string; displayName: string; score: number; answeredCount: number }> };

  const txResult = await db.transaction(async (tx): Promise<TxResult> => {
    // Row-level lock prevents concurrent answer overwrites
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

    // Idempotent: if already answered this question, return current state
    if (participant.answeredCount > currentQ) {
      return { kind: "already_answered", session };
    }

    // Validate that questionId matches the actual current question
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

    const newParticipants = session.participants.map((p) =>
      p.userId === userId
        ? { ...p, score: correct ? p.score + 1 : p.score, answeredCount: p.answeredCount + 1 }
        : p
    );

    const allAnswered = newParticipants.every((p) => p.answeredCount >= currentQ + 1);
    const nextQ = currentQ + 1;
    const finished = allAnswered && nextQ >= questions.length;

    const [updated] = await tx
      .update(quizSessionsTable)
      .set({
        participants: newParticipants,
        currentQuestion: allAnswered ? nextQ : currentQ,
        status: finished ? "finished" : "active",
      })
      .where(eq(quizSessionsTable.code, code))
      .returning();

    // Award XP atomically in the same transaction that flips status to "finished"
    if (finished) {
      const sorted = [...newParticipants].sort((a, b) => b.score - a.score);
      const xpTiers = [100, 60, 30, 10]; // 1st, 2nd, 3rd, rest
      await Promise.all(
        sorted.map((p, idx) => {
          const xp = xpTiers[Math.min(idx, xpTiers.length - 1)];
          return tx
            .insert(userStatsTable)
            .values({ userId: p.userId, displayName: p.displayName, email: "", xp, lessonsCompleted: 0, quizzesPassed: 1 })
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

    return { kind: "ok", session: updated, finished, finalParticipants: newParticipants };
  });

  if (txResult.kind === "error") {
    res.status(txResult.status).json({ error: txResult.message });
    return;
  }

  if (txResult.kind === "already_answered") {
    res.json({ ...txResult.session, createdAt: txResult.session.createdAt?.toISOString() ?? new Date().toISOString() });
    return;
  }

  res.json({ ...txResult.session, createdAt: txResult.session.createdAt?.toISOString() ?? new Date().toISOString() });
});

export default router;
