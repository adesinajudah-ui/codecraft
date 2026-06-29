import { useUser } from "@clerk/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetProgressSummary, useGetLeaderboard } from "@workspace/api-client-react";
import { Trophy, Flame, Code2, Award, Star, Zap, BookOpen, Target, Calendar, TrendingUp, Loader2 } from "lucide-react";
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
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="mb-6 border-primary/20 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5" />
          <CardContent className="pb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end -mt-12 mb-4">
              <Avatar className="w-20 h-20 border-4 border-background shadow-xl">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback className="bg-primary/20 text-primary font-bold text-2xl">
                  {user?.firstName?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{user?.fullName || "Developer"}</h1>
                  <Badge className="bg-primary/20 text-primary border-primary/30 font-mono">
                    Level {level}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
                <p className="text-muted-foreground text-xs mt-1">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—"}</p>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold font-mono text-primary">{totalXp.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total XP</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono">{completedLessons}</p>
                  <p className="text-xs text-muted-foreground">Lessons</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono">7</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Level {level} Progress</span>
                <span>{xpToNextLevel} XP to Level {level + 1}</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total XP", value: totalXp.toLocaleString(), icon: Zap, color: "text-yellow-500" },
          { label: "Lessons Done", value: `${completedLessons}/${totalLessons}`, icon: BookOpen, color: "text-blue-500" },
          { label: "Quizzes Passed", value: "12", icon: Target, color: "text-green-500" },
          { label: "Competitions", value: "3 Won", icon: Trophy, color: "text-orange-500" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-4">
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="text-2xl font-bold font-mono">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="progress" className="space-y-4">
        <TabsList>
          <TabsTrigger value="progress" className="gap-2 text-xs">
            <TrendingUp className="w-3.5 h-3.5" /> Progress
          </TabsTrigger>
          <TabsTrigger value="badges" className="gap-2 text-xs">
            <Star className="w-3.5 h-3.5" /> Badges
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2 text-xs">
            <Calendar className="w-3.5 h-3.5" /> Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="progress">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summaries && summaries.length > 0 ? summaries.map((s, i) => (
              <motion.div key={s.languageId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2"><Code2 className="w-4 h-4 text-primary" />{s.languageName}</span>
                      <span className="text-xs text-primary font-mono">{s.xpEarned} XP</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-xs mb-1.5 text-muted-foreground">
                      <span>{s.completedLessons}/{s.totalLessons} lessons</span>
                      <span>{s.totalLessons > 0 ? Math.round((s.completedLessons / s.totalLessons) * 100) : 0}%</span>
                    </div>
                    <Progress value={s.totalLessons > 0 ? (s.completedLessons / s.totalLessons) * 100 : 0} className="h-1.5" />
                  </CardContent>
                </Card>
              </motion.div>
            )) : (
              <div className="col-span-2 text-center py-12 text-muted-foreground">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p>Start learning to see your progress here!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="badges">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge, i) => (
              <motion.div key={badge.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                <Card className={`text-center p-4 transition-colors ${badge.earned ? "border-primary/30 bg-primary/5" : "opacity-50 grayscale"}`}>
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <p className="text-xs font-medium">{badge.label}</p>
                  {badge.earned && <Badge className="mt-2 text-xs bg-primary/20 text-primary border-0">Earned</Badge>}
                  {!badge.earned && <p className="text-xs text-muted-foreground mt-1">Locked</p>}
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="pt-4 divide-y divide-border">
              {recentActivity.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.action}</p>
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
