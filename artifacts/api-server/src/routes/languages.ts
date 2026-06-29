import { Router } from "express";
import { db } from "@workspace/db";
import { languagesTable, coursesTable, lessonsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const langs = await db.select().from(languagesTable);
  const courseCounts = await db
    .select({ languageId: coursesTable.languageId, count: sql<number>`count(*)::int` })
    .from(coursesTable)
    .groupBy(coursesTable.languageId);

  const countMap = new Map(courseCounts.map((c) => [c.languageId, c.count]));

  res.json(langs.map((l) => ({ ...l, courseCount: countMap.get(l.id) ?? 0 })));
});

router.get("/:slug/courses", async (req, res) => {
  const slug = String(req.params.slug);
  const lang = await db.select().from(languagesTable).where(eq(languagesTable.slug, slug)).limit(1);
  if (!lang[0]) {
    res.status(404).json({ error: "Language not found" });
    return;
  }

  const lessonCounts = await db
    .select({ courseId: lessonsTable.courseId, count: sql<number>`count(*)::int` })
    .from(lessonsTable)
    .groupBy(lessonsTable.courseId);
  const lessonMap = new Map(lessonCounts.map((l) => [l.courseId, l.count]));

  const courses = await db.select().from(coursesTable).where(eq(coursesTable.languageId, lang[0].id));
  res.json(courses.map((c) => ({ ...c, level: c.level?.toLowerCase(), lessonCount: lessonMap.get(c.id) ?? 0 })));
});

export default router;
