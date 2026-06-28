import { useGetProgressSummary } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Code2, Flame, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: summaries, isLoading } = useGetProgressSummary();

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
        <h1 className="text-3xl font-bold font-mono tracking-tight mb-2">Welcome back, Developer</h1>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{summary.languageName}</span>
                    <span className="text-sm text-primary">{summary.xpEarned} XP</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-2 text-muted-foreground">
                    <span>{summary.completedLessons} / {summary.totalLessons} lessons</span>
                    <span>{summary.totalLessons > 0 ? Math.round((summary.completedLessons / summary.totalLessons) * 100) : 0}%</span>
                  </div>
                  <Progress value={summary.totalLessons > 0 ? (summary.completedLessons / summary.totalLessons) * 100 : 0} className="h-2" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Code2 className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No progress yet</h3>
            <p className="text-muted-foreground max-w-md">
              Start learning a programming language to see your progress track here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
