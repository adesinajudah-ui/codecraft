import { useGetProgressSummary } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { BookMarked, Play, CheckCircle2, Clock, Loader2, BookOpen, Award, Star } from "lucide-react";
import { motion } from "framer-motion";

const langIcons: Record<string, string> = {
  HTML: "🌐", CSS: "🎨", JavaScript: "⚡", Python: "🐍", Java: "☕", C: "⚙️",
};

export default function MyCourses() {
  const { data: summaries, isLoading: loadingSummaries } = useGetProgressSummary();

  if (loadingSummaries) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const inProgress = summaries?.filter(s => s.completedLessons > 0 && s.completedLessons < s.totalLessons) || [];
  const completed = summaries?.filter(s => s.totalLessons > 0 && s.completedLessons === s.totalLessons) || [];

  return (
    <div className="p-4">
      <div className="mb-5">
        <h1 className="text-xl font-bold font-mono tracking-tight flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-primary" />
          My Courses
        </h1>
        <p className="text-muted-foreground text-xs mt-0.5">Track your learning progress.</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "In Progress", value: inProgress.length, icon: Play, color: "text-blue-500" },
          { label: "Completed", value: completed.length, icon: CheckCircle2, color: "text-green-500" },
          { label: "Not Started", value: (summaries?.filter(s => s.completedLessons === 0) || []).length, icon: Clock, color: "text-muted-foreground" },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-3 text-center">
              <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
              <p className="text-xl font-bold font-mono">{stat.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-3">
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1 text-xs">All</TabsTrigger>
          <TabsTrigger value="inprogress" className="flex-1 text-xs">Active ({inProgress.length})</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1 text-xs">Done ({completed.length})</TabsTrigger>
        </TabsList>

        {["all", "inprogress", "completed"].map(tab => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <div className="space-y-3">
              {(tab === "all" ? summaries : tab === "inprogress" ? inProgress : completed)?.map((s, i) => {
                const prog = s.totalLessons > 0 ? Math.round((s.completedLessons / s.totalLessons) * 100) : 0;
                const isComplete = s.completedLessons === s.totalLessons && s.totalLessons > 0;
                return (
                  <motion.div key={s.languageId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className={`hover:border-primary/40 transition-colors ${isComplete ? "border-green-500/30 bg-green-500/5" : ""}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{langIcons[s.languageName] || "📚"}</div>
                            <div>
                              <p className="font-semibold text-sm">{s.languageName}</p>
                              <p className="text-xs text-muted-foreground">{s.completedLessons}/{s.totalLessons} lessons</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {isComplete ? (
                              <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Done
                              </Badge>
                            ) : s.completedLessons > 0 ? (
                              <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 text-xs">
                                <Play className="w-3 h-3 mr-1" /> Active
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">New</Badge>
                            )}
                            <span className="text-xs font-mono text-primary">{s.xpEarned} XP</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{prog}% complete</span>
                            {!isComplete && <span>{s.totalLessons - s.completedLessons} left</span>}
                          </div>
                          <Progress value={prog} className="h-1.5" />
                        </div>

                        <div className="flex gap-2">
                          <Link href="/learn" className="flex-1">
                              <Button size="sm" variant={isComplete ? "outline" : "default"} className="w-full h-8 text-xs gap-1.5">
                                {isComplete
                                  ? <><Award className="w-3.5 h-3.5" /> Review</>
                                  : <><Play className="w-3.5 h-3.5" /> {s.completedLessons > 0 ? "Continue" : "Start"}</>}
                              </Button>
                            </Link>
                          {isComplete && (
                            <Link href="/certificates">
                              <Button size="sm" variant="outline" className="h-8 text-xs px-3">
                                <Star className="w-3.5 h-3.5 text-yellow-500" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}

              {(tab === "all" ? summaries : tab === "inprogress" ? inProgress : completed)?.length === 0 && (
                <div className="text-center py-10">
                  <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                  <p className="text-muted-foreground text-sm">
                    {tab === "completed" ? "No completed courses yet." :
                     tab === "inprogress" ? "No courses in progress." :
                     "No courses found."}
                  </p>
                  <Link href="/learn">
                    <Button className="mt-4 gap-2" size="sm">
                      <BookOpen className="w-4 h-4" /> Browse Courses
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
