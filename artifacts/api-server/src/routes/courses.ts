import { Router } from "express";
import { db } from "@workspace/db";
import { coursesTable, lessonsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const course = await db.select().from(coursesTable).where(eq(coursesTable.id, id)).limit(1);
  if (!course[0]) {
    res.status(404).json({ error: "Course not found" });
    return;
  }

  const lessons = await db
    .select()
    .from(lessonsTable)
    .where(eq(lessonsTable.courseId, id))
    .orderBy(lessonsTable.order);

  res.json({ ...course[0], level: course[0].level?.toLowerCase(), lessons });
});

export default router;
