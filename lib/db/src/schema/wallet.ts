import { pgTable, text, serial, integer, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// One record per coin package purchase attempt. Created as "pending" when a
// Paystack transaction is initialized, then flipped to "success" or "failed"
// only after the backend verifies the transaction reference with Paystack.
export const walletTransactionsTable = pgTable("wallet_transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  coins: integer("coins").notNull(),
  amountNaira: integer("amount_naira").notNull(),
  paystackReference: text("paystack_reference").notNull().unique(),
  status: text("status").notNull().default("pending"), // pending | success | failed
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  verifiedAt: timestamp("verified_at", { withTimezone: true }),
});

// Tracks which premium lessons/quizzes a user has permanently unlocked with coins.
export const contentUnlocksTable = pgTable("content_unlocks", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  contentType: text("content_type").notNull(), // "lesson" | "quiz"
  contentId: integer("content_id").notNull(),
  coinsCost: integer("coins_cost").notNull(),
  unlockedAt: timestamp("unlocked_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  userContentUnique: unique().on(table.userId, table.contentType, table.contentId),
}));

// Audit trail for admin manual coin credits/deductions.
export const coinAdjustmentsTable = pgTable("coin_adjustments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  amount: integer("amount").notNull(),
  reason: text("reason").notNull(),
  adminUserId: text("admin_user_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const insertWalletTransactionSchema = createInsertSchema(walletTransactionsTable).omit({ id: true, createdAt: true, verifiedAt: true });
export type InsertWalletTransaction = z.infer<typeof insertWalletTransactionSchema>;
export type WalletTransaction = typeof walletTransactionsTable.$inferSelect;

export const insertContentUnlockSchema = createInsertSchema(contentUnlocksTable).omit({ id: true, unlockedAt: true });
export type InsertContentUnlock = z.infer<typeof insertContentUnlockSchema>;
export type ContentUnlock = typeof contentUnlocksTable.$inferSelect;

export const insertCoinAdjustmentSchema = createInsertSchema(coinAdjustmentsTable).omit({ id: true, createdAt: true });
export type InsertCoinAdjustment = z.infer<typeof insertCoinAdjustmentSchema>;
export type CoinAdjustment = typeof coinAdjustmentsTable.$inferSelect;

// Coin packages are priced and defined server-side only — the frontend never
// supplies a price, it only ever asks for a packageId and the server looks up
// the amount to charge. Naira amount = coins * 50.
export const COIN_PACKAGES = [
  { id: "coins-10", coins: 10, priceNaira: 500 },
  { id: "coins-20", coins: 20, priceNaira: 1000 },
  { id: "coins-30", coins: 30, priceNaira: 1500 },
  { id: "coins-40", coins: 40, priceNaira: 2000 },
  { id: "coins-50", coins: 50, priceNaira: 2500 },
  { id: "coins-60", coins: 60, priceNaira: 3000 },
  { id: "coins-65", coins: 65, priceNaira: 3500 },
] as const;

export type CoinPackageId = (typeof COIN_PACKAGES)[number]["id"];
