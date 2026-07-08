import { useState } from "react";
import { useGetLeaderboard, getGetLeaderboardQueryKey, useListLanguages } from "@workspace/api-client-react";
import { useUser } from "@clerk/react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trophy, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
