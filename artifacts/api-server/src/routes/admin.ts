import { Router } from "express";
import { db } from "@workspace/db";
import {
  userStatsTable,
  userProgressTable,
  quizAttemptsTable,
  languagesTable,
  lessonsTable,
  coursesTable,
} from "@workspace/db";
import { requireAuth, getAuth } from "@clerk/express";
import { eq, sql, gte, ilike, or } from "drizzle-orm";

const router = Router();

function isAdmin(req: import("express").Request) {
  const auth = getAuth(req);
  return (auth?.sessionClaims?.publicMetadata as { role?: string } | undefined)?.role === "admin";
}

router.get("/stats", requireAuth(), async (req, res) => {
  if (!isAdmin(req)) { res.status(403).json({ error: "Forbidden" }); return; }

  const totalUsers = await db.select({ count: sql<number>`count(*)::int` }).from(userStatsTable);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);

  const activeToday = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(userStatsTable)
    .where(gte(userStatsTable.lastActive, today));

  const activeWeek = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(userStatsTable)
    .where(gte(userStatsTable.lastActive, weekAgo));

  const totalLessons = await db.select({ count: sql<number>`count(*)::int` }).from(userProgressTable);
  const totalQuizzes = await db.select({ count: sql<number>`count(*)::int` }).from(quizAttemptsTable);

  const langs = await db.select().from(languagesTable);
  const breakdown = await Promise.all(langs.map(async (lang) => {
    const courses = await db.select().from(coursesTable).where(eq(coursesTable.languageId, lang.id));
    const courseIds = courses.map((c) => c.id);
    let lessonsCompleted = 0;
    if (courseIds.length > 0) {
      const allLessons = await db.select().from(lessonsTable).where(sql`${lessonsTable.courseId} = ANY(${courseIds})`);
      const lessonIds = allLessons.map((l) => l.id);
      if (lessonIds.length > 0) {
        const prog = await db.select({ count: sql<number>`count(*)::int` }).from(userProgressTable).where(sql`${userProgressTable.lessonId} = ANY(${lessonIds})`);
        lessonsCompleted = prog[0]?.count ?? 0;
      }
    }
    return { languageName: lang.name, userCount: 0, lessonsCompleted };
  }));

  const topLang = breakdown.reduce((a, b) => a.lessonsCompleted > b.lessonsCompleted ? a : b, { languageName: "None", lessonsCompleted: 0 });

  res.json({
    totalUsers: totalUsers[0]?.count ?? 0,
    activeUsersToday: activeToday[0]?.count ?? 0,
    activeUsersWeek: activeWeek[0]?.count ?? 0,
    totalLessonsCompleted: totalLessons[0]?.count ?? 0,
    totalQuizAttempts: totalQuizzes[0]?.count ?? 0,
    popularLanguage: topLang.languageName,
    languageBreakdown: breakdown,
  });
});

router.get("/users", requireAuth(), async (req, res) => {
  if (!isAdmin(req)) { res.status(403).json({ error: "Forbidden" }); return; }

  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(100, parseInt(req.query.limit as string) || 20);
  const search = req.query.search as string | undefined;
  const offset = (page - 1) * limit;

  const query = db.select().from(userStatsTable);
  const countQuery = db.select({ count: sql<number>`count(*)::int` }).from(userStatsTable);

  const [users, total] = await Promise.all([
    (search
      ? query.where(or(ilike(userStatsTable.displayName, `%${search}%`), ilike(userStatsTable.email, `%${search}%`)))
      : query
    ).limit(limit).offset(offset),
    search
      ? countQuery.where(or(ilike(userStatsTable.displayName, `%${search}%`), ilike(userStatsTable.email, `%${search}%`)))
      : countQuery,
  ]);

  res.json({
    users: users.map((u) => ({
      userId: u.userId,
      displayName: u.displayName,
      email: u.email,
      xp: u.xp,
      lessonsCompleted: u.lessonsCompleted,
      quizzesPassed: u.quizzesPassed,
      joinedAt: u.joinedAt?.toISOString() ?? new Date().toISOString(),
      lastActive: u.lastActive?.toISOString() ?? null,
    })),
    total: total[0]?.count ?? 0,
    page,
    limit,
  });
});

export default router;
