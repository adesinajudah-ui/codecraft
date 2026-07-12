import { Router } from "express";
import { db } from "@workspace/db";
import {
  userStatsTable,
  userProgressTable,
  quizAttemptsTable,
  languagesTable,
  lessonsTable,
  coursesTable,
  walletTransactionsTable,
  coinAdjustmentsTable,
} from "@workspace/db";
import { getAuth } from "@clerk/express";
import { requireApiAuth } from "../middlewares/requireApiAuth";
import { eq, sql, gte, ilike, or, and, desc } from "drizzle-orm";
import { seedHtmlCompleteCourse } from "../seedHtmlComplete";
import { seedHtmlLessons9to16 } from "../seedHtmlLessons9to16";

const router = Router();

function isAdmin(req: import("express").Request) {
  const auth = getAuth(req);
  return (auth?.sessionClaims?.publicMetadata as { role?: string } | undefined)?.role === "admin";
}

router.get("/stats", requireApiAuth(), async (req, res) => {
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

router.get("/users", requireApiAuth(), async (req, res) => {
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

router.post("/seed-html-complete", requireApiAuth(), async (req, res) => {
  if (!isAdmin(req)) { res.status(403).json({ error: "Forbidden" }); return; }
  try {
    const result = await seedHtmlCompleteCourse();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/seed-html-9-16", requireApiAuth(), async (req, res) => {
  if (!isAdmin(req)) { res.status(403).json({ error: "Forbidden" }); return; }
  try {
    const result = await seedHtmlLessons9to16();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Wallet / payments admin ─────────────────────────────────────────────────

router.get("/wallet/stats", requireApiAuth(), async (req, res) => {
  if (!isAdmin(req)) { res.status(403).json({ error: "Forbidden" }); return; }

  const successful = await db
    .select({
      totalRevenueNaira: sql<number>`coalesce(sum(${walletTransactionsTable.amountNaira}), 0)::int`,
      totalCoinsSold: sql<number>`coalesce(sum(${walletTransactionsTable.coins}), 0)::int`,
      count: sql<number>`count(*)::int`,
    })
    .from(walletTransactionsTable)
    .where(eq(walletTransactionsTable.status, "success"));

  const pending = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(walletTransactionsTable)
    .where(eq(walletTransactionsTable.status, "pending"));

  res.json({
    totalRevenueNaira: successful[0]?.totalRevenueNaira ?? 0,
    totalCoinsSold: successful[0]?.totalCoinsSold ?? 0,
    successfulTransactions: successful[0]?.count ?? 0,
    pendingTransactions: pending[0]?.count ?? 0,
  });
});

router.get("/wallet/transactions", requireApiAuth(), async (req, res) => {
  if (!isAdmin(req)) { res.status(403).json({ error: "Forbidden" }); return; }

  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(100, parseInt(req.query.limit as string) || 20);
  const status = req.query.status as string | undefined;
  const search = req.query.search as string | undefined;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (status && ["pending", "success", "failed"].includes(status)) {
    conditions.push(eq(walletTransactionsTable.status, status));
  }
  if (search) {
    conditions.push(or(
      ilike(walletTransactionsTable.userId, `%${search}%`),
      ilike(walletTransactionsTable.paystackReference, `%${search}%`),
    ));
  }
  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [rows, total] = await Promise.all([
    db.select().from(walletTransactionsTable).where(where).orderBy(desc(walletTransactionsTable.createdAt)).limit(limit).offset(offset),
    db.select({ count: sql<number>`count(*)::int` }).from(walletTransactionsTable).where(where),
  ]);

  const userIds = [...new Set(rows.map((r) => r.userId))];
  const users = userIds.length > 0
    ? await db.select().from(userStatsTable).where(sql`${userStatsTable.userId} = ANY(${userIds})`)
    : [];
  const userMap = new Map(users.map((u) => [u.userId, u]));

  res.json({
    transactions: rows.map((r) => ({
      ...r,
      createdAt: r.createdAt?.toISOString() ?? null,
      verifiedAt: r.verifiedAt?.toISOString() ?? null,
      displayName: userMap.get(r.userId)?.displayName ?? "Unknown",
      email: userMap.get(r.userId)?.email ?? "",
    })),
    total: total[0]?.count ?? 0,
    page,
    limit,
  });
});

router.get("/wallet/transactions/export", requireApiAuth(), async (req, res) => {
  if (!isAdmin(req)) { res.status(403).json({ error: "Forbidden" }); return; }

  const rows = await db.select().from(walletTransactionsTable).orderBy(desc(walletTransactionsTable.createdAt));
  const header = "id,userId,coins,amountNaira,reference,status,createdAt,verifiedAt";
  const lines = rows.map((r) => [
    r.id,
    r.userId,
    r.coins,
    r.amountNaira,
    r.paystackReference,
    r.status,
    r.createdAt?.toISOString() ?? "",
    r.verifiedAt?.toISOString() ?? "",
  ].join(","));

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=wallet-transactions.csv");
  res.send([header, ...lines].join("\n"));
});

router.post("/wallet/adjust", requireApiAuth(), async (req, res) => {
  const { userId: adminUserId } = getAuth(req);
  if (!isAdmin(req) || !adminUserId) { res.status(403).json({ error: "Forbidden" }); return; }

  const { userId, amount, reason } = req.body as { userId?: string; amount?: number; reason?: string };
  if (!userId || !Number.isInteger(amount) || !amount || !reason) {
    res.status(400).json({ error: "userId, non-zero integer amount, and reason are required" });
    return;
  }

  const updated = await db
    .update(userStatsTable)
    .set({ coinBalance: sql`greatest(${userStatsTable.coinBalance} + ${amount}, 0)` })
    .where(eq(userStatsTable.userId, userId))
    .returning();

  if (!updated[0]) { res.status(404).json({ error: "User not found" }); return; }

  await db.insert(coinAdjustmentsTable).values({ userId, amount, reason, adminUserId });

  res.json({ coinBalance: updated[0].coinBalance });
});

export default router;
