import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListStudyGroups,
  useCreateStudyGroup,
  useListPendingInvites,
  useAcceptStudyGroupInvite,
  useDeclineStudyGroupInvite,
  getListStudyGroupsQueryKey,
  getListPendingInvitesQueryKey,
} from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { UsersRound, Plus, Check, X, Crown, ShieldCheck, Loader2 } from "lucide-react";
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
        <CreateGroupDialog />
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
