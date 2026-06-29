import { useGetProgressSummary, useListLanguages, useListCoursesByLanguage } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { BookMarked, Play, CheckCircle2, Clock, Loader2, BookOpen, Award, Star } from "lucide-react";
import { motion } from "framer-motion";

const langIcons: Record<string, string> = {
  HTML: "🌐",
  CSS: "🎨",
  JavaScript: "⚡",
  Python: "🐍",
  Java: "☕",
  C: "⚙️",
};

export default function MyCourses() {
  const { data: summaries, isLoading: loadingSummaries } = useGetProgressSummary();
  const { data: languages, isLoading: loadingLangs } = useListLanguages();

  if (loadingSummaries || loadingLangs) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const inProgress = summaries?.filter(s => s.completedLessons > 0 && s.completedLessons < s.totalLessons) || [];
  const completed = summaries?.filter(s => s.totalLessons > 0 && s.completedLessons === s.totalLessons) || [];
  const notStarted = summaries?.filter(s => s.completedLessons === 0) || [];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight flex items-center gap-3">
          <BookMarked className="w-7 h-7 text-primary" />
          My Courses
        </h1>
        <p className="text-muted-foreground mt-1">Track your learning progress across all languages.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "In Progress", value: inProgress.length, icon: Play, color: "text-blue-500" },
          { label: "Completed", value: completed.length, icon: CheckCircle2, color: "text-green-500" },
          { label: "Not Started", value: notStarted.length, icon: Clock, color: "text-muted-foreground" },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
              <p className="text-2xl font-bold font-mono">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="text-xs">All Courses</TabsTrigger>
          <TabsTrigger value="inprogress" className="text-xs">In Progress ({inProgress.length})</TabsTrigger>
          <TabsTrigger value="completed" className="text-xs">Completed ({completed.length})</TabsTrigger>
        </TabsList>

        {["all", "inprogress", "completed"].map(tab => (
          <TabsContent key={tab} value={tab}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(tab === "all" ? summaries : tab === "inprogress" ? inProgress : completed)?.map((s, i) => {
                const prog = s.totalLessons > 0 ? Math.round((s.completedLessons / s.totalLessons) * 100) : 0;
                const isComplete = s.completedLessons === s.totalLessons && s.totalLessons > 0;
                const lang = languages?.find(l => l.id === s.languageId);
                return (
                  <motion.div key={s.languageId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className={`hover:border-primary/40 transition-colors ${isComplete ? "border-green-500/30 bg-green-500/5" : ""}`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{langIcons[s.languageName] || "📚"}</div>
                            <div>
                              <CardTitle className="text-base">{s.languageName}</CardTitle>
                              <p className="text-xs text-muted-foreground">{s.completedLessons}/{s.totalLessons} lessons</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {isComplete ? (
                              <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Complete
                              </Badge>
                            ) : s.completedLessons > 0 ? (
                              <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 text-xs gap-1">
                                <Play className="w-3 h-3" /> In Progress
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">Not Started</Badge>
                            )}
                            <span className="text-xs font-mono text-primary">{s.xpEarned} XP</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{prog}% complete</span>
                            {!isComplete && <span>{s.totalLessons - s.completedLessons} left</span>}
                          </div>
                          <Progress value={prog} className="h-1.5" />
                        </div>
                        <div className="flex gap-2">
                          {lang && (
                            <Link href={`/learn/${lang.slug}`} className="flex-1">
                              <Button size="sm" variant={isComplete ? "outline" : "default"} className="w-full h-8 text-xs gap-2">
                                {isComplete ? <><Award className="w-3.5 h-3.5" /> Review</> : <><Play className="w-3.5 h-3.5" /> {s.completedLessons > 0 ? "Continue" : "Start"}</>}
                              </Button>
                            </Link>
                          )}
                          {!lang && (
                            <Link href="/learn" className="flex-1">
                              <Button size="sm" variant={isComplete ? "outline" : "default"} className="w-full h-8 text-xs">
                                {isComplete ? "Review" : s.completedLessons > 0 ? "Continue" : "Start"}
                              </Button>
                            </Link>
                          )}
                          {isComplete && (
                            <Link href="/certificates">
                              <Button size="sm" variant="outline" className="h-8 text-xs gap-1 px-3">
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
                <div className="col-span-2 text-center py-12">
                  <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                  <p className="text-muted-foreground">
                    {tab === "completed" ? "No completed courses yet. Keep learning!" :
                     tab === "inprogress" ? "No courses in progress. Start one!" :
                     "No courses found. Start learning!"}
                  </p>
                  <Link href="/learn">
                    <Button className="mt-4 gap-2">
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
