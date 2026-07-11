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
  useGenerateInviteCode,
  type StudyGroupMessageOut,
  type MemberOut,
  type MessageAttachmentOut,
} from "@workspace/api-client-react";
import { useUpload } from "@workspace/object-storage-web";
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
  KeyRound,
  Copy,
  Share2,
  RefreshCw,
  Check as CheckIcon,
  Camera,
  Paperclip,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const REACTION_EMOJIS = ["👍", "❤️", "😂", "🎉", "🤔", "🔥"];

function objectUrl(objectPath: string | null | undefined) {
  if (!objectPath) return undefined;
  const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  return `${basePath}/api/storage${objectPath}`;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
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

  const { mutate: generateCode, isPending: generating } = useGenerateInviteCode({
    mutation: {
      onSuccess: (data) => { setGeneratedCode(data.code); setCopied(false); },
      onError: () => toast({ title: "Couldn't generate a code", variant: "destructive" }),
    },
  });

  const handleCopy = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    toast({ title: "Code copied" });
    setTimeout(() => setCopied(false), 1500);
  };

  const handleShare = async () => {
    if (!generatedCode) return;
    const text = `Join my CodeCraft study group with this one-time code: ${generatedCode}`;
    if (navigator.share) {
      try { await navigator.share({ text }); } catch { /* user cancelled */ }
    } else {
      navigator.clipboard.writeText(text);
      toast({ title: "Share text copied to clipboard" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setGeneratedCode(null); setCopied(false); } }}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5">
          <UserPlus className="w-4 h-4" /> Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[380px]">
        <DialogHeader>
          <DialogTitle>Invite to group</DialogTitle>
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
          <Button disabled={selected.length === 0 || isPending} className="w-full" onClick={() => mutate({ groupId, data: { usernames: selected } })}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : `Send ${selected.length || ""} invite${selected.length === 1 ? "" : "s"}`}
          </Button>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-background px-2 text-xs text-muted-foreground">or</span></div>
          </div>

          {!generatedCode ? (
            <Button variant="outline" className="w-full gap-1.5" disabled={generating} onClick={() => generateCode({ groupId })}>
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />} Generate Code
            </Button>
          ) : (
            <div className="space-y-2 rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground text-center">One-time code — works for a single person, once</p>
              <p className="text-center text-lg font-mono font-bold tracking-widest py-1.5 bg-secondary/60 rounded-md">{generatedCode}</p>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline" onClick={handleCopy}>
                  {copied ? <CheckIcon className="w-3.5 h-3.5 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />} Copy
                </Button>
                <Button size="sm" variant="outline" onClick={handleShare}>
                  <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share
                </Button>
              </div>
              <Button size="sm" variant="ghost" className="w-full" disabled={generating} onClick={() => generateCode({ groupId })}>
                {generating ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5 mr-1.5" />} Generate another
              </Button>
            </div>
          )}
        </div>
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

function GroupSettingsDialog({
  groupId,
  name,
  description,
  avatarObjectPath,
}: {
  groupId: number;
  name: string;
  description: string | null;
  avatarObjectPath: string | null;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description ?? "");
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const { mutate: update, isPending } = useUpdateStudyGroup({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetStudyGroupQueryKey(groupId) });
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

  const { uploadFile, isUploading: uploadingAvatar } = useUpload({
    basePath: `${(import.meta.env.BASE_URL ?? "/").replace(/\/$/, "")}/api/storage`,
    onSuccess: (res) => update({ groupId, data: { avatarObjectPath: res.objectPath } }),
    onError: () => toast({ title: "Couldn't upload picture", variant: "destructive" }),
  });

  const handleAvatarPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Please choose an image file", variant: "destructive" });
      return;
    }
    uploadFile(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Settings2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[380px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Group Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex justify-center py-1">
            <button
              type="button"
              className="relative group/avatar rounded-full"
              disabled={uploadingAvatar}
              onClick={() => avatarInputRef.current?.click()}
            >
              <Avatar className="w-16 h-16 border border-border">
                <AvatarImage src={objectUrl(avatarObjectPath)} />
                <AvatarFallback className="bg-primary/20 text-primary text-lg font-bold">{initials(name)}</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                {uploadingAvatar ? <Loader2 className="w-5 h-5 text-white animate-spin" /> : <Camera className="w-5 h-5 text-white" />}
              </div>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarPick} />
            </button>
          </div>
          <Input value={newName} onChange={(e) => setNewName(e.target.value)} maxLength={60} />
          <Textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="resize-none" placeholder="Description" />
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            className="w-full"
            disabled={isPending || !newName.trim()}
            onClick={() => update({ groupId, data: { name: newName.trim(), description: newDescription.trim() || null } }, { onSuccess: () => setOpen(false) })}
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
                <div className="mt-1.5 space-y-1.5">
                  {message.attachments.map((a, i) =>
                    a.contentType.startsWith("image/") ? (
                      <a key={i} href={objectUrl(a.objectPath)} target="_blank" rel="noreferrer" className="block">
                        <img src={objectUrl(a.objectPath)} alt={a.name} className="max-w-full max-h-56 rounded-lg border border-border/40" />
                      </a>
                    ) : (
                      <a key={i} href={objectUrl(a.objectPath)} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs underline opacity-90">
                        <FileText className="w-3.5 h-3.5 flex-shrink-0" /> {a.name} <span className="opacity-70">({formatFileSize(a.size)})</span>
                      </a>
                    ),
                  )}
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
  const [pendingAttachment, setPendingAttachment] = useState<MessageAttachmentOut | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  const { uploadFile, isUploading: uploadingAttachment } = useUpload({
    basePath: `${(import.meta.env.BASE_URL ?? "/").replace(/\/$/, "")}/api/storage`,
    onSuccess: (res) => setPendingAttachment({ objectPath: res.objectPath, name: res.metadata.name, size: res.metadata.size, contentType: res.metadata.contentType }),
    onError: () => toast({ title: "Couldn't upload file", variant: "destructive" }),
  });

  const messagesKey = getListStudyGroupMessagesQueryKey(groupId, {});

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
        queryClient.setQueryData(messagesKey, (old: StudyGroupMessageOut[] | undefined) => {
          if (!old) return [data];
          if (old.some((m) => m.id === data.id)) return old;
          return [...old, data];
        });
        setInput("");
        setReplyTo(null);
        setPendingAttachment(null);
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
    if (!trimmed && !pendingAttachment) return;
    sendMessage({
      groupId,
      data: {
        content: trimmed,
        replyToId: replyTo?.id ?? null,
        mentions: extractMentions(trimmed),
        attachments: pendingAttachment ? [pendingAttachment] : [],
      },
    });
  };

  const handleAttachmentPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File is too large (max 10 MB)", variant: "destructive" });
      return;
    }
    uploadFile(file);
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
            {myRole === "owner" && (
              <GroupSettingsDialog
                groupId={groupId}
                name={group.name}
                description={group.description ?? null}
                avatarObjectPath={group.avatarObjectPath ?? null}
              />
            )}
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

          {(pendingAttachment || uploadingAttachment) && (
            <div className="flex items-center justify-between px-3 py-1.5 bg-secondary/60 border-t border-border text-xs">
              {uploadingAttachment ? (
                <span className="flex items-center gap-1.5 text-muted-foreground"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...</span>
              ) : (
                <span className="flex items-center gap-1.5 truncate">
                  {pendingAttachment?.contentType.startsWith("image/") ? <ImageIcon className="w-3.5 h-3.5 flex-shrink-0" /> : <FileText className="w-3.5 h-3.5 flex-shrink-0" />}
                  <span className="truncate">{pendingAttachment?.name}</span>
                  <span className="text-muted-foreground flex-shrink-0">{pendingAttachment && formatFileSize(pendingAttachment.size)}</span>
                </span>
              )}
              {!uploadingAttachment && (
                <button onClick={() => setPendingAttachment(null)}><X className="w-3.5 h-3.5" /></button>
              )}
            </div>
          )}

          <div className="p-2.5 border-t border-border flex items-end gap-2 flex-shrink-0">
            <input ref={attachmentInputRef} type="file" className="hidden" onChange={handleAttachmentPick} />
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 flex-shrink-0"
              disabled={uploadingAttachment || !!pendingAttachment}
              onClick={() => attachmentInputRef.current?.click()}
              title="Attach a picture or file"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); sendTypingPing(groupId); }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Message... use @username or ```code```"
              className="min-h-[38px] max-h-24 text-sm resize-none py-2"
            />
            <Button size="icon" className="h-9 w-9 flex-shrink-0" disabled={(!input.trim() && !pendingAttachment) || sending || uploadingAttachment} onClick={handleSend}>
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
