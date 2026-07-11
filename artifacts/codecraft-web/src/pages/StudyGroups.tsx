import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListStudyGroups,
  useCreateStudyGroup,
  useListPendingInvites,
  useAcceptStudyGroupInvite,
  useDeclineStudyGroupInvite,
  usePreviewGroupByCode,
  useJoinGroupByCode,
  getListStudyGroupsQueryKey,
  getListPendingInvitesQueryKey,
  getPreviewGroupByCodeQueryKey,
} from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { UsersRound, Plus, Check, X, Crown, ShieldCheck, Loader2, KeyRound } from "lucide-react";
import { ApiError } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

function ObjectAvatarUrl(objectPath: string | null | undefined) {
  if (!objectPath) return undefined;
  const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  return `${basePath}${objectPath.replace(/^\//, "")}`;
}

function CreateGroupDialog() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, isPending } = useCreateStudyGroup({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListStudyGroupsQueryKey() });
        setOpen(false);
        setName("");
        setDescription("");
        toast({ title: "Study group created" });
      },
      onError: () => toast({ title: "Couldn't create group", variant: "destructive" }),
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" /> New Group
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[380px]">
        <DialogHeader>
          <DialogTitle>Create a Study Group</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Group name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} />
          <Textarea
            placeholder="What's this group about? (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none"
          />
        </div>
        <DialogFooter>
          <Button
            disabled={!name.trim() || isPending}
            onClick={() => mutate({ data: { name: name.trim(), description: description.trim() || null } })}
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function JoinByCodeDialog() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [submittedCode, setSubmittedCode] = useState("");

  const {
    data: preview,
    isFetching: isChecking,
    isError,
  } = usePreviewGroupByCode(submittedCode, {
    query: { enabled: submittedCode.length > 0, queryKey: getPreviewGroupByCodeQueryKey(submittedCode), retry: false },
  });

  const joinMutation = useJoinGroupByCode({
    mutation: {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: getListStudyGroupsQueryKey() });
        setOpen(false);
        reset();
        toast({ title: `Welcome to ${data.name}!` });
        navigate(`/study-groups/${data.id}`);
      },
      onError: (err) => {
        const status = err instanceof ApiError ? err.status : null;
        if (status === 404) {
          toast({ title: "That code was just used or is invalid", variant: "destructive" });
          setSubmittedCode(""); // back to the code-entry step
        } else if (status === 409) {
          toast({ title: "You're already a member of this group" });
          queryClient.invalidateQueries({ queryKey: getListStudyGroupsQueryKey() });
          setOpen(false);
          reset();
        } else {
          toast({ title: "Couldn't join group", variant: "destructive" });
        }
      },
    },
  });

  const reset = () => {
    setCode("");
    setSubmittedCode("");
  };

  const handleCheck = () => {
    const trimmed = code.trim();
    if (!trimmed) return;
    setSubmittedCode(trimmed.toUpperCase());
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5">
          <KeyRound className="w-4 h-4" /> Join Group by Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[380px]">
        <DialogHeader>
          <DialogTitle>Join a Study Group</DialogTitle>
        </DialogHeader>

        {!preview ? (
          <div className="space-y-3">
            <Input
              placeholder="Enter Group Code"
              value={code}
              onChange={(e) => { setCode(e.target.value.toUpperCase()); setSubmittedCode(""); }}
              onKeyDown={(e) => { if (e.key === "Enter") handleCheck(); }}
              className="font-mono tracking-wider text-center"
              autoFocus
            />
            {isError && <p className="text-xs text-destructive">Invalid or already-used invite code. Please check the code and try again.</p>}
            <Button className="w-full" disabled={!code.trim() || isChecking} onClick={handleCheck}>
              {isChecking ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join Group"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border border-border flex-shrink-0">
                <AvatarImage src={ObjectAvatarUrl(preview.avatarObjectPath)} />
                <AvatarFallback className="bg-primary/20 text-primary font-bold">
                  {preview.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{preview.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {preview.memberCount} {preview.memberCount === 1 ? "member" : "members"}
                  {preview.ownerUsername ? ` · owned by @${preview.ownerUsername}` : ""}
                </p>
              </div>
            </div>
            {preview.description && <p className="text-sm text-muted-foreground">{preview.description}</p>}
            {preview.alreadyMember ? (
              <p className="text-xs text-muted-foreground">You're already a member of this group.</p>
            ) : null}
            <DialogFooter className="flex-col gap-2 sm:flex-col">
              {preview.alreadyMember ? (
                <Button className="w-full" onClick={() => { setOpen(false); reset(); navigate(`/study-groups/${preview.id}`); }}>
                  Go to group
                </Button>
              ) : (
                <Button className="w-full" disabled={joinMutation.isPending} onClick={() => joinMutation.mutate({ code: submittedCode })}>
                  {joinMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join Group"}
                </Button>
              )}
              <Button variant="outline" className="w-full" onClick={reset}>Cancel</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PendingInvites() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: invites } = useListPendingInvites();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: getListPendingInvitesQueryKey() });
    queryClient.invalidateQueries({ queryKey: getListStudyGroupsQueryKey() });
  };

  const { mutate: accept } = useAcceptStudyGroupInvite({
    mutation: { onSuccess: () => { invalidate(); toast({ title: "Joined group" }); } },
  });
  const { mutate: decline } = useDeclineStudyGroupInvite({
    mutation: { onSuccess: () => { invalidate(); } },
  });

  if (!invites || invites.length === 0) return null;

  return (
    <div className="mb-4 space-y-2">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-0.5">Invitations</h2>
      {invites.map((invite) => (
        <Card key={invite.membershipId} className="border-primary/30">
          <CardContent className="p-3 flex items-center gap-3">
            <Avatar className="w-9 h-9 border border-border flex-shrink-0">
              <AvatarImage src={ObjectAvatarUrl(invite.groupAvatarObjectPath)} />
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                {invite.groupName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{invite.groupName}</p>
              <p className="text-xs text-muted-foreground truncate">
                Invited by {invite.invitedByUsername ? `@${invite.invitedByUsername}` : "a member"}
              </p>
            </div>
            <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 border-green-600/30" onClick={() => accept({ membershipId: invite.membershipId })}>
              <Check className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="outline" className="h-8 w-8 text-destructive border-destructive/30" onClick={() => decline({ membershipId: invite.membershipId })}>
              <X className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function StudyGroups() {
  const { data: groups, isLoading } = useListStudyGroups();

  return (
    <div className="p-4">
      <div className="mb-5 flex items-start justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight flex items-center gap-2">
            <UsersRound className="w-5 h-5 text-primary" /> Study Groups
          </h1>
          <p className="text-muted-foreground text-xs mt-0.5">Learn together, chat, and share code.</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <CreateGroupDialog />
          <JoinByCodeDialog />
        </div>
      </div>

      <PendingInvites />

      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!isLoading && (!groups || groups.length === 0) && (
        <Card>
          <CardContent className="p-6 text-center">
            <UsersRound className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium">No study groups yet</p>
            <p className="text-xs text-muted-foreground mt-1">Create one to start learning with friends.</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {groups?.map((group, i) => (
          <motion.div key={group.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Link href={`/study-groups/${group.id}`}>
              <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                <CardContent className="p-3 flex items-center gap-3">
                  <Avatar className="w-11 h-11 border border-border flex-shrink-0">
                    <AvatarImage src={ObjectAvatarUrl(group.avatarObjectPath)} />
                    <AvatarFallback className="bg-primary/20 text-primary font-bold">
                      {group.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold truncate">{group.name}</p>
                      {group.myRole === "owner" && <Crown className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                      {group.myRole === "admin" && <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                    </div>
                    {group.description && <p className="text-xs text-muted-foreground truncate">{group.description}</p>}
                  </div>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {group.memberCount} {group.memberCount === 1 ? "member" : "members"}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
