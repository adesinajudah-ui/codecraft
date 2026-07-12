import { Router } from "express";
import { db } from "@workspace/db";
import {
  userStatsTable,
  walletTransactionsTable,
  contentUnlocksTable,
  lessonsTable,
  quizzesTable,
} from "@workspace/db";
import { COIN_PACKAGES, type CoinPackageId } from "@workspace/db";
import { eq, and, desc, sql } from "drizzle-orm";
import { requireAuth, getAuth, clerkClient } from "@clerk/express";
import crypto from "node:crypto";
import {
  initializeTransaction,
  verifyTransaction,
  isPaystackConfigured,
  PaystackNotConfiguredError,
  PaystackApiError,
} from "../lib/paystack";
import { logger } from "../lib/logger";

const router = Router();

function findPackage(packageId: string) {
  return COIN_PACKAGES.find((p) => p.id === packageId);
}

async function getOrCreateUserStats(userId: string, email: string, displayName: string) {
  const existing = await db.select().from(userStatsTable).where(eq(userStatsTable.userId, userId)).limit(1);
  if (existing[0]) return existing[0];

  const [created] = await db
    .insert(userStatsTable)
    .values({ userId, displayName: displayName || "User", email: email || "" })
    .onConflictDoNothing({ target: userStatsTable.userId })
    .returning();

  if (created) return created;
  const [row] = await db.select().from(userStatsTable).where(eq(userStatsTable.userId, userId)).limit(1);
  return row;
}

router.get("/config", (_req, res) => {
  res.json({ paystackConfigured: isPaystackConfigured() });
});

router.get("/packages", (_req, res) => {
  res.json(COIN_PACKAGES);
});

router.get("/balance", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const stats = await db.select().from(userStatsTable).where(eq(userStatsTable.userId, userId)).limit(1);
  res.json({ coinBalance: stats[0]?.coinBalance ?? 0 });
});

router.get("/transactions", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const rows = await db
    .select()
    .from(walletTransactionsTable)
    .where(eq(walletTransactionsTable.userId, userId))
    .orderBy(desc(walletTransactionsTable.createdAt));

  res.json(rows.map((r) => ({
    ...r,
    createdAt: r.createdAt?.toISOString() ?? null,
    verifiedAt: r.verifiedAt?.toISOString() ?? null,
  })));
});

router.get("/unlocked", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const rows = await db.select().from(contentUnlocksTable).where(eq(contentUnlocksTable.userId, userId));
  res.json(rows.map((r) => ({ contentType: r.contentType, contentId: r.contentId })));
});

router.post("/paystack/initialize", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { packageId, returnUrl } = req.body as { packageId?: CoinPackageId; returnUrl?: string };
  const pkg = packageId ? findPackage(packageId) : undefined;
  if (!pkg) { res.status(400).json({ error: "Invalid packageId" }); return; }

  // Fetch the verified email from Clerk directly rather than trusting the client.
  const clerkUser = await clerkClient.users.getUser(userId);
  const email = clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress
    ?? clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) { res.status(400).json({ error: "Your account has no email on file" }); return; }

  const reference = `ccw_${crypto.randomBytes(12).toString("hex")}`;
  // The client passes its own base-path-aware return URL so the Paystack
  // redirect lands back inside the artifact's routed frontend correctly.
  const fallbackBase = (req.headers["x-forwarded-proto"] ?? "https") + "://" + req.headers.host + "/wallet";
  const base = returnUrl || fallbackBase;
  const separator = base.includes("?") ? "&" : "?";
  const callbackUrl = `${base}${separator}reference=${reference}`;

  try {
    const init = await initializeTransaction({
      email,
      amountKobo: pkg.priceNaira * 100,
      reference,
      callbackUrl,
      metadata: { userId, packageId: pkg.id, coins: pkg.coins },
    });

    await db.insert(walletTransactionsTable).values({
      userId,
      coins: pkg.coins,
      amountNaira: pkg.priceNaira,
      paystackReference: reference,
      status: "pending",
    });

    res.json({ authorizationUrl: init.authorizationUrl, reference: init.reference });
  } catch (err) {
    if (err instanceof PaystackNotConfiguredError) {
      res.status(503).json({ error: err.message });
      return;
    }
    if (err instanceof PaystackApiError) {
      res.status(502).json({ error: err.message });
      return;
    }
    logger.error({ err }, "Failed to initialize wallet purchase");
    res.status(500).json({ error: "Failed to start payment" });
  }
});

router.get("/paystack/verify/:reference", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const reference = String(req.params.reference);

  const existingTx = await db
    .select()
    .from(walletTransactionsTable)
    .where(eq(walletTransactionsTable.paystackReference, reference))
    .limit(1);

  const tx = existingTx[0];
  if (!tx || tx.userId !== userId) {
    res.status(404).json({ error: "Transaction not found" });
    return;
  }

  // Already resolved — never re-credit a reference twice.
  if (tx.status === "success") {
    const stats = await db.select().from(userStatsTable).where(eq(userStatsTable.userId, userId)).limit(1);
    res.json({ status: "success", coinBalance: stats[0]?.coinBalance ?? 0 });
    return;
  }
  if (tx.status === "failed") {
    res.json({ status: "failed", coinBalance: null });
    return;
  }

  try {
    const verified = await verifyTransaction(reference);

    if (verified.status === "success") {
      // Credit coins and mark the transaction successful atomically so a
      // retried/duplicate verify call can never double-credit the user.
      const result = await db.transaction(async (tx2) => {
        const updated = await tx2
          .update(walletTransactionsTable)
          .set({ status: "success", verifiedAt: new Date() })
          .where(and(eq(walletTransactionsTable.paystackReference, reference), eq(walletTransactionsTable.status, "pending")))
          .returning();

        // If nothing was updated, another request already processed this reference.
        if (updated.length === 0) {
          const stats = await tx2.select().from(userStatsTable).where(eq(userStatsTable.userId, userId)).limit(1);
          return { alreadyCredited: true, coinBalance: stats[0]?.coinBalance ?? 0 };
        }

        await tx2
          .insert(userStatsTable)
          .values({ userId, displayName: "User", email: "", coinBalance: tx.coins })
          .onConflictDoUpdate({
            target: userStatsTable.userId,
            set: {
              coinBalance: sql`${userStatsTable.coinBalance} + ${tx.coins}`,
              lastActive: new Date(),
            },
          });

        const stats = await tx2.select().from(userStatsTable).where(eq(userStatsTable.userId, userId)).limit(1);
        return { alreadyCredited: false, coinBalance: stats[0]?.coinBalance ?? 0 };
      });

      res.json({ status: "success", coinBalance: result.coinBalance });
      return;
    }

    if (verified.status === "failed" || verified.status === "abandoned") {
      await db
        .update(walletTransactionsTable)
        .set({ status: "failed", verifiedAt: new Date() })
        .where(and(eq(walletTransactionsTable.paystackReference, reference), eq(walletTransactionsTable.status, "pending")));
      res.json({ status: "failed", coinBalance: null });
      return;
    }

    res.json({ status: "pending", coinBalance: null });
  } catch (err) {
    if (err instanceof PaystackNotConfiguredError) {
      res.status(503).json({ error: err.message });
      return;
    }
    if (err instanceof PaystackApiError) {
      res.status(502).json({ error: err.message });
      return;
    }
    logger.error({ err }, "Failed to verify wallet purchase");
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

router.post("/unlock", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { contentType, contentId } = req.body as { contentType?: "lesson" | "quiz"; contentId?: number };
  if (contentType !== "lesson" && contentType !== "quiz") { res.status(400).json({ error: "Invalid contentType" }); return; }
  if (!contentId) { res.status(400).json({ error: "contentId is required" }); return; }

  const table = contentType === "lesson" ? lessonsTable : quizzesTable;
  const content = await db.select().from(table).where(eq(table.id, contentId)).limit(1);
  if (!content[0]) { res.status(404).json({ error: `${contentType} not found` }); return; }
  if (!content[0].isPremium) { res.status(400).json({ error: "This content is not premium" }); return; }

  const alreadyUnlocked = await db
    .select()
    .from(contentUnlocksTable)
    .where(and(
      eq(contentUnlocksTable.userId, userId),
      eq(contentUnlocksTable.contentType, contentType),
      eq(contentUnlocksTable.contentId, contentId),
    ))
    .limit(1);

  if (alreadyUnlocked[0]) {
    res.json({ success: true, alreadyUnlocked: true });
    return;
  }

  const cost = content[0].coinCost;

  try {
    const result = await db.transaction(async (tx) => {
      const debited = await tx
        .update(userStatsTable)
        .set({ coinBalance: sql`${userStatsTable.coinBalance} - ${cost}` })
        .where(and(eq(userStatsTable.userId, userId), sql`${userStatsTable.coinBalance} >= ${cost}`))
        .returning();

      if (debited.length === 0) {
        return { insufficientFunds: true, coinBalance: null as number | null };
      }

      await tx.insert(contentUnlocksTable).values({ userId, contentType, contentId, coinsCost: cost }).onConflictDoNothing();

      return { insufficientFunds: false, coinBalance: debited[0].coinBalance };
    });

    if (result.insufficientFunds) {
      res.status(402).json({ error: "You don't have enough coins. Please purchase more coins to continue." });
      return;
    }

    res.json({ success: true, alreadyUnlocked: false, coinBalance: result.coinBalance });
  } catch (err) {
    logger.error({ err }, "Failed to unlock premium content");
    res.status(500).json({ error: "Failed to unlock content" });
  }
});

export default router;
