import { useState } from "react";
import { useGetLeaderboard, getGetLeaderboardQueryKey, useListLanguages } from "@workspace/api-client-react";
import { useUser } from "@clerk/react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trophy, Medal, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const podiumColors = [
  { bg: "from-yellow-500/20 to-yellow-600/5 border-yellow-500/40", text: "text-yellow-500", medal: "text-yellow-500", label: "Gold", height: "h-24" },
  { bg: "from-gray-400/20 to-gray-400/5 border-gray-400/40", text: "text-gray-400", medal: "text-gray-400", label: "Silver", height: "h-16" },
  { bg: "from-amber-700/20 to-amber-700/5 border-amber-700/40", text: "text-amber-600", medal: "text-amber-600", label: "Bronze", height: "h-12" },
];

function PodiumCard({ entry, rank }: { entry: { userId: string; displayName: string; xp: number; rank: number }; rank: number }) {
  const colors = podiumColors[rank - 1];
  const initials = entry.displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative">
        <Avatar className="w-14 h-14 border-2 border-border">
          <AvatarFallback className="text-sm font-bold">{initials}</AvatarFallback>
        </Avatar>
        {rank === 1 && <Crown className="w-5 h-5 text-yellow-500 absolute -top-3 left-1/2 -translate-x-1/2" />}
      </div>
      <div className="text-center">
        <p className="font-semibold text-sm truncate max-w-[90px]">{entry.displayName}</p>
        <p className={`text-xs font-mono font-bold ${colors.text}`}>{entry.xp.toLocaleString()} XP</p>
      </div>
      <div className={cn("w-24 rounded-t-xl border bg-gradient-to-b flex items-center justify-center", colors.bg, colors.height)}>
        <span className={`text-2xl font-black font-mono ${colors.text}`}>{rank}</span>
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
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold font-mono tracking-tight flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Global Leaderboard
          </h1>
          <p className="text-muted-foreground mt-2">See how you rank against other developers worldwide.</p>
        </div>
        <div className="w-full md:w-52">
          <Select value={languageSlug} onValueChange={setLanguageSlug}>
            <SelectTrigger>
              <SelectValue placeholder="All Languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">🌍 All Languages</SelectItem>
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
          <CardContent className="flex flex-col items-center justify-center p-16 text-center">
            <Trophy className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No entries yet</h3>
            <p className="text-muted-foreground">Complete lessons to appear on the leaderboard!</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {top3.length >= 2 && (
            <div className="flex justify-center items-end gap-4 mb-10 pt-8">
              {podiumOrder.map((entry) => entry && (
                <PodiumCard key={entry.userId} entry={entry} rank={entry.rank} />
              ))}
            </div>
          )}

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-border bg-secondary/50 font-medium text-muted-foreground text-xs uppercase tracking-wider">
              <div className="col-span-2 md:col-span-1 text-center">Rank</div>
              <div className="col-span-6 md:col-span-8">Developer</div>
              <div className="col-span-4 md:col-span-3 text-right">XP</div>
            </div>

            <div className="divide-y divide-border">
              {(top3.length < 2 ? leaderboard : rest)?.map((entry, idx) => {
                const isCurrentUser = entry.userId === user?.id;
                return (
                  <motion.div
                    key={entry.userId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={cn(
                      "grid grid-cols-12 gap-4 px-5 py-4 items-center transition-colors hover:bg-secondary/20",
                      isCurrentUser && "bg-primary/5 border-l-2 border-l-primary"
                    )}
                  >
                    <div className="col-span-2 md:col-span-1 flex justify-center">
                      <span className="font-mono text-muted-foreground font-semibold text-sm">{entry.rank}</span>
                    </div>
                    <div className="col-span-6 md:col-span-8 flex items-center gap-3">
                      <Avatar className="w-8 h-8 hidden md:flex">
                        <AvatarFallback className="text-xs">
                          {entry.displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium text-sm">{entry.displayName}</span>
                        {isCurrentUser && <Badge variant="secondary" className="ml-2 text-xs py-0">You</Badge>}
                      </div>
                    </div>
                    <div className="col-span-4 md:col-span-3 text-right font-mono font-bold text-primary text-sm">
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
