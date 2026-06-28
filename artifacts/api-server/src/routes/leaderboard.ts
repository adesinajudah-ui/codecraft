import { Router } from "express";
import { db } from "@workspace/db";
import { userStatsTable } from "@workspace/db";
import { desc, sql } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);

  const users = await db
    .select()
    .from(userStatsTable)
    .orderBy(desc(userStatsTable.xp))
    .limit(limit);

  const leaderboard = users.map((u, i) => ({
    rank: i + 1,
    userId: u.userId,
    displayName: u.displayName,
    xp: u.xp,
    completedCourses: Math.floor(u.lessonsCompleted / 5),
    quizzesPassed: u.quizzesPassed,
  }));

  res.json(leaderboard);
});

export default router;
