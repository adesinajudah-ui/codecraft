import { pgTable, text, serial, integer, boolean, timestamp, jsonb, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export type MessageAttachment = {
  objectPath: string;
  name: string;
  size: number;
  contentType: string;
};

export const studyGroupsTable = pgTable("study_groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  avatarObjectPath: text("avatar_object_path"),
  ownerId: text("owner_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// role: "owner" | "admin" | "member"
// status: "pending" | "accepted" | "declined"
export const studyGroupMembersTable = pgTable("study_group_members", {
  id: serial("id").primaryKey(),
  groupId: integer("group_id").notNull(),
  userId: text("user_id").notNull(),
  role: text("role").notNull().default("member"),
  status: text("status").notNull().default("pending"),
  invitedBy: text("invited_by").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  respondedAt: timestamp("responded_at", { withTimezone: true }),
}, (table) => ({
  groupUserUnique: unique().on(table.groupId, table.userId),
}));

export const studyGroupMessagesTable = pgTable("study_group_messages", {
  id: serial("id").primaryKey(),
  groupId: integer("group_id").notNull(),
  userId: text("user_id").notNull(),
  content: text("content").notNull().default(""),
  replyToId: integer("reply_to_id"),
  mentions: jsonb("mentions").notNull().$type<string[]>().default([]),
  attachments: jsonb("attachments").notNull().$type<MessageAttachment[]>().default([]),
  deleted: boolean("deleted").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const studyGroupMessageReactionsTable = pgTable("study_group_message_reactions", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id").notNull(),
  userId: text("user_id").notNull(),
  emoji: text("emoji").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  messageUserEmojiUnique: unique().on(table.messageId, table.userId, table.emoji),
}));

// type: "group_invite" | "invite_accepted" | "invite_declined" | "mention" | "member_removed" | "role_changed"
export const studyGroupNotificationsTable = pgTable("study_group_notifications", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  type: text("type").notNull(),
  groupId: integer("group_id").notNull(),
  actorId: text("actor_id").notNull(),
  payload: jsonb("payload").notNull().$type<Record<string, unknown>>().default({}),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const insertStudyGroupSchema = createInsertSchema(studyGroupsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertStudyGroup = z.infer<typeof insertStudyGroupSchema>;
export type StudyGroup = typeof studyGroupsTable.$inferSelect;

export const insertStudyGroupMemberSchema = createInsertSchema(studyGroupMembersTable).omit({ id: true, createdAt: true, respondedAt: true });
export type InsertStudyGroupMember = z.infer<typeof insertStudyGroupMemberSchema>;
export type StudyGroupMember = typeof studyGroupMembersTable.$inferSelect;

export const insertStudyGroupMessageSchema = createInsertSchema(studyGroupMessagesTable).omit({ id: true, createdAt: true, deleted: true });
export type InsertStudyGroupMessage = z.infer<typeof insertStudyGroupMessageSchema>;
export type StudyGroupMessage = typeof studyGroupMessagesTable.$inferSelect;

export const insertStudyGroupMessageReactionSchema = createInsertSchema(studyGroupMessageReactionsTable).omit({ id: true, createdAt: true });
export type InsertStudyGroupMessageReaction = z.infer<typeof insertStudyGroupMessageReactionSchema>;
export type StudyGroupMessageReaction = typeof studyGroupMessageReactionsTable.$inferSelect;

export const insertStudyGroupNotificationSchema = createInsertSchema(studyGroupNotificationsTable).omit({ id: true, createdAt: true, read: true });
export type InsertStudyGroupNotification = z.infer<typeof insertStudyGroupNotificationSchema>;
export type StudyGroupNotification = typeof studyGroupNotificationsTable.$inferSelect;
