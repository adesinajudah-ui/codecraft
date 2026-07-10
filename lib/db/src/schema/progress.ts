import { pgTable, text, serial, integer, boolean, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userProgressTable = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  lessonId: integer("lesson_id").notNull(),
  completed: boolean("completed").notNull().default(true),
  completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  userLessonUnique: unique().on(table.userId, table.lessonId),
}));

export const userStatsTable = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  displayName: text("display_name").notNull(),
  email: text("email").notNull(),
  username: text("username").unique(),
  avatarUrl: text("avatar_url"),
  xp: integer("xp").notNull().default(0),
  lessonsCompleted: integer("lessons_completed").notNull().default(0),
  quizzesPassed: integer("quizzes_passed").notNull().default(0),
  joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow(),
  lastActive: timestamp("last_active", { withTimezone: true }).defaultNow(),
});

export const insertUserProgressSchema = createInsertSchema(userProgressTable).omit({ id: true, completedAt: true });
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgressTable.$inferSelect;

export const insertUserStatsSchema = createInsertSchema(userStatsTable).omit({ id: true, joinedAt: true, lastActive: true });
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
export type UserStats = typeof userStatsTable.$inferSelect;
