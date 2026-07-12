import { Router } from "express";
import { db } from "@workspace/db";
import { lessonsTable, contentUnlocksTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { getAuth } from "@clerk/express";

const router = Router();

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const lesson = await db.select().from(lessonsTable).where(eq(lessonsTable.id, id)).limit(1);
  if (!lesson[0]) {
    res.status(404).json({ error: "Lesson not found" });
    return;
  }

  if (!lesson[0].isPremium) {
    res.json({ ...lesson[0], locked: false });
    return;
  }

  const { userId } = getAuth(req);
  const unlocked = userId
    ? await db
        .select()
        .from(contentUnlocksTable)
        .where(and(
          eq(contentUnlocksTable.userId, userId),
          eq(contentUnlocksTable.contentType, "lesson"),
          eq(contentUnlocksTable.contentId, id),
        ))
        .limit(1)
    : [];

  if (unlocked.length > 0) {
    res.json({ ...lesson[0], locked: false });
    return;
  }

  // Premium and not unlocked — strip the paid content, keep metadata for the paywall UI.
  res.json({ ...lesson[0], content: "", codeExample: null, locked: true });
});

export default router;
