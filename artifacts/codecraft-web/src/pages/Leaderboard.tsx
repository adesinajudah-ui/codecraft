import { useState } from "react";
import { useGetLeaderboard, getGetLeaderboardQueryKey, useListLanguages, getGetWalletBalanceQueryKey } from "@workspace/api-client-react";
import { useUser } from "@clerk/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trophy, Crown, Coins, CheckCircle2, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

function FirstPrizeBanner() {
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "loading" | "claimed" | "error">("idle");
  const [hasClaimed, setHasClaimed] = useState<boolean | null>(null);

  // Check claim status on mount
  useState(() => {
    fetch(`${basePath}/api/wallet/claims/first-prize`)
      .then(r => r.json())
      .then((data: { claimed: boolean }) => setHasClaimed(data.claimed))
      .catch(() => setHasClaimed(false));
  });

  const handleClaim = async () => {
    setStatus("loading");
    try {
      const res = await fetch(`${basePath}/api/wallet/claims/first-prize`, { method: "POST" });
      const body = await res.json() as any;

      if (res.status === 409 || body?.error?.includes("already")) {
        setHasClaimed(true);
        setStatus("claimed");
        toast({ title: "Already claimed", description: "You've already collected this prize." });
        return;
      }
      if (!res.ok) {
        setStatus("error");
        toast({ title: "Couldn't claim prize", description: body?.error ?? "Please try again.", variant: "destructive" });
        return;
      }

      setHasClaimed(true);
      setStatus("claimed");
      // Immediately update wallet balance in the cache
      if (typeof body.coinBalance === "number") {
        queryClient.setQueryData(getGetWalletBalanceQueryKey(), { coinBalance: body.coinBalance });
      }
      toast({ title: "🎉 5 coins credited!", description: "Your first-prize coins have been added to your wallet." });
    } catch {
      setStatus("error");
      toast({ title: "Connection error", description: "Please try again.", variant: "destructive" });
    }
  };

  const claimed = hasClaimed || status === "claimed";

  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
      <Card className="border-yellow-500/40 bg-gradient-to-r from-yellow-500/10 via-yellow-400/5 to-transparent overflow-hidden">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
            <Gift className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="font-semibold text-sm">🥇 First Prize Reward</p>
              <Badge className="text-[10px] bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30 py-0">Free</Badge>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Coins className="w-3 h-3 text-yellow-500" />
              Claim <strong>5 free coins</strong> — one-time reward for every player
            </p>
          </div>
          <Button
            size="sm"
            variant={claimed ? "outline" : "default"}
            className={cn("flex-shrink-0 gap-1.5 h-8 text-xs", claimed && "text-muted-foreground")}
            disabled={claimed || status === "loading" || hasClaimed === null}
            onClick={handleClaim}
          >
            {status === "loading" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : claimed ? (
              <><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Claimed</>
            ) : (
              <><Coins className="w-3.5 h-3.5" /> Claim</>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const podiumColors = [
  { bg: "from-yellow-500/20 to-yellow-600/5 border-yellow-500/40", text: "text-yellow-500", height: "h-20" },
  { bg: "from-gray-400/20 to-gray-400/5 border-gray-400/40", text: "text-gray-400", height: "h-14" },
  { bg: "from-amber-700/20 to-amber-700/5 border-amber-700/40", text: "text-amber-600", height: "h-10" },
];

function PodiumCard({ entry, rank }: { entry: { userId: string; displayName: string; xp: number; rank: number }; rank: number }) {
  const colors = podiumColors[rank - 1];
  const initials = entry.displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className="flex flex-col items-center gap-1.5"
    >
      <div className="relative">
        <Avatar className="w-11 h-11 border-2 border-border">
          <AvatarFallback className="text-xs font-bold">{initials}</AvatarFallback>
        </Avatar>
        {rank === 1 && <Crown className="w-4 h-4 text-yellow-500 absolute -top-2.5 left-1/2 -translate-x-1/2" />}
      </div>
      <div className="text-center">
        <p className="font-semibold text-xs truncate max-w-[72px]">{entry.displayName}</p>
        <p className={`text-xs font-mono font-bold ${colors.text}`}>{entry.xp.toLocaleString()}</p>
      </div>
      <div className={cn("w-20 rounded-t-xl border bg-gradient-to-b flex items-center justify-center", colors.bg, colors.height)}>
        <span className={`text-xl font-black font-mono ${colors.text}`}>{rank}</span>
      </div>
    </motion.div>
  );
}

export default function Leaderboard() {
  const [languageSlug, setLanguageSlug] = useState<string>("all");
  const { user } = useUser();
  const { data: languages } = useListLanguages();

  const queryParams = languageSlug === "all" ? { limit: 50 } : { limit: 50, languageSlug };
  const { data: leaderboard, isLoading } = useGetLeaderboard(queryParams, {
    query: { queryKey: getGetLeaderboardQueryKey(queryParams) }
  });

  const top3 = leaderboard?.slice(0, 3) ?? [];
  const rest = leaderboard?.slice(3) ?? [];
  const podiumOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-xs mt-0.5">Global developer rankings.</p>
        </div>
        <div className="w-36">
          <Select value={languageSlug} onValueChange={setLanguageSlug}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="All Languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">🌍 All</SelectItem>
              {languages?.map(l => (
                <SelectItem key={l.slug} value={l.slug}>{l.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <FirstPrizeBanner />

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : leaderboard?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Trophy className="w-10 h-10 text-muted-foreground mb-3" />
            <h3 className="text-base font-medium mb-1">No entries yet</h3>
            <p className="text-muted-foreground text-sm">Complete lessons to appear here!</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {top3.length >= 2 && (
            <div className="flex justify-center items-end gap-3 mb-6 pt-6">
              {podiumOrder.map((entry) => entry && (
                <PodiumCard key={entry.userId} entry={entry} rank={entry.rank} />
              ))}
            </div>
          )}

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="divide-y divide-border">
              {(top3.length < 2 ? leaderboard : rest)?.map((entry, idx) => {
                const isCurrentUser = entry.userId === user?.id;
                const initials = entry.displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <motion.div
                    key={entry.userId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 transition-colors",
                      isCurrentUser && "bg-primary/5 border-l-2 border-l-primary"
                    )}
                  >
                    <span className="font-mono text-muted-foreground font-semibold text-sm w-6 text-center flex-shrink-0">{entry.rank}</span>
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-sm truncate">{entry.displayName}</span>
                        {isCurrentUser && <Badge variant="secondary" className="text-xs py-0 px-1.5">You</Badge>}
                      </div>
                    </div>
                    <div className="font-mono font-bold text-primary text-sm flex-shrink-0">
                      {entry.xp.toLocaleString()}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
