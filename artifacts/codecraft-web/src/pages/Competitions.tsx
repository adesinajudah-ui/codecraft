import { useState } from "react";
import { useUser } from "@clerk/react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Swords, Plus, Users, Trophy, Zap, Star, Copy, Check, Crown, Play, Loader2, Coins, XCircle, Settings2, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useListCoursesByLanguage, useGetWalletBalance, getGetWalletBalanceQueryKey } from "@workspace/api-client-react";
import { queryClient } from "@/lib/queryClient";
import { cn } from "@/lib/utils";

const activeRooms = [
  { id: "R1", code: "JS-4829", host: "Alex C.", language: "JavaScript", difficulty: "Medium", players: 3, maxPlayers: 8, status: "waiting" },
  { id: "R2", code: "PY-7731", host: "Priya S.", language: "Python", difficulty: "Easy", players: 6, maxPlayers: 8, status: "waiting" },
  { id: "R3", code: "HT-2214", host: "Marcus J.", language: "HTML", difficulty: "Easy", players: 8, maxPlayers: 8, status: "in-progress" },
];

const recentResults = [
  { id: 1, competition: "JS Speed Quiz", position: 1, players: 6, xp: 200, date: "2h ago" },
  { id: 2, competition: "Python Basics Battle", position: 3, players: 8, xp: 75, date: "1d ago" },
  { id: 3, competition: "HTML Masters", position: 2, players: 5, xp: 120, date: "3d ago" },
];

const leaderboard = [
  { rank: 1, name: "Sofia M.", wins: 24, xp: 4800, badge: "🏆" },
  { rank: 2, name: "Alex C.", wins: 19, xp: 3800, badge: "🥈" },
  { rank: 3, name: "James P.", wins: 15, xp: 3000, badge: "🥉" },
  { rank: 4, name: "Priya S.", wins: 12, xp: 2400, badge: "⭐" },
  { rank: 5, name: "You", wins: 3, xp: 395, badge: "🎯" },
];

function RoomCard({ room }: { room: typeof activeRooms[0] }) {
  const { toast } = useToast();
  const isFull = room.players === room.maxPlayers;
  const isInProgress = room.status === "in-progress";

  return (
    <Card className={`border transition-all ${isInProgress ? "opacity-70" : "hover:border-primary/40"}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Badge variant="outline" className="font-mono text-xs">{room.code}</Badge>
              <Badge className={`text-xs ${isInProgress ? "bg-red-500/20 text-red-500 border-red-500/30" : "bg-green-500/20 text-green-500 border-green-500/30"}`}>
                {isInProgress ? "Live" : "Waiting"}
              </Badge>
            </div>
            <p className="font-semibold text-sm">{room.language} Quiz</p>
            <p className="text-xs text-muted-foreground">by {room.host}</p>
          </div>
          <Badge variant="secondary" className="text-xs">{room.difficulty}</Badge>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span>{room.players}/{room.maxPlayers}</span>
          </div>
          <div className="flex-1 bg-secondary rounded-full h-1">
            <div className="bg-primary h-1 rounded-full" style={{ width: `${(room.players / room.maxPlayers) * 100}%` }} />
          </div>
        </div>

        <Button size="sm" className="w-full h-8 text-xs" disabled={isFull || isInProgress}
          onClick={() => toast({ title: "Joining...", description: `Connecting to ${room.language} room` })}>
          {isInProgress ? "Already Started" : isFull ? "Room Full" : "Join Room"}
        </Button>
      </CardContent>
    </Card>
  );
}

// ── Language → slug mapping ───────────────────────────────────────────────────
const LANGUAGE_SLUGS: Record<string, string> = {
  HTML: "html",
  CSS: "css",
  JavaScript: "javascript",
  Python: "python",
  Java: "java",
  C: "c",
};

const QUESTION_COUNT_OPTIONS = [10, 20, 30, 40, 60, 80, 100] as const;
type QuestionCount = typeof QUESTION_COUNT_OPTIONS[number];

const DIFFICULTY_OPTIONS: { value: string; label: string; description: string }[] = [
  { value: "mixed", label: "Mixed", description: "All difficulty levels" },
  { value: "easy", label: "Easy", description: "Beginner-friendly" },
  { value: "medium", label: "Medium", description: "Intermediate" },
  { value: "hard", label: "Hard", description: "Expert level" },
];

const COMPETITION_COST = 5;

function CreateRoomDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [language, setLanguage] = useState("JavaScript");
  const [difficulty, setDifficulty] = useState("mixed");
  const [questionCount, setQuestionCount] = useState<QuestionCount>(20);
  const [charging, setCharging] = useState(false);
  const [chargeError, setChargeError] = useState<string | null>(null);
  const [, navigate] = useLocation();

  const slug = LANGUAGE_SLUGS[language] ?? "javascript";
  const { data: courses, isLoading: coursesLoading } = useListCoursesByLanguage(slug, {
    query: { enabled: open, queryKey: ["courses-by-language", slug] },
  });
  const { data: balanceData } = useGetWalletBalance({
    query: { enabled: open, queryKey: getGetWalletBalanceQueryKey() },
  });

  const courseId = courses?.[0]?.id;
  const coinBalance = balanceData?.coinBalance ?? 0;
  const hasEnoughCoins = coinBalance >= COMPETITION_COST;

  const reset = () => {
    setChargeError(null);
    setLanguage("JavaScript");
    setDifficulty("mixed");
    setQuestionCount(20);
  };

  const handleStart = async () => {
    if (!courseId) return;
    setCharging(true);
    setChargeError(null);

    const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
    try {
      const res = await fetch(`${basePath}/api/wallet/charge-competition-create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const body = await res.json().catch(() => ({})) as any;

      if (res.status === 402) {
        setChargeError(body.error ?? "Not enough coins to create a competition.");
        return;
      }
      if (!res.ok) {
        setChargeError(body.error ?? "Something went wrong. Please try again.");
        return;
      }

      if (typeof body.coinBalance === "number") {
        queryClient.setQueryData(getGetWalletBalanceQueryKey(), { coinBalance: body.coinBalance });
      }

      onClose();
      reset();
      // Pass settings as URL search params — MultiplayerQuiz.tsx reads them
      navigate(`/quiz/${courseId}/multiplayer?lang=${slug}&count=${questionCount}&difficulty=${difficulty}`);
    } catch {
      setChargeError("Connection error. Please try again.");
    } finally {
      setCharging(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { setChargeError(null); onClose(); } }}>
      <DialogContent className="max-w-[92vw] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Settings2 className="w-5 h-5 text-primary" />
            Competition Settings
          </DialogTitle>
          <DialogDescription className="text-xs">
            Configure your competition — then share the room code with opponents.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-1">

          {/* Coin cost banner */}
          <div className={cn(
            "flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium",
            hasEnoughCoins
              ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
              : "bg-destructive/10 text-destructive",
          )}>
            <span className="flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5" />
              Host fee: <strong>{COMPETITION_COST} coins</strong>
            </span>
            <span className="font-mono">
              Balance: <strong>{coinBalance}</strong>
            </span>
          </div>

          {/* Course */}
          <div className="space-y-1">
            <label className="text-xs font-medium">Course</label>
            <Select value={language} onValueChange={(v) => { setLanguage(v); setChargeError(null); }}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.keys(LANGUAGE_SLUGS).map(o => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty */}
          <div className="space-y-1">
            <label className="text-xs font-medium flex items-center gap-1">
              Difficulty
              <HelpCircle className="w-3 h-3 text-muted-foreground" />
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {DIFFICULTY_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setDifficulty(opt.value)}
                  className={cn(
                    "flex flex-col items-start px-3 py-2 rounded-lg border text-left transition-all text-xs",
                    difficulty === opt.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card hover:border-primary/40"
                  )}
                >
                  <span className="font-semibold">{opt.label}</span>
                  <span className={cn("text-[10px]", difficulty === opt.value ? "text-primary/70" : "text-muted-foreground")}>
                    {opt.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Question count */}
          <div className="space-y-1">
            <label className="text-xs font-medium">Number of Questions</label>
            <div className="flex flex-wrap gap-1.5">
              {QUESTION_COUNT_OPTIONS.map(n => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all",
                    questionCount === n
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground">
              Questions are randomly shuffled from our {language} bank of 100 unique questions.
            </p>
          </div>

          {chargeError && (
            <div className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
              <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>{chargeError}</span>
            </div>
          )}

          {!hasEnoughCoins && (
            <p className="text-xs text-center text-muted-foreground">
              You need {COMPETITION_COST - coinBalance} more coin{COMPETITION_COST - coinBalance !== 1 ? "s" : ""}.{" "}
              <Link href="/wallet" onClick={onClose} className="underline underline-offset-2 text-primary">
                Top up your wallet
              </Link>
            </p>
          )}

          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="flex-1" size="sm" onClick={() => { setChargeError(null); onClose(); }}>
              Cancel
            </Button>
            <Button
              className="flex-1 gap-2"
              size="sm"
              disabled={!courseId || coursesLoading || charging || !hasEnoughCoins}
              onClick={handleStart}
            >
              {charging || coursesLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {hasEnoughCoins ? `Start (${questionCount} Qs)` : "Insufficient Coins"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function JoinRoomDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, navigate] = useLocation();

  const handleJoin = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setLoading(true);
    setError("");
    try {
      const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
      const res = await fetch(`${basePath}/api/quiz/sessions/${trimmed}/meta`);
      if (!res.ok) {
        setError("Room not found. Check the code and try again.");
        return;
      }
      const { courseId, languageSlug } = await res.json() as { courseId: number | null; quizId: number | null; languageSlug?: string };
      onClose();
      // For competition sessions, courseId may be null — use languageSlug to find a course
      navigate(`/quiz/${courseId ?? 1}/multiplayer?join=${trimmed}`);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Users className="w-5 h-5 text-primary" /> Join a Room
          </DialogTitle>
          <DialogDescription className="text-xs">Enter the room code from the host.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-1">
          <Input
            placeholder="e.g. ABC123"
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setError(""); }}
            className="font-mono text-center text-lg h-12 tracking-widest"
            maxLength={8}
            onKeyDown={e => e.key === "Enter" && code.length >= 5 && handleJoin()}
          />
          {error && <p className="text-xs text-destructive text-center">{error}</p>}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" size="sm" onClick={onClose}>Cancel</Button>
            <Button className="flex-1 gap-2" size="sm" disabled={code.length < 5 || loading} onClick={handleJoin}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              Join
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Competitions() {
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  return (
    <div className="p-4">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight flex items-center gap-2">
            <Swords className="w-5 h-5 text-primary" /> Compete
          </h1>
          <p className="text-muted-foreground text-xs mt-0.5">Real-time quiz battles.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowJoin(true)} className="gap-1.5 h-8 text-xs">
            <Users className="w-3.5 h-3.5" /> Join
          </Button>
          <Button size="sm" onClick={() => setShowCreate(true)} className="gap-1.5 h-8 text-xs">
            <Plus className="w-3.5 h-3.5" /> Create
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: "Joined", value: "15", icon: Swords, color: "text-blue-500" },
          { label: "Wins", value: "3", icon: Trophy, color: "text-yellow-500" },
          { label: "Battle XP", value: "395", icon: Zap, color: "text-primary" },
          { label: "Best Streak", value: "2", icon: Star, color: "text-orange-500" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-3">
                <stat.icon className={`w-4 h-4 ${stat.color} mb-1.5`} />
                <p className="text-xl font-bold font-mono">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="rooms" className="space-y-3">
        <TabsList className="w-full">
          <TabsTrigger value="rooms" className="flex-1 gap-1.5 text-xs">
            <Users className="w-3.5 h-3.5" /> Rooms
          </TabsTrigger>
          <TabsTrigger value="results" className="flex-1 gap-1.5 text-xs">
            <Trophy className="w-3.5 h-3.5" /> Results
          </TabsTrigger>
          <TabsTrigger value="rankings" className="flex-1 gap-1.5 text-xs">
            <Crown className="w-3.5 h-3.5" /> Rankings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rooms" className="mt-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">{activeRooms.length} active rooms</span>
          </div>
          <div className="space-y-3">
            {activeRooms.map((room, i) => (
              <motion.div key={room.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <RoomCard room={room} />
              </motion.div>
            ))}
            <Card className="border-dashed border-2 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setShowCreate(true)}>
              <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-primary" />
                </div>
                <p className="font-medium text-sm">Create New Room</p>
                <p className="text-xs text-muted-foreground">Host your own competition</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="mt-0">
          <Card>
            <CardContent className="pt-3 px-4 divide-y divide-border">
              {recentResults.map((result, i) => (
                <motion.div key={result.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 py-3 first:pt-0">
                  <div className="text-xl flex-shrink-0">
                    {result.position === 1 ? "🥇" : result.position === 2 ? "🥈" : "🥉"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{result.competition}</p>
                    <p className="text-xs text-muted-foreground">#{result.position} of {result.players} · {result.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-mono font-semibold text-primary">+{result.xp} XP</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rankings" className="mt-0">
          <Card>
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-500" /> Competition Rankings
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="divide-y divide-border">
                {leaderboard.map((entry, i) => (
                  <motion.div key={entry.rank} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-3 py-3 first:pt-0 ${entry.name === "You" ? "bg-primary/5 -mx-4 px-4 rounded" : ""}`}>
                    <span className="text-lg w-6 text-center flex-shrink-0">{entry.badge}</span>
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">{entry.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${entry.name === "You" ? "text-primary" : ""}`}>{entry.name}</p>
                      <p className="text-xs text-muted-foreground">{entry.wins} wins</p>
                    </div>
                    <p className="text-sm font-mono font-bold text-primary flex-shrink-0">{entry.xp.toLocaleString()}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateRoomDialog open={showCreate} onClose={() => setShowCreate(false)} />
      <JoinRoomDialog open={showJoin} onClose={() => setShowJoin(false)} />
    </div>
  );
}
