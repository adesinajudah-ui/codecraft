import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, Link } from "wouter";
import { useUser } from "@clerk/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetStudyGroup,
  getGetStudyGroupQueryKey,
  useListStudyGroupMessages,
  getListStudyGroupMessagesQueryKey,
  getSearchUsersQueryKey,
  useCreateStudyGroupMessage,
  useDeleteStudyGroupMessage,
  useToggleStudyGroupMessageReaction,
  useInviteStudyGroupMembers,
  useUpdateStudyGroupMemberRole,
  useRemoveStudyGroupMember,
  useUpdateStudyGroup,
  useDeleteStudyGroup,
  useSearchUsers,
  type StudyGroupMessageOut,
  type MemberOut,
} from "@workspace/api-client-react";
import { useStudyGroupEvents, sendTypingPing } from "@/hooks/useStudyGroupEvents";
import { extractMentions, MessageContent } from "@/lib/messageFormat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import {
  ArrowLeft,
  Send,
  Smile,
  Reply,
  Trash2,
  MoreVertical,
  Crown,
  ShieldCheck,
  UserPlus,
  Settings2,
  X,
  Circle,
  Loader2,
  LogOut,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const REACTION_EMOJIS = ["👍", "❤️", "😂", "🎉", "🤔", "🔥"];

function objectUrl(objectPath: string | null | undefined) {
  if (!objectPath) return undefined;
  const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  return `${basePath}${objectPath.replace(/^\//, "")}`;
}

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function InviteDialog({ groupId }: { groupId: number }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const { data: results } = useSearchUsers(
    { q: query },
    { query: { enabled: query.trim().length > 0, queryKey: getSearchUsersQueryKey({ q: query }) } },
  );

  const { mutate, isPending } = useInviteStudyGroupMembers({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetStudyGroupQueryKey(groupId) });
        toast({ title: "Invitations sent" });
        setOpen(false);
        setSelected([]);
        setQuery("");
      },
      onError: () => toast({ title: "Couldn't send invitations", variant: "destructive" }),
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5">
          <UserPlus className="w-4 h-4" /> Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[380px]">
        <DialogHeader>
          <DialogTitle>Invite by username</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Search username..." value={query} onChange={(e) => setQuery(e.target.value)} />
          {selected.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {selected.map((u) => (
                <Badge key={u} variant="secondary" className="gap-1">
                  @{u}
                  <button onClick={() => setSelected((s) => s.filter((x) => x !== u))}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <div className="max-h-48 overflow-y-auto space-y-1">
            {results?.filter((r) => !selected.includes(r.username)).map((r) => (
              <button
                key={r.userId}
                className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-secondary text-left"
                onClick={() => { setSelected((s) => [...s, r.username]); setQuery(""); }}
              >
                <Avatar className="w-7 h-7">
                  <AvatarImage src={r.avatarUrl ?? undefined} />
                  <AvatarFallback className="text-xs bg-primary/20 text-primary">{initials(r.displayName)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{r.displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">@{r.username}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button disabled={selected.length === 0 || isPending} onClick={() => mutate({ groupId, data: { usernames: selected } })}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : `Send ${selected.length || ""} invite${selected.length === 1 ? "" : "s"}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MemberRow({ groupId, member, myRole, isMe }: { groupId: number; member: MemberOut; myRole: string; isMe: boolean }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: getGetStudyGroupQueryKey(groupId) });

  const { mutate: updateRole } = useUpdateStudyGroupMemberRole({ mutation: { onSuccess: invalidate } });
  const { mutate: removeMember } = useRemoveStudyGroupMember({
    mutation: { onSuccess: () => { invalidate(); if (isMe) window.location.href = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "") + "/study-groups"; } },
  });

  const canManage = (myRole === "owner" || myRole === "admin") && member.role !== "owner" && !isMe;
  const canLeave = isMe && member.role !== "owner";

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/50">
      <div className="relative flex-shrink-0">
        <Avatar className="w-9 h-9 border border-border">
          <AvatarImage src={member.avatarUrl ?? undefined} />
          <AvatarFallback className="text-xs bg-primary/20 text-primary font-bold">{initials(member.displayName)}</AvatarFallback>
        </Avatar>
        <Circle className={`w-2.5 h-2.5 absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-background ${member.online ? "fill-green-500 text-green-500" : "fill-muted-foreground/40 text-muted-foreground/40"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold truncate">{member.displayName}{isMe ? " (you)" : ""}</p>
          {member.role === "owner" && <Crown className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
          {member.role === "admin" && <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {member.username && <span>@{member.username}</span>}
          <span>·</span>
          <span>{member.xp} XP</span>
          <Badge variant="outline" className="text-[10px] py-0 px-1 h-4">{member.learningLevel}</Badge>
        </div>
      </div>
      {(canManage || canLeave) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-7 w-7 flex-shrink-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {canManage && member.role === "member" && (
              <DropdownMenuItem onClick={() => updateRole({ groupId, userId: member.userId, data: { role: "admin" } })}>
                Promote to admin
              </DropdownMenuItem>
            )}
            {canManage && member.role === "admin" && (
              <DropdownMenuItem onClick={() => updateRole({ groupId, userId: member.userId, data: { role: "member" } })}>
                Demote to member
              </DropdownMenuItem>
            )}
            {canManage && (
              <DropdownMenuItem className="text-destructive" onClick={() => removeMember({ groupId, userId: member.userId })}>
                Remove from group
              </DropdownMenuItem>
            )}
            {canLeave && (
              <DropdownMenuItem className="text-destructive" onClick={() => removeMember({ groupId, userId: member.userId })}>
                Leave group
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

function GroupSettingsDialog({ groupId, name, description }: { groupId: number; name: string; description: string | null }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description ?? "");

  const { mutate: update, isPending } = useUpdateStudyGroup({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetStudyGroupQueryKey(groupId) });
        setOpen(false);
        toast({ title: "Group updated" });
      },
    },
  });
  const { mutate: remove } = useDeleteStudyGroup({
    mutation: {
      onSuccess: () => {
        toast({ title: "Group deleted" });
        window.location.href = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "") + "/study-groups";
      },
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Settings2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[380px]">
        <DialogHeader>
          <DialogTitle>Group Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input value={newName} onChange={(e) => setNewName(e.target.value)} maxLength={60} />
          <Textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="resize-none" placeholder="Description" />
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            className="w-full"
            disabled={isPending || !newName.trim()}
            onClick={() => update({ groupId, data: { name: newName.trim(), description: newDescription.trim() || null } })}
          >
            Save changes
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => { if (confirm("Delete this group permanently? This cannot be undone.")) remove({ groupId }); }}
          >
            <Trash2 className="w-4 h-4 mr-1.5" /> Delete Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MessageBubble({
  message,
  isMe,
  myUsername,
  replyTo,
  onReply,
  onDelete,
  onReact,
}: {
  message: StudyGroupMessageOut;
  isMe: boolean;
  myUsername: string | null;
  replyTo?: StudyGroupMessageOut;
  onReply: () => void;
  onDelete: () => void;
  onReact: (emoji: string) => void;
}) {
  const reactionCounts = new Map<string, number>();
  for (const r of message.reactions) reactionCounts.set(r.emoji, (reactionCounts.get(r.emoji) ?? 0) + 1);

  return (
    <div className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
      <Avatar className="w-7 h-7 flex-shrink-0 mt-0.5">
        <AvatarImage src={message.avatarUrl ?? undefined} />
        <AvatarFallback className="text-[10px] bg-primary/20 text-primary font-bold">{initials(message.displayName)}</AvatarFallback>
      </Avatar>
      <div className={`max-w-[75%] group ${isMe ? "items-end" : "items-start"} flex flex-col`}>
        {!isMe && <span className="text-xs font-semibold text-muted-foreground mb-0.5 px-1">{message.displayName}</span>}
        {replyTo && (
          <div className="text-xs border-l-2 border-primary/50 pl-2 mb-1 text-muted-foreground max-w-full truncate">
            replying to <span className="font-medium">{replyTo.displayName}</span>: {replyTo.deleted ? "(deleted)" : replyTo.content.slice(0, 60)}
          </div>
        )}
        <div className={`relative rounded-2xl px-3 py-2 ${isMe ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary rounded-bl-sm"}`}>
          {message.deleted ? (
            <span className="text-sm italic opacity-60">Message deleted</span>
          ) : (
            <>
              <MessageContent content={message.content} isMentioned={(u) => u === myUsername} />
              {message.attachments.length > 0 && (
                <div className="mt-1.5 space-y-1">
                  {message.attachments.map((a, i) => (
                    <a key={i} href={objectUrl(a.objectPath)} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs underline opacity-90">
                      📎 {a.name}
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        {reactionCounts.size > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {[...reactionCounts.entries()].map(([emoji, count]) => (
              <button key={emoji} onClick={() => onReact(emoji)} className="text-xs bg-secondary rounded-full px-1.5 py-0.5 border border-border/60">
                {emoji} {count}
              </button>
            ))}
          </div>
        )}
        {!message.deleted && (
          <div className="hidden group-hover:flex gap-1 mt-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground"><Smile className="w-3.5 h-3.5" /></button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isMe ? "end" : "start"}>
                <div className="flex gap-1 p-1">
                  {REACTION_EMOJIS.map((e) => (
                    <button key={e} className="text-lg hover:scale-125 transition-transform" onClick={() => onReact(e)}>{e}</button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <button className="text-muted-foreground hover:text-foreground" onClick={onReply}><Reply className="w-3.5 h-3.5" /></button>
            {isMe && <button className="text-muted-foreground hover:text-destructive" onClick={onDelete}><Trash2 className="w-3.5 h-3.5" /></button>}
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudyGroupDetail() {
  const { groupId: groupIdParam } = useParams<{ groupId: string }>();
  const groupId = parseInt(groupIdParam ?? "");
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: group, isLoading } = useGetStudyGroup(groupId, {
    query: { enabled: !isNaN(groupId), queryKey: getGetStudyGroupQueryKey(groupId) },
  });
  const { data: messages } = useListStudyGroupMessages(groupId, {}, {
    query: { enabled: !isNaN(groupId), queryKey: getListStudyGroupMessagesQueryKey(groupId, {}) },
  });

  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<StudyGroupMessageOut | null>(null);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const messagesKey = getListStudyGroupMessagesQueryKey(groupId);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }));
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages?.length, scrollToBottom]);

  useStudyGroupEvents(isNaN(groupId) ? null : groupId, {
    onMessageNew: (data) => {
      queryClient.setQueryData(messagesKey, (old: StudyGroupMessageOut[] | undefined) => {
        if (!old) return old;
        if (old.some((m) => m.id === (data as StudyGroupMessageOut).id)) return old;
        return [...old, data as StudyGroupMessageOut];
      });
      scrollToBottom();
    },
    onMessageDeleted: ({ messageId }) => {
      queryClient.setQueryData(messagesKey, (old: StudyGroupMessageOut[] | undefined) =>
        old?.map((m) => (m.id === messageId ? { ...m, deleted: true, content: "", attachments: [] } : m)),
      );
    },
    onReactionUpdated: ({ messageId, reactions }) => {
      queryClient.setQueryData(messagesKey, (old: StudyGroupMessageOut[] | undefined) =>
        old?.map((m) => (m.id === messageId ? { ...m, reactions: reactions as StudyGroupMessageOut["reactions"] } : m)),
      );
    },
    onTyping: ({ userId }) => {
      if (userId === user?.id) return;
      setTypingUsers((prev) => new Set(prev).add(userId));
      clearTimeout(typingTimeout.current.get(userId));
      typingTimeout.current.set(
        userId,
        setTimeout(() => setTypingUsers((prev) => { const next = new Set(prev); next.delete(userId); return next; }), 3000),
      );
    },
    onPresence: () => queryClient.invalidateQueries({ queryKey: getGetStudyGroupQueryKey(groupId) }),
    onMemberJoined: () => queryClient.invalidateQueries({ queryKey: getGetStudyGroupQueryKey(groupId) }),
    onMemberLeft: () => queryClient.invalidateQueries({ queryKey: getGetStudyGroupQueryKey(groupId) }),
    onMemberUpdated: () => queryClient.invalidateQueries({ queryKey: getGetStudyGroupQueryKey(groupId) }),
    onGroupUpdated: () => queryClient.invalidateQueries({ queryKey: getGetStudyGroupQueryKey(groupId) }),
  });

  const { mutate: sendMessage, isPending: sending } = useCreateStudyGroupMessage({
    mutation: {
      onSuccess: (data) => {
        queryClient.setQueryData(messagesKey, (old: StudyGroupMessageOut[] | undefined) => (old ? [...old, data] : [data]));
        setInput("");
        setReplyTo(null);
        scrollToBottom();
      },
      onError: () => toast({ title: "Message failed to send", variant: "destructive" }),
    },
  });

  const { mutate: deleteMessage } = useDeleteStudyGroupMessage({
    mutation: {
      onSuccess: (_data, variables) => {
        queryClient.setQueryData(messagesKey, (old: StudyGroupMessageOut[] | undefined) =>
          old?.map((m) => (m.id === variables.messageId ? { ...m, deleted: true, content: "", attachments: [] } : m)),
        );
      },
    },
  });

  const { mutate: toggleReaction } = useToggleStudyGroupMessageReaction({
    mutation: {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(messagesKey, (old: StudyGroupMessageOut[] | undefined) =>
          old?.map((m) => (m.id === variables.messageId ? { ...m, reactions: data } : m)),
        );
      },
    },
  });

  if (isNaN(groupId)) return null;

  const messageById = new Map((messages ?? []).map((m) => [m.id, m]));
  const myMember = group?.members.find((m) => m.userId === user?.id);
  const myRole = myMember?.role ?? "member";
  const myUsername = myMember?.username ?? null;

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage({ groupId, data: { content: trimmed, replyToId: replyTo?.id ?? null, mentions: extractMentions(trimmed) } });
  };

  const typingLabel = [...typingUsers]
    .map((uid) => group?.members.find((m) => m.userId === uid)?.displayName)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border bg-card flex-shrink-0">
        <Link href="/study-groups"><Button size="icon" variant="ghost" className="h-8 w-8"><ArrowLeft className="w-4 h-4" /></Button></Link>
        {isLoading || !group ? (
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        ) : (
          <>
            <Avatar className="w-8 h-8 border border-border">
              <AvatarImage src={objectUrl(group.avatarObjectPath)} />
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">{initials(group.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{group.name}</p>
              <p className="text-xs text-muted-foreground truncate">{group.memberCount} members</p>
            </div>
            {myRole === "owner" && <GroupSettingsDialog groupId={groupId} name={group.name} description={group.description ?? null} />}
          </>
        )}
      </div>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-full flex-shrink-0 rounded-none border-b border-border bg-transparent h-10">
          <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
          <TabsTrigger value="members" className="flex-1">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col min-h-0 mt-0">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            {(messages ?? []).map((m) => (
              <MessageBubble
                key={m.id}
                message={m}
                isMe={m.userId === user?.id}
                myUsername={myUsername}
                replyTo={m.replyToId ? messageById.get(m.replyToId) : undefined}
                onReply={() => setReplyTo(m)}
                onDelete={() => deleteMessage({ groupId, messageId: m.id })}
                onReact={(emoji) => toggleReaction({ groupId, messageId: m.id, data: { emoji } })}
              />
            ))}
          </div>

          {typingLabel && <p className="text-xs text-muted-foreground px-3 pb-1 italic">{typingLabel} typing...</p>}

          {replyTo && (
            <div className="flex items-center justify-between px-3 py-1.5 bg-secondary/60 border-t border-border text-xs">
              <span className="truncate">Replying to <span className="font-medium">{replyTo.displayName}</span></span>
              <button onClick={() => setReplyTo(null)}><X className="w-3.5 h-3.5" /></button>
            </div>
          )}

          <div className="p-2.5 border-t border-border flex items-end gap-2 flex-shrink-0">
            <Textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); sendTypingPing(groupId); }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Message... use @username or ```code```"
              className="min-h-[38px] max-h-24 text-sm resize-none py-2"
            />
            <Button size="icon" className="h-9 w-9 flex-shrink-0" disabled={!input.trim() || sending} onClick={handleSend}>
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="members" className="flex-1 overflow-y-auto p-2 mt-0 space-y-1">
          <div className="flex justify-end px-1 pb-2">
            {(myRole === "owner" || myRole === "admin") && <InviteDialog groupId={groupId} />}
          </div>
          {group?.members.filter((m) => m.status === "accepted").map((m) => (
            <MemberRow key={m.userId} groupId={groupId} member={m} myRole={myRole} isMe={m.userId === user?.id} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
