import { Router, type Response } from "express";
import { db } from "@workspace/db";
import {
  studyGroupsTable,
  studyGroupMembersTable,
  studyGroupMessagesTable,
  studyGroupMessageReactionsTable,
  studyGroupNotificationsTable,
  studyGroupInviteCodesTable,
  userStatsTable,
  type MessageAttachment,
} from "@workspace/db";
import { eq, and, inArray, desc, lt, sql, isNull } from "drizzle-orm";
import { getAuth } from "@clerk/express";
import { requireApiAuth } from "../middlewares/requireApiAuth";
import crypto from "node:crypto";

const router = Router();

// ── Invite codes ────────────────────────────────────────────────────────────

// Avoid ambiguous characters (0/O, 1/I/L) so codes are easy to read and type.
const INVITE_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function randomInviteCode(): string {
  const chars = Array.from({ length: 8 }, () => INVITE_CODE_ALPHABET[crypto.randomInt(INVITE_CODE_ALPHABET.length)]);
  return `${chars.slice(0, 4).join("")}-${chars.slice(4).join("")}`;
}

async function generateUniqueInviteCode(): Promise<string> {
  for (let attempt = 0; attempt < 10; attempt++) {
    const code = randomInviteCode();
    const existing = await db.select({ id: studyGroupInviteCodesTable.id }).from(studyGroupInviteCodesTable).where(eq(studyGroupInviteCodesTable.code, code)).limit(1);
    if (existing.length === 0) return code;
  }
  throw new Error("Could not generate a unique invite code");
}

// ── Real-time (SSE) infrastructure — mirrors the pattern used for quiz sessions ──

/** Map of groupId → Set of open SSE response objects */
const sseClients = new Map<number, Set<Response>>();
/** Map of groupId → Set of currently-connected userIds (presence) */
const onlineUsers = new Map<number, Set<string>>();

function broadcast(groupId: number, event: string, data: unknown) {
  const clients = sseClients.get(groupId);
  if (!clients || clients.size === 0) return;
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of clients) {
    try {
      res.write(payload);
    } catch {
      clients.delete(res);
    }
  }
}

function learningLevel(xp: number): "Beginner" | "Intermediate" | "Advanced" | "Expert" {
  if (xp < 500) return "Beginner";
  if (xp < 2000) return "Intermediate";
  if (xp < 5000) return "Advanced";
  return "Expert";
}

async function getStatsMap(userIds: string[]) {
  if (userIds.length === 0) return new Map<string, typeof userStatsTable.$inferSelect>();
  const rows = await db.select().from(userStatsTable).where(inArray(userStatsTable.userId, userIds));
  return new Map(rows.map((r) => [r.userId, r]));
}

async function getMembership(groupId: number, userId: string) {
  const rows = await db
    .select()
    .from(studyGroupMembersTable)
    .where(and(eq(studyGroupMembersTable.groupId, groupId), eq(studyGroupMembersTable.userId, userId)))
    .limit(1);
  return rows[0] ?? null;
}

async function requireAcceptedMember(groupId: number, userId: string) {
  const m = await getMembership(groupId, userId);
  if (!m || m.status !== "accepted") return null;
  return m;
}

async function notify(userId: string, type: string, groupId: number, actorId: string, payload: Record<string, unknown> = {}) {
  await db.insert(studyGroupNotificationsTable).values({ userId, type, groupId, actorId, payload });
}

async function serializeGroupSummary(group: typeof studyGroupsTable.$inferSelect, myRole: string) {
  const members = await db
    .select()
    .from(studyGroupMembersTable)
    .where(and(eq(studyGroupMembersTable.groupId, group.id), eq(studyGroupMembersTable.status, "accepted")));
  return {
    id: group.id,
    name: group.name,
    description: group.description,
    avatarObjectPath: group.avatarObjectPath,
    ownerId: group.ownerId,
    memberCount: members.length,
    myRole,
    createdAt: group.createdAt?.toISOString() ?? new Date().toISOString(),
  };
}

// ── SSE endpoint ──────────────────────────────────────────────────────────────

// GET /study-groups/:groupId/events
router.get("/:groupId/events", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const groupId = parseInt(String(req.params.groupId));
  if (!userId || isNaN(groupId)) { res.status(400).end(); return; }

  const membership = await requireAcceptedMember(groupId, userId);
  if (!membership) { res.status(403).end(); return; }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  const heartbeat = setInterval(() => {
    try {
      res.write(": heartbeat\n\n");
    } catch {
      clearInterval(heartbeat);
    }
  }, 20_000);

  if (!sseClients.has(groupId)) sseClients.set(groupId, new Set());
  sseClients.get(groupId)!.add(res);

  if (!onlineUsers.has(groupId)) onlineUsers.set(groupId, new Set());
  const wasOnline = onlineUsers.get(groupId)!.has(userId);
  onlineUsers.get(groupId)!.add(userId);
  if (!wasOnline) broadcast(groupId, "presence", { userId, online: true });

  req.on("close", () => {
    clearInterval(heartbeat);
    sseClients.get(groupId)?.delete(res);
    // Only mark offline if no other SSE connection from this user remains
    const stillConnected = [...(sseClients.get(groupId) ?? [])].length > 0;
    if (!stillConnected) {
      onlineUsers.get(groupId)?.delete(userId);
      broadcast(groupId, "presence", { userId, online: false });
    }
  });
});

// POST /study-groups/:groupId/typing — lightweight, not persisted, broadcast only
router.post("/:groupId/typing", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const groupId = parseInt(String(req.params.groupId));
  if (!userId || isNaN(groupId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const membership = await requireAcceptedMember(groupId, userId);
  if (!membership) { res.status(403).json({ error: "Not a member" }); return; }

  broadcast(groupId, "typing", { userId });
  res.json({ ok: true });
});

// ── Users: username + search ─────────────────────────────────────────────────

export const usersRouter = Router();

usersRouter.get("/me/username", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const rows = await db.select().from(userStatsTable).where(eq(userStatsTable.userId, userId)).limit(1);
  res.json({ username: rows[0]?.username ?? null });
});

usersRouter.patch("/me/username", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { username } = req.body as { username?: string };
  if (!username || !/^[a-zA-Z0-9_]{3,24}$/.test(username)) {
    res.status(400).json({ error: "Invalid username" });
    return;
  }

  const existing = await db.select().from(userStatsTable).where(eq(userStatsTable.username, username)).limit(1);
  if (existing[0] && existing[0].userId !== userId) {
    res.status(409).json({ error: "Username already taken" });
    return;
  }

  await db
    .insert(userStatsTable)
    .values({ userId, displayName: "User", email: "", username })
    .onConflictDoUpdate({ target: userStatsTable.userId, set: { username } });

  res.json({ username });
});

usersRouter.get("/search", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const q = String(req.query.q ?? "").trim();
  if (!q) { res.json([]); return; }

  const rows = await db
    .select()
    .from(userStatsTable)
    .where(and(sql`${userStatsTable.username} ILIKE ${`%${q}%`}`, sql`${userStatsTable.userId} != ${userId}`))
    .limit(10);

  res.json(
    rows
      .filter((r) => r.username)
      .map((r) => ({ userId: r.userId, username: r.username!, displayName: r.displayName, avatarUrl: r.avatarUrl, xp: r.xp })),
  );
});

// ── Notifications ─────────────────────────────────────────────────────────────

router.get("/notifications", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const rows = await db
    .select()
    .from(studyGroupNotificationsTable)
    .where(eq(studyGroupNotificationsTable.userId, userId))
    .orderBy(desc(studyGroupNotificationsTable.createdAt))
    .limit(50);

  const groupIds = [...new Set(rows.map((r) => r.groupId))];
  const groups = groupIds.length
    ? await db.select().from(studyGroupsTable).where(inArray(studyGroupsTable.id, groupIds))
    : [];
  const groupMap = new Map(groups.map((g) => [g.id, g]));

  const actorIds = [...new Set(rows.map((r) => r.actorId))];
  const statsMap = await getStatsMap(actorIds);

  res.json(
    rows.map((r) => ({
      id: r.id,
      type: r.type,
      groupId: r.groupId,
      groupName: groupMap.get(r.groupId)?.name ?? null,
      actorId: r.actorId,
      actorUsername: statsMap.get(r.actorId)?.username ?? null,
      payload: r.payload,
      read: r.read,
      createdAt: r.createdAt?.toISOString() ?? new Date().toISOString(),
    })),
  );
});

router.post("/notifications/:notificationId/read", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const notificationId = parseInt(String(req.params.notificationId));
  if (!userId || isNaN(notificationId)) { res.status(400).json({ error: "Invalid request" }); return; }

  await db
    .update(studyGroupNotificationsTable)
    .set({ read: true })
    .where(and(eq(studyGroupNotificationsTable.id, notificationId), eq(studyGroupNotificationsTable.userId, userId)));

  res.json({ ok: true });
});

// ── Groups ────────────────────────────────────────────────────────────────────

router.get("/", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const memberships = await db
    .select()
    .from(studyGroupMembersTable)
    .where(and(eq(studyGroupMembersTable.userId, userId), eq(studyGroupMembersTable.status, "accepted")));

  if (memberships.length === 0) { res.json([]); return; }

  const groups = await db
    .select()
    .from(studyGroupsTable)
    .where(inArray(studyGroupsTable.id, memberships.map((m) => m.groupId)));

  const roleMap = new Map(memberships.map((m) => [m.groupId, m.role]));
  const summaries = await Promise.all(
    groups.map((g) => serializeGroupSummary(g, roleMap.get(g.id) ?? "member")),
  );
  res.json(summaries);
});

const STUDY_GROUP_CREATE_COST = 10;

router.post("/", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { name, description, avatarObjectPath } = req.body as {
    name?: string;
    description?: string | null;
    avatarObjectPath?: string | null;
  };
  if (!name || !name.trim()) { res.status(400).json({ error: "Name is required" }); return; }

  try {
    const result = await db.transaction(async (tx) => {
      const debited = await tx
        .update(userStatsTable)
        .set({ coinBalance: sql`${userStatsTable.coinBalance} - ${STUDY_GROUP_CREATE_COST}` })
        .where(and(
          eq(userStatsTable.userId, userId),
          sql`${userStatsTable.coinBalance} >= ${STUDY_GROUP_CREATE_COST}`,
        ))
        .returning();

      if (debited.length === 0) {
        return { insufficientFunds: true as const, group: null };
      }

      const [group] = await tx
        .insert(studyGroupsTable)
        .values({ name: name.trim(), description: description ?? null, avatarObjectPath: avatarObjectPath ?? null, ownerId: userId })
        .returning();

      await tx.insert(studyGroupMembersTable).values({
        groupId: group.id,
        userId,
        role: "owner",
        status: "accepted",
        invitedBy: userId,
        respondedAt: new Date(),
      });

      return { insufficientFunds: false as const, group };
    });

    if (result.insufficientFunds) {
      res.status(402).json({ error: "Insufficient balance. You need 10 coins to create a study group." });
      return;
    }

    res.json(await serializeGroupSummary(result.group, "owner"));
  } catch (err) {
    res.status(500).json({ error: "Failed to create study group" });
  }
});

router.get("/invites/pending", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const pending = await db
    .select()
    .from(studyGroupMembersTable)
    .where(and(eq(studyGroupMembersTable.userId, userId), eq(studyGroupMembersTable.status, "pending")));

  if (pending.length === 0) { res.json([]); return; }

  const groups = await db.select().from(studyGroupsTable).where(inArray(studyGroupsTable.id, pending.map((p) => p.groupId)));
  const groupMap = new Map(groups.map((g) => [g.id, g]));
  const statsMap = await getStatsMap(pending.map((p) => p.invitedBy));

  res.json(
    pending.map((p) => ({
      membershipId: p.id,
      groupId: p.groupId,
      groupName: groupMap.get(p.groupId)?.name ?? "Unknown group",
      groupAvatarObjectPath: groupMap.get(p.groupId)?.avatarObjectPath ?? null,
      invitedBy: p.invitedBy,
      invitedByUsername: statsMap.get(p.invitedBy)?.username ?? null,
      createdAt: p.createdAt?.toISOString() ?? new Date().toISOString(),
    })),
  );
});

router.post("/invites/:membershipId/accept", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const membershipId = parseInt(String(req.params.membershipId));
  if (!userId || isNaN(membershipId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const rows = await db.select().from(studyGroupMembersTable).where(eq(studyGroupMembersTable.id, membershipId)).limit(1);
  const membership = rows[0];
  if (!membership || membership.userId !== userId || membership.status !== "pending") {
    res.status(404).json({ error: "Invite not found" });
    return;
  }

  const [updated] = await db
    .update(studyGroupMembersTable)
    .set({ status: "accepted", respondedAt: new Date() })
    .where(eq(studyGroupMembersTable.id, membershipId))
    .returning();

  await notify(membership.invitedBy, "invite_accepted", membership.groupId, userId);
  broadcast(membership.groupId, "member_joined", { userId });

  res.json({ ...updated, createdAt: updated.createdAt?.toISOString() ?? new Date().toISOString() });
});

router.post("/invites/:membershipId/decline", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const membershipId = parseInt(String(req.params.membershipId));
  if (!userId || isNaN(membershipId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const rows = await db.select().from(studyGroupMembersTable).where(eq(studyGroupMembersTable.id, membershipId)).limit(1);
  const membership = rows[0];
  if (!membership || membership.userId !== userId || membership.status !== "pending") {
    res.status(404).json({ error: "Invite not found" });
    return;
  }

  const [updated] = await db
    .update(studyGroupMembersTable)
    .set({ status: "declined", respondedAt: new Date() })
    .where(eq(studyGroupMembersTable.id, membershipId))
    .returning();

  await notify(membership.invitedBy, "invite_declined", membership.groupId, userId);

  res.json({ ...updated, createdAt: updated.createdAt?.toISOString() ?? new Date().toISOString() });
});

router.get("/:groupId", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const groupId = parseInt(String(req.params.groupId));
  if (!userId || isNaN(groupId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const membership = await requireAcceptedMember(groupId, userId);
  if (!membership) { res.status(403).json({ error: "Not a member" }); return; }

  const rows = await db.select().from(studyGroupsTable).where(eq(studyGroupsTable.id, groupId)).limit(1);
  if (!rows[0]) { res.status(404).json({ error: "Not found" }); return; }

  const members = await db
    .select()
    .from(studyGroupMembersTable)
    .where(eq(studyGroupMembersTable.groupId, groupId));

  const statsMap = await getStatsMap(members.map((m) => m.userId));
  const online = onlineUsers.get(groupId) ?? new Set<string>();

  const memberOut = members.map((m) => {
    const stats = statsMap.get(m.userId);
    return {
      userId: m.userId,
      username: stats?.username ?? null,
      displayName: stats?.displayName ?? "User",
      avatarUrl: stats?.avatarUrl ?? null,
      xp: stats?.xp ?? 0,
      learningLevel: learningLevel(stats?.xp ?? 0),
      role: m.role,
      status: m.status,
      online: online.has(m.userId),
    };
  });

  const summary = await serializeGroupSummary(rows[0], membership.role);
  res.json({ ...summary, members: memberOut });
});

router.patch("/:groupId", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const groupId = parseInt(String(req.params.groupId));
  if (!userId || isNaN(groupId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const rows = await db.select().from(studyGroupsTable).where(eq(studyGroupsTable.id, groupId)).limit(1);
  if (!rows[0]) { res.status(404).json({ error: "Not found" }); return; }
  if (rows[0].ownerId !== userId) { res.status(403).json({ error: "Owner only" }); return; }

  const { name, description, avatarObjectPath } = req.body as { name?: string | null; description?: string | null; avatarObjectPath?: string | null };
  const [updated] = await db
    .update(studyGroupsTable)
    .set({
      ...(name != null ? { name } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(avatarObjectPath !== undefined ? { avatarObjectPath } : {}),
      updatedAt: new Date(),
    })
    .where(eq(studyGroupsTable.id, groupId))
    .returning();

  broadcast(groupId, "group_updated", { groupId });
  res.json(await serializeGroupSummary(updated, "owner"));
});

router.delete("/:groupId", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const groupId = parseInt(String(req.params.groupId));
  if (!userId || isNaN(groupId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const rows = await db.select().from(studyGroupsTable).where(eq(studyGroupsTable.id, groupId)).limit(1);
  if (!rows[0]) { res.status(404).json({ error: "Not found" }); return; }
  if (rows[0].ownerId !== userId) { res.status(403).json({ error: "Owner only" }); return; }

  broadcast(groupId, "group_deleted", { groupId });

  await db.delete(studyGroupMessageReactionsTable).where(
    inArray(
      studyGroupMessageReactionsTable.messageId,
      db.select({ id: studyGroupMessagesTable.id }).from(studyGroupMessagesTable).where(eq(studyGroupMessagesTable.groupId, groupId)),
    ),
  );
  await db.delete(studyGroupMessagesTable).where(eq(studyGroupMessagesTable.groupId, groupId));
  await db.delete(studyGroupMembersTable).where(eq(studyGroupMembersTable.groupId, groupId));
  await db.delete(studyGroupNotificationsTable).where(eq(studyGroupNotificationsTable.groupId, groupId));
  await db.delete(studyGroupInviteCodesTable).where(eq(studyGroupInviteCodesTable.groupId, groupId));
  await db.delete(studyGroupsTable).where(eq(studyGroupsTable.id, groupId));

  res.json({ ok: true });
});

// ── Invite codes ──────────────────────────────────────────────────────────────

// POST /study-groups/:groupId/invite-codes — generate a fresh single-use code (owner/admin only)
router.post("/:groupId/invite-codes", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const groupId = parseInt(String(req.params.groupId));
  if (!userId || isNaN(groupId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const membership = await requireAcceptedMember(groupId, userId);
  if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
    res.status(403).json({ error: "Owner/admin only" });
    return;
  }

  const code = await generateUniqueInviteCode();
  await db.insert(studyGroupInviteCodesTable).values({ groupId, code, createdBy: userId });

  res.json({ code });
});

// GET /study-groups/join/:code — preview a group before joining. Any logged-in user.
router.get("/join/:code", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const code = String(req.params.code).trim().toUpperCase();
  if (!userId || !code) { res.status(400).json({ error: "Invalid request" }); return; }

  const inviteRows = await db
    .select()
    .from(studyGroupInviteCodesTable)
    .where(and(eq(studyGroupInviteCodesTable.code, code), isNull(studyGroupInviteCodesTable.usedByUserId)))
    .limit(1);
  const invite = inviteRows[0];
  if (!invite) {
    res.status(404).json({ error: "Invalid or already-used invite code. Please check the code and try again." });
    return;
  }

  const groupRows = await db.select().from(studyGroupsTable).where(eq(studyGroupsTable.id, invite.groupId)).limit(1);
  const group = groupRows[0];
  if (!group) {
    res.status(404).json({ error: "Invalid or already-used invite code. Please check the code and try again." });
    return;
  }

  const existing = await getMembership(group.id, userId);
  const members = await db
    .select()
    .from(studyGroupMembersTable)
    .where(and(eq(studyGroupMembersTable.groupId, group.id), eq(studyGroupMembersTable.status, "accepted")));
  const [owner] = await db.select().from(userStatsTable).where(eq(userStatsTable.userId, group.ownerId)).limit(1);

  res.json({
    id: group.id,
    name: group.name,
    description: group.description,
    avatarObjectPath: group.avatarObjectPath,
    ownerId: group.ownerId,
    ownerUsername: owner?.username ?? null,
    memberCount: members.length,
    alreadyMember: !!existing && existing.status === "accepted",
  });
});

// POST /study-groups/join/:code — redeem a single-use invite code and join immediately.
router.post("/join/:code", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const code = String(req.params.code).trim().toUpperCase();
  if (!userId || !code) { res.status(400).json({ error: "Invalid request" }); return; }

  const inviteRows = await db
    .select()
    .from(studyGroupInviteCodesTable)
    .where(and(eq(studyGroupInviteCodesTable.code, code), isNull(studyGroupInviteCodesTable.usedByUserId)))
    .limit(1);
  const invite = inviteRows[0];
  if (!invite) {
    res.status(404).json({ error: "Invalid or already-used invite code. Please check the code and try again." });
    return;
  }

  const groupRows = await db.select().from(studyGroupsTable).where(eq(studyGroupsTable.id, invite.groupId)).limit(1);
  const group = groupRows[0];
  if (!group) {
    res.status(404).json({ error: "Invalid or already-used invite code. Please check the code and try again." });
    return;
  }

  // Check membership *before* burning the code — an already-member (or a direct
  // re-post of a successful join) must not consume a code that could otherwise
  // still be shared with someone else.
  const existing = await getMembership(group.id, userId);
  if (existing && existing.status === "accepted") {
    res.status(409).json({ error: "You're already a member of this group" });
    return;
  }

  // Claim the code and upsert membership atomically in one transaction: the
  // claim only succeeds if the code is still unused (guards concurrent
  // redemption), and if the membership write fails, the claim rolls back too
  // so the code is not burned without a completed join.
  const joined = await db.transaction(async (tx) => {
    const claimed = await tx
      .update(studyGroupInviteCodesTable)
      .set({ usedByUserId: userId, usedAt: new Date() })
      .where(and(eq(studyGroupInviteCodesTable.id, invite.id), isNull(studyGroupInviteCodesTable.usedByUserId)))
      .returning();
    if (claimed.length === 0) return false;

    if (existing) {
      await tx
        .update(studyGroupMembersTable)
        .set({ status: "accepted", role: existing.role === "owner" ? existing.role : "member", respondedAt: new Date() })
        .where(eq(studyGroupMembersTable.id, existing.id));
    } else {
      await tx.insert(studyGroupMembersTable).values({ groupId: group.id, userId, role: "member", status: "accepted", invitedBy: invite.createdBy, respondedAt: new Date() });
    }
    return true;
  });

  if (!joined) {
    res.status(404).json({ error: "Invalid or already-used invite code. Please check the code and try again." });
    return;
  }

  await notify(group.ownerId, "joined_via_code", group.id, userId);
  broadcast(group.id, "group_updated", { groupId: group.id });

  res.json(await serializeGroupSummary(group, "member"));
});

// ── Members ───────────────────────────────────────────────────────────────────

router.post("/:groupId/invites", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const groupId = parseInt(String(req.params.groupId));
  if (!userId || isNaN(groupId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const membership = await requireAcceptedMember(groupId, userId);
  if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
    res.status(403).json({ error: "Owner/admin only" });
    return;
  }

  const { usernames } = req.body as { usernames?: string[] };
  if (!usernames || usernames.length === 0) { res.status(400).json({ error: "usernames is required" }); return; }

  const users = await db.select().from(userStatsTable).where(inArray(userStatsTable.username, usernames));
  const created: (typeof studyGroupMembersTable.$inferSelect)[] = [];

  for (const u of users) {
    const existing = await getMembership(groupId, u.userId);
    if (existing) continue;
    const [m] = await db
      .insert(studyGroupMembersTable)
      .values({ groupId, userId: u.userId, role: "member", status: "pending", invitedBy: userId })
      .returning();
    created.push(m);
    await notify(u.userId, "group_invite", groupId, userId);
  }

  res.json(created.map((m) => ({ ...m, createdAt: m.createdAt?.toISOString() ?? new Date().toISOString() })));
});

router.patch("/:groupId/members/:memberUserId", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const groupId = parseInt(String(req.params.groupId));
  const memberUserId = String(req.params.memberUserId);
  if (!userId || isNaN(groupId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const group = (await db.select().from(studyGroupsTable).where(eq(studyGroupsTable.id, groupId)).limit(1))[0];
  if (!group || group.ownerId !== userId) { res.status(403).json({ error: "Owner only" }); return; }

  const { role } = req.body as { role?: "admin" | "member" };
  if (role !== "admin" && role !== "member") { res.status(400).json({ error: "Invalid role" }); return; }

  const [updated] = await db
    .update(studyGroupMembersTable)
    .set({ role })
    .where(and(eq(studyGroupMembersTable.groupId, groupId), eq(studyGroupMembersTable.userId, memberUserId)))
    .returning();
  if (!updated) { res.status(404).json({ error: "Member not found" }); return; }

  await notify(memberUserId, "role_changed", groupId, userId, { role });
  broadcast(groupId, "member_updated", { userId: memberUserId, role });

  res.json({ ...updated, createdAt: updated.createdAt?.toISOString() ?? new Date().toISOString() });
});

router.delete("/:groupId/members/:memberUserId", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const groupId = parseInt(String(req.params.groupId));
  const memberUserId = String(req.params.memberUserId);
  if (!userId || isNaN(groupId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const group = (await db.select().from(studyGroupsTable).where(eq(studyGroupsTable.id, groupId)).limit(1))[0];
  if (!group) { res.status(404).json({ error: "Not found" }); return; }

  const requester = await getMembership(groupId, userId);
  const isSelf = memberUserId === userId;
  const canManage = requester && (requester.role === "owner" || requester.role === "admin");

  if (!isSelf && !canManage) { res.status(403).json({ error: "Not allowed" }); return; }
  if (memberUserId === group.ownerId && isSelf) { res.status(403).json({ error: "Owner cannot leave; delete the group instead" }); return; }

  await db.delete(studyGroupMembersTable).where(and(eq(studyGroupMembersTable.groupId, groupId), eq(studyGroupMembersTable.userId, memberUserId)));

  if (!isSelf) await notify(memberUserId, "member_removed", groupId, userId);
  broadcast(groupId, "member_left", { userId: memberUserId });

  res.json({ ok: true });
});

// ── Messages ──────────────────────────────────────────────────────────────────

async function serializeMessages(rows: (typeof studyGroupMessagesTable.$inferSelect)[]) {
  if (rows.length === 0) return [];
  const statsMap = await getStatsMap(rows.map((r) => r.userId));
  const reactions = await db
    .select()
    .from(studyGroupMessageReactionsTable)
    .where(inArray(studyGroupMessageReactionsTable.messageId, rows.map((r) => r.id)));
  const reactionsByMessage = new Map<number, typeof reactions>();
  for (const r of reactions) {
    if (!reactionsByMessage.has(r.messageId)) reactionsByMessage.set(r.messageId, []);
    reactionsByMessage.get(r.messageId)!.push(r);
  }

  return rows.map((m) => {
    const stats = statsMap.get(m.userId);
    return {
      id: m.id,
      groupId: m.groupId,
      userId: m.userId,
      username: stats?.username ?? null,
      displayName: stats?.displayName ?? "User",
      avatarUrl: stats?.avatarUrl ?? null,
      content: m.deleted ? "" : m.content,
      replyToId: m.replyToId,
      mentions: m.mentions,
      attachments: m.deleted ? [] : m.attachments,
      reactions: (reactionsByMessage.get(m.id) ?? []).map((r) => ({ messageId: r.messageId, userId: r.userId, emoji: r.emoji })),
      deleted: m.deleted,
      createdAt: m.createdAt?.toISOString() ?? new Date().toISOString(),
    };
  });
}

router.get("/:groupId/messages", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const groupId = parseInt(String(req.params.groupId));
  if (!userId || isNaN(groupId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const membership = await requireAcceptedMember(groupId, userId);
  if (!membership) { res.status(403).json({ error: "Not a member" }); return; }

  const before = req.query.before ? parseInt(String(req.query.before)) : null;
  const limit = req.query.limit ? Math.min(parseInt(String(req.query.limit)), 100) : 50;

  const rows = await db
    .select()
    .from(studyGroupMessagesTable)
    .where(
      before != null
        ? and(eq(studyGroupMessagesTable.groupId, groupId), lt(studyGroupMessagesTable.id, before))
        : eq(studyGroupMessagesTable.groupId, groupId),
    )
    .orderBy(desc(studyGroupMessagesTable.id))
    .limit(limit);

  const serialized = await serializeMessages(rows.reverse());
  res.json(serialized);
});

router.post("/:groupId/messages", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const groupId = parseInt(String(req.params.groupId));
  if (!userId || isNaN(groupId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const membership = await requireAcceptedMember(groupId, userId);
  if (!membership) { res.status(403).json({ error: "Not a member" }); return; }

  const { content, replyToId, mentions, attachments } = req.body as {
    content?: string;
    replyToId?: number | null;
    mentions?: string[];
    attachments?: MessageAttachment[];
  };
  if ((!content || !content.trim()) && (!attachments || attachments.length === 0)) {
    res.status(400).json({ error: "Message must have content or an attachment" });
    return;
  }

  const [message] = await db
    .insert(studyGroupMessagesTable)
    .values({
      groupId,
      userId,
      content: content ?? "",
      replyToId: replyToId ?? null,
      mentions: mentions ?? [],
      attachments: attachments ?? [],
    })
    .returning();

  if (mentions && mentions.length > 0) {
    const mentionedUsers = await db.select().from(userStatsTable).where(inArray(userStatsTable.username, mentions));
    for (const u of mentionedUsers) {
      if (u.userId === userId) continue;
      await notify(u.userId, "mention", groupId, userId, { messageId: message.id });
    }
  }

  const [serialized] = await serializeMessages([message]);
  broadcast(groupId, "message_new", serialized);
  res.json(serialized);
});

router.delete("/:groupId/messages/:messageId", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const groupId = parseInt(String(req.params.groupId));
  const messageId = parseInt(String(req.params.messageId));
  if (!userId || isNaN(groupId) || isNaN(messageId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const rows = await db.select().from(studyGroupMessagesTable).where(eq(studyGroupMessagesTable.id, messageId)).limit(1);
  if (!rows[0] || rows[0].groupId !== groupId) { res.status(404).json({ error: "Not found" }); return; }
  if (rows[0].userId !== userId) { res.status(403).json({ error: "Not your message" }); return; }

  await db.update(studyGroupMessagesTable).set({ deleted: true, content: "", attachments: [] }).where(eq(studyGroupMessagesTable.id, messageId));

  broadcast(groupId, "message_deleted", { messageId });
  res.json({ ok: true });
});

router.post("/:groupId/messages/:messageId/reactions", requireApiAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const groupId = parseInt(String(req.params.groupId));
  const messageId = parseInt(String(req.params.messageId));
  if (!userId || isNaN(groupId) || isNaN(messageId)) { res.status(400).json({ error: "Invalid request" }); return; }

  const membership = await requireAcceptedMember(groupId, userId);
  if (!membership) { res.status(403).json({ error: "Not a member" }); return; }

  const { emoji } = req.body as { emoji?: string };
  if (!emoji) { res.status(400).json({ error: "emoji is required" }); return; }

  const existing = await db
    .select()
    .from(studyGroupMessageReactionsTable)
    .where(
      and(
        eq(studyGroupMessageReactionsTable.messageId, messageId),
        eq(studyGroupMessageReactionsTable.userId, userId),
        eq(studyGroupMessageReactionsTable.emoji, emoji),
      ),
    )
    .limit(1);

  if (existing[0]) {
    await db.delete(studyGroupMessageReactionsTable).where(eq(studyGroupMessageReactionsTable.id, existing[0].id));
  } else {
    await db.insert(studyGroupMessageReactionsTable).values({ messageId, userId, emoji });
  }

  const reactions = await db.select().from(studyGroupMessageReactionsTable).where(eq(studyGroupMessageReactionsTable.messageId, messageId));
  const out = reactions.map((r) => ({ messageId: r.messageId, userId: r.userId, emoji: r.emoji }));
  broadcast(groupId, "reaction_updated", { messageId, reactions: out });
  res.json(out);
});

export default router;
