import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const lessonsTable = pgTable("lessons", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  codeExample: text("code_example"),
  language: text("language").notNull(),
  order: integer("order").notNull(),
  xpReward: integer("xp_reward").notNull().default(20),
  isPremium: boolean("is_premium").notNull().default(false),
  coinCost: integer("coin_cost").notNull().default(0),
});

export const insertLessonSchema = createInsertSchema(lessonsTable).omit({ id: true });
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Lesson = typeof lessonsTable.$inferSelect;
