import { useGetProgressSummary } from "@workspace/api-client-react";
import { useUser } from "@clerk/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Code2, Flame, Loader2, BookOpen, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const langIcons: Record<string, string> = {
  HTML: "🌐", CSS: "🎨", JavaScript: "⚡", Python: "🐍", Java: "☕", C: "⚙️",
};

const langColors: Record<string, string> = {
  HTML: "bg-orange-500/20 text-orange-500",
  CSS: "bg-blue-500/20 text-blue-500",
  JavaScript: "bg-yellow-500/20 text-yellow-500",
  Python: "bg-green-500/20 text-green-500",
  Java: "bg-red-500/20 text-red-500",
  C: "bg-purple-500/20 text-purple-500",
};

export default function Dashboard() {
  const { user } = useUser();
  const { data: summaries, isLoading } = useGetProgressSummary();
  const firstName = user?.firstName || user?.username || "Developer";

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Guard: the API can transiently return non-array data (e.g. an HTML redirect
  // page) if Clerk session verification fails mid-request. Treating it as an
  // empty array prevents a crash and shows the user a blank-state dashboard
  // instead of an unhandled "reduce is not a function" error.
  const summaryList = Array.isArray(summaries) ? summaries : [];
  const totalXp = summaryList.reduce((acc, curr) => acc + curr.xpEarned, 0);
  const totalLessons = summaryList.reduce((acc, curr) => acc + curr.totalLessons, 0);
  const completedLessons = summaryList.reduce((acc, curr) => acc + curr.completedLessons, 0);
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="p-4">
      <div className="mb-5">
        <h1 className="text-xl font-bold font-mono tracking-tight mb-1">Welcome back, {firstName} 👋</h1>
        <p className="text-muted-foreground text-sm">Here's your coding journey so far.</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <Card className="border-primary/20">
          <CardContent className="p-3 text-center">
            <Trophy className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
            <div className="text-lg font-bold font-mono leading-tight">{totalXp.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Total XP</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 text-center">
            <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1" />
            <div className="text-lg font-bold font-mono leading-tight">{Math.round(overallProgress)}%</div>
            <div className="text-xs text-muted-foreground mt-0.5">Progress</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 text-center">
            <Code2 className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <div className="text-lg font-bold font-mono leading-tight">{completedLessons}<span className="text-xs text-muted-foreground">/{totalLessons}</span></div>
            <div className="text-xs text-muted-foreground mt-0.5">Lessons</div>
          </CardContent>
        </Card>
      </div>

      {totalLessons > 0 && (
        <div className="mb-5">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Overall Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      )}

      <h2 className="text-base font-semibold mb-3">Language Progress</h2>

      {summaryList.length > 0 ? (
        <div className="space-y-3">
          {summaryList.map((summary, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              key={summary.languageId}
            >
              <Card className="hover:border-primary/40 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${langColors[summary.languageName] || "bg-primary/20 text-primary"}`}>
                        {langIcons[summary.languageName] || "💻"}
                      </span>
                      <span className="font-semibold text-sm">{summary.languageName}</span>
                    </div>
                    <span className="text-xs font-mono text-primary">{summary.xpEarned} XP</span>
                  </div>
                  <div className="flex justify-between text-xs mb-1.5 text-muted-foreground">
                    <span>{summary.completedLessons} / {summary.totalLessons} lessons</span>
                    <span className="font-medium">{summary.totalLessons > 0 ? Math.round((summary.completedLessons / summary.totalLessons) * 100) : 0}%</span>
                  </div>
                  <Progress value={summary.totalLessons > 0 ? (summary.completedLessons / summary.totalLessons) * 100 : 0} className="h-1.5" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-3">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-base font-bold mb-2">Ready to start?</h3>
            <p className="text-muted-foreground text-sm mb-5">
              Pick a language and dive in. Earn XP, unlock certificates, and climb the leaderboard.
            </p>
            <Link href="/learn">
              <Button size="sm" className="gap-2 font-mono">
                Start Learning <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
