import { Router } from "express";
import { db } from "@workspace/db";
import {
  userProgressTable,
  userStatsTable,
  lessonsTable,
  languagesTable,
  coursesTable,
} from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import { requireAuth, getAuth } from "@clerk/express";

const router = Router();

router.get("/", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const progress = await db
    .select()
    .from(userProgressTable)
    .where(eq(userProgressTable.userId, userId));

  res.json(progress.map((p) => ({ ...p, completedAt: p.completedAt?.toISOString() ?? null })));
});

router.post("/", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { lessonId } = req.body as { lessonId: number };
  if (!lessonId) { res.status(400).json({ error: "lessonId is required" }); return; }

  const lesson = await db.select().from(lessonsTable).where(eq(lessonsTable.id, lessonId)).limit(1);
  if (!lesson[0]) { res.status(404).json({ error: "Lesson not found" }); return; }

  const existing = await db
    .select()
    .from(userProgressTable)
    .where(and(eq(userProgressTable.userId, userId), eq(userProgressTable.lessonId, lessonId)))
    .limit(1);

  if (existing[0]) {
    res.json({ ...existing[0], completedAt: existing[0].completedAt?.toISOString() ?? null });
    return;
  }

  const [inserted] = await db
    .insert(userProgressTable)
    .values({ userId, lessonId, completed: true })
    .returning();

  // Award XP
  await db
    .insert(userStatsTable)
    .values({ userId, displayName: "User", email: "", xp: lesson[0].xpReward, lessonsCompleted: 1, quizzesPassed: 0 })
    .onConflictDoUpdate({
      target: userStatsTable.userId,
      set: {
        xp: sql`${userStatsTable.xp} + ${lesson[0].xpReward}`,
        lessonsCompleted: sql`${userStatsTable.lessonsCompleted} + 1`,
        lastActive: new Date(),
      },
    });

  res.json({ ...inserted, completedAt: inserted.completedAt?.toISOString() ?? null });
});

router.get("/summary", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const langs = await db.select().from(languagesTable);
  const result = [];

  for (const lang of langs) {
    const courses = await db.select().from(coursesTable).where(eq(coursesTable.languageId, lang.id));
    const courseIds = courses.map((c) => c.id);
    if (courseIds.length === 0) {
      result.push({ languageId: lang.id, languageName: lang.name, languageSlug: lang.slug, totalLessons: 0, completedLessons: 0, xpEarned: 0 });
      continue;
    }

    const allLessons = await db
      .select()
      .from(lessonsTable)
      .where(sql`${lessonsTable.courseId} = ANY(${courseIds})`);

    const lessonIds = allLessons.map((l) => l.id);
    const completed = lessonIds.length > 0
      ? await db
          .select()
          .from(userProgressTable)
          .where(and(
            eq(userProgressTable.userId, userId),
            sql`${userProgressTable.lessonId} = ANY(${lessonIds})`,
          ))
      : [];

    const completedSet = new Set(completed.map((c) => c.lessonId));
    const xpEarned = allLessons.filter((l) => completedSet.has(l.id)).reduce((sum, l) => sum + l.xpReward, 0);

    result.push({
      languageId: lang.id,
      languageName: lang.name,
      languageSlug: lang.slug,
      totalLessons: allLessons.length,
      completedLessons: completed.length,
      xpEarned,
    });
  }

  res.json(result);
});

export default router;
