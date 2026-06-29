import { Router } from "express";
import { db } from "@workspace/db";
import { userStatsTable, userProgressTable, lessonsTable, coursesTable, languagesTable } from "@workspace/db";
import { desc, eq, sql } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
  const languageSlug = req.query.languageSlug as string | undefined;

  if (languageSlug) {
    const [lang] = await db
      .select()
      .from(languagesTable)
      .where(eq(languagesTable.slug, languageSlug))
      .limit(1);

    if (!lang) {
      res.json([]);
      return;
    }

    const courses = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.languageId, lang.id));

    const courseIds = courses.map((c) => c.id);
    if (courseIds.length === 0) {
      res.json([]);
      return;
    }

    const allLessons = await db
      .select()
      .from(lessonsTable)
      .where(sql`${lessonsTable.courseId} = ANY(${courseIds})`);

    const lessonIds = allLessons.map((l) => l.id);
    if (lessonIds.length === 0) {
      res.json([]);
      return;
    }

    const completions = await db
      .select({
        userId: userProgressTable.userId,
        count: sql<number>`count(*)::int`,
        xp: sql<number>`coalesce(sum(${lessonsTable.xpReward}), 0)::int`,
      })
      .from(userProgressTable)
      .innerJoin(lessonsTable, eq(lessonsTable.id, userProgressTable.lessonId))
      .where(sql`${userProgressTable.lessonId} = ANY(${lessonIds})`)
      .groupBy(userProgressTable.userId)
      .orderBy(desc(sql`coalesce(sum(${lessonsTable.xpReward}), 0)`))
      .limit(limit);

    const userIds = completions.map((c) => c.userId);
    const statsMap = new Map<string, typeof userStatsTable.$inferSelect>();
    if (userIds.length > 0) {
      const stats = await db
        .select()
        .from(userStatsTable)
        .where(sql`${userStatsTable.userId} = ANY(${userIds})`);
      for (const s of stats) statsMap.set(s.userId, s);
    }

    const leaderboard = completions.map((c, i) => ({
      rank: i + 1,
      userId: c.userId,
      displayName: statsMap.get(c.userId)?.displayName ?? "Anonymous",
      xp: c.xp,
      completedCourses: c.count,
      quizzesPassed: statsMap.get(c.userId)?.quizzesPassed ?? 0,
    }));

    res.json(leaderboard);
    return;
  }

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
    completedCourses: u.lessonsCompleted,
    quizzesPassed: u.quizzesPassed,
  }));

  res.json(leaderboard);
});

export default router;
