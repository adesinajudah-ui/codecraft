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

  const totalXp = summaries?.reduce((acc, curr) => acc + curr.xpEarned, 0) || 0;
  const totalLessons = summaries?.reduce((acc, curr) => acc + curr.totalLessons, 0) || 0;
  const completedLessons = summaries?.reduce((acc, curr) => acc + curr.completedLessons, 0) || 0;
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-mono tracking-tight mb-2">Welcome back, {firstName} 👋</h1>
        <p className="text-muted-foreground">Here's your coding journey progress so far.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-gradient-to-br from-card to-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total XP</CardTitle>
            <Trophy className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{totalXp.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
            <Flame className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono mb-2">{Math.round(overallProgress)}%</div>
            <Progress value={overallProgress} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lessons Completed</CardTitle>
            <Code2 className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{completedLessons} / {totalLessons}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-6">Language Progress</h2>
      
      {summaries && summaries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {summaries.map((summary, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={summary.languageId}
            >
              <Card className="hover:border-primary/40 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${langColors[summary.languageName] || "bg-primary/20 text-primary"}`}>
                        {langIcons[summary.languageName] || "💻"}
                      </span>
                      <span>{summary.languageName}</span>
                    </div>
                    <span className="text-sm font-mono text-primary">{summary.xpEarned} XP</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-2 text-muted-foreground">
                    <span>{summary.completedLessons} / {summary.totalLessons} lessons</span>
                    <span className="font-medium">{summary.totalLessons > 0 ? Math.round((summary.completedLessons / summary.totalLessons) * 100) : 0}%</span>
                  </div>
                  <Progress value={summary.totalLessons > 0 ? (summary.completedLessons / summary.totalLessons) * 100 : 0} className="h-2" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Ready to start your journey?</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Pick a programming language and dive in. Complete lessons to earn XP, unlock certificates, and climb the leaderboard.
            </p>
            <Link href="/learn">
              <Button size="lg" className="gap-2 font-mono">
                Start Learning <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
