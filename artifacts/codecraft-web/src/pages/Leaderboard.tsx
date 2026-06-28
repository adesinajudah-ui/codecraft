import { useState } from "react";
import { useGetLeaderboard, getGetLeaderboardQueryKey, useListLanguages } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Trophy, Medal } from "lucide-react";
import { motion } from "framer-motion";

export default function Leaderboard() {
  const [languageSlug, setLanguageSlug] = useState<string>("all");
  const { data: languages } = useListLanguages();

  const queryParams = languageSlug === "all" ? { limit: 50 } : { limit: 50, languageSlug };
  const { data: leaderboard, isLoading } = useGetLeaderboard(queryParams, {
    query: { queryKey: getGetLeaderboardQueryKey(queryParams) }
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-mono tracking-tight flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Global Leaderboard
          </h1>
          <p className="text-muted-foreground mt-2">See how you rank against other developers.</p>
        </div>
        <div className="w-full md:w-48">
          <Select value={languageSlug} onValueChange={setLanguageSlug}>
            <SelectTrigger>
              <SelectValue placeholder="All Languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
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
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/50 font-medium text-muted-foreground text-sm uppercase tracking-wider">
            <div className="col-span-2 md:col-span-1 text-center">Rank</div>
            <div className="col-span-6 md:col-span-7">Developer</div>
            <div className="col-span-4 text-right">XP</div>
          </div>
          
          <div className="divide-y divide-border">
            {leaderboard?.map((entry, idx) => (
              <motion.div
                key={entry.userId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-secondary/20 ${idx < 3 ? 'bg-primary/5' : ''}`}
              >
                <div className="col-span-2 md:col-span-1 flex justify-center">
                  {idx === 0 ? <Medal className="w-6 h-6 text-yellow-500" /> :
                   idx === 1 ? <Medal className="w-6 h-6 text-gray-400" /> :
                   idx === 2 ? <Medal className="w-6 h-6 text-amber-700" /> :
                   <span className="font-mono text-muted-foreground font-semibold">{entry.rank}</span>}
                </div>
                <div className="col-span-6 md:col-span-7 font-medium">
                  {entry.displayName}
                </div>
                <div className="col-span-4 text-right font-mono font-bold text-primary">
                  {entry.xp.toLocaleString()}
                </div>
              </motion.div>
            ))}
            
            {leaderboard?.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No entries found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
