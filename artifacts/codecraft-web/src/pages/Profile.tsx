import { useUser } from "@clerk/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetProgressSummary } from "@workspace/api-client-react";
import { Trophy, Code2, Award, Star, Zap, BookOpen, Target, Calendar, TrendingUp, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: "🔥", label: "7-Day Streak", earned: true },
  { icon: "⚡", label: "Speed Coder", earned: true },
  { icon: "🏆", label: "Quiz Master", earned: true },
  { icon: "🐍", label: "Python Pro", earned: false },
  { icon: "☕", label: "Java Junkie", earned: false },
  { icon: "🌐", label: "Web Wizard", earned: true },
  { icon: "🔢", label: "Algorithm Ace", earned: false },
  { icon: "💎", label: "Diamond Coder", earned: false },
];

const recentActivity = [
  { action: "Completed lesson", detail: "JavaScript: Promises & Async/Await", xp: "+30 XP", time: "2h ago", icon: BookOpen },
  { action: "Quiz passed", detail: "Python Basics — Score: 18/20", xp: "+50 XP", time: "5h ago", icon: Target },
  { action: "Competition won", detail: "JavaScript Speed Challenge", xp: "+150 XP", time: "1d ago", icon: Trophy },
  { action: "Completed lesson", detail: "HTML: Forms and Validation", xp: "+25 XP", time: "2d ago", icon: BookOpen },
  { action: "Badge earned", detail: "7-Day Streak 🔥", xp: "+100 XP", time: "3d ago", icon: Award },
];

export default function Profile() {
  const { user } = useUser();
  const { data: summaries, isLoading } = useGetProgressSummary();

  const totalXp = summaries?.reduce((acc, curr) => acc + curr.xpEarned, 0) || 0;
  const totalLessons = summaries?.reduce((acc, curr) => acc + curr.totalLessons, 0) || 0;
  const completedLessons = summaries?.reduce((acc, curr) => acc + curr.completedLessons, 0) || 0;
  const level = Math.floor(totalXp / 500) + 1;
  const xpToNextLevel = 500 - (totalXp % 500);
  const levelProgress = ((totalXp % 500) / 500) * 100;

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Profile card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="mb-4 border-primary/20 overflow-hidden">
          <div className="h-16 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5" />
          <CardContent className="pb-4 px-4">
            <div className="flex items-end gap-3 -mt-8 mb-3">
              <Avatar className="w-16 h-16 border-4 border-background shadow-xl flex-shrink-0">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl">
                  {user?.firstName?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-base font-bold truncate">{user?.fullName || "Developer"}</h1>
                  <Badge className="bg-primary/20 text-primary border-primary/30 font-mono text-xs">
                    Lv.{level}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex gap-4 text-center mb-3">
              <div className="flex-1">
                <p className="text-lg font-bold font-mono text-primary">{totalXp.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold font-mono">{completedLessons}</p>
                <p className="text-xs text-muted-foreground">Lessons</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold font-mono">7</p>
                <p className="text-xs text-muted-foreground">Streak</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Level {level}</span>
                <span>{xpToNextLevel} XP to next</span>
              </div>
              <Progress value={levelProgress} className="h-1.5" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: "Total XP", value: totalXp.toLocaleString(), icon: Zap, color: "text-yellow-500" },
          { label: "Lessons Done", value: `${completedLessons}/${totalLessons}`, icon: BookOpen, color: "text-blue-500" },
          { label: "Quizzes Passed", value: "12", icon: Target, color: "text-green-500" },
          { label: "Competitions", value: "3 Won", icon: Trophy, color: "text-orange-500" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-3">
                <stat.icon className={`w-4 h-4 ${stat.color} mb-1.5`} />
                <p className="text-lg font-bold font-mono leading-tight">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="progress" className="space-y-3">
        <TabsList className="w-full">
          <TabsTrigger value="progress" className="flex-1 gap-1.5 text-xs">
            <TrendingUp className="w-3.5 h-3.5" /> Progress
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex-1 gap-1.5 text-xs">
            <Star className="w-3.5 h-3.5" /> Badges
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex-1 gap-1.5 text-xs">
            <Calendar className="w-3.5 h-3.5" /> Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="progress">
          <div className="space-y-3">
            {summaries && summaries.length > 0 ? summaries.map((s, i) => (
              <motion.div key={s.languageId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        <Code2 className="w-4 h-4 text-primary" />{s.languageName}
                      </span>
                      <span className="text-xs text-primary font-mono">{s.xpEarned} XP</span>
                    </div>
                    <div className="flex justify-between text-xs mb-1.5 text-muted-foreground">
                      <span>{s.completedLessons}/{s.totalLessons} lessons</span>
                      <span>{s.totalLessons > 0 ? Math.round((s.completedLessons / s.totalLessons) * 100) : 0}%</span>
                    </div>
                    <Progress value={s.totalLessons > 0 ? (s.completedLessons / s.totalLessons) * 100 : 0} className="h-1.5" />
                  </CardContent>
                </Card>
              </motion.div>
            )) : (
              <div className="text-center py-10 text-muted-foreground">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Start learning to see your progress!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="badges">
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge, i) => (
              <motion.div key={badge.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                <Card className={`text-center p-4 transition-colors ${badge.earned ? "border-primary/30 bg-primary/5" : "opacity-50 grayscale"}`}>
                  <div className="text-3xl mb-1.5">{badge.icon}</div>
                  <p className="text-xs font-medium leading-tight">{badge.label}</p>
                  {badge.earned
                    ? <Badge className="mt-2 text-xs bg-primary/20 text-primary border-0">Earned</Badge>
                    : <p className="text-xs text-muted-foreground mt-1">Locked</p>}
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="pt-3 px-3 divide-y divide-border">
              {recentActivity.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-mono font-semibold text-green-500">{item.xp}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
