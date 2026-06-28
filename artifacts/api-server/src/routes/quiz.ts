import { Router } from "express";
import { db } from "@workspace/db";
import {
  quizzesTable,
  quizQuestionsTable,
  quizAttemptsTable,
  quizSessionsTable,
  userStatsTable,
} from "@workspace/db";
import { eq, sql, desc } from "drizzle-orm";
import { requireAuth, getAuth } from "@clerk/express";
import crypto from "crypto";

const router = Router();

// GET /quiz/course/:courseId
router.get("/course/:courseId", async (req, res) => {
  const courseId = parseInt(String(req.params.courseId));
  if (isNaN(courseId)) { res.status(400).json({ error: "Invalid courseId" }); return; }

  const quiz = await db.select().from(quizzesTable).where(eq(quizzesTable.courseId, courseId)).limit(1);
  if (!quiz[0]) { res.status(404).json({ error: "Quiz not found" }); return; }

  const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.quizId, quiz[0].id));
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

// POST /quiz/sessions
router.post("/sessions", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { quizId } = req.body as { quizId: number };
  const code = crypto.randomBytes(3).toString("hex").toUpperCase();

  const [session] = await db
    .insert(quizSessionsTable)
    .values({
      code,
      quizId,
      status: "waiting",
      hostUserId: userId,
      participants: [{ userId, displayName: "Host", score: 0, answeredCount: 0 }],
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
  const session = await db.select().from(quizSessionsTable).where(eq(quizSessionsTable.code, code)).limit(1);
  if (!session[0]) { res.status(404).json({ error: "Session not found" }); return; }

  const existing = session[0].participants.find((p) => p.userId === userId);
  if (!existing) {
    const newParticipants = [
      ...session[0].participants,
      { userId, displayName: `Player ${session[0].participants.length + 1}`, score: 0, answeredCount: 0 },
    ];
    const [updated] = await db
      .update(quizSessionsTable)
      .set({ participants: newParticipants, status: "active" })
      .where(eq(quizSessionsTable.code, code))
      .returning();
    res.json({ ...updated, createdAt: updated.createdAt?.toISOString() ?? new Date().toISOString() });
    return;
  }

  res.json({ ...session[0], createdAt: session[0].createdAt?.toISOString() ?? new Date().toISOString() });
});

// POST /quiz/sessions/:code/answer
router.post("/sessions/:code/answer", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const code = String(req.params.code);
  const { questionId, answerIndex } = req.body as { questionId: number; answerIndex: number };

  const session = await db.select().from(quizSessionsTable).where(eq(quizSessionsTable.code, code)).limit(1);
  if (!session[0]) { res.status(404).json({ error: "Session not found" }); return; }

  const question = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.id, questionId)).limit(1);
  const correct = question[0]?.correctIndex === answerIndex;

  const newParticipants = session[0].participants.map((p) => {
    if (p.userId === userId) {
      return { ...p, score: correct ? p.score + 1 : p.score, answeredCount: p.answeredCount + 1 };
    }
    return p;
  });

  const allAnswered = newParticipants.every((p) => p.answeredCount >= (session[0].currentQuestion ?? 0) + 1);
  const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.quizId, session[0].quizId));
  const nextQ = (session[0].currentQuestion ?? 0) + 1;
  const finished = allAnswered && nextQ >= questions.length;

  const [updated] = await db
    .update(quizSessionsTable)
    .set({
      participants: newParticipants,
      currentQuestion: allAnswered ? nextQ : session[0].currentQuestion,
      status: finished ? "finished" : "active",
    })
    .where(eq(quizSessionsTable.code, code))
    .returning();

  res.json({ ...updated, createdAt: updated.createdAt?.toISOString() ?? new Date().toISOString() });
});

export default router;
