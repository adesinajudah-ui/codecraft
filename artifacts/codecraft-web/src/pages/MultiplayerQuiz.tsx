import { useState, useEffect, useRef } from "react";
import { useParams, Link, useSearch, useLocation } from "wouter";
import {
  useGetQuizSession,
  useCreateQuizSession,
  useJoinQuizSession,
  useSubmitSessionAnswer,
  getGetQuizSessionQueryKey,
  useGetQuizByCourse,
  getGetQuizByCourseQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Users,
  Trophy,
  Crown,
  Star,
  CheckCircle2,
  Swords,
  Copy,
  Check,
  Wifi,
  WifiOff,
  Zap,
  Target,
  Timer,
  Medal,
} from "lucide-react";
import { useUser } from "@clerk/react";
import { toast } from "sonner";

// ── Extended participant type ─────────────────────────────────────────────────

type Participant = {
  userId: string;
  displayName: string;
  score: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  answerTimes: number[];
  fastAnswerCount: number;
  isFinished: boolean;
  joinedAt: number;
  totalXp: number;
};

// Cast session participants to the extended type (JSONB carries the fields)
function asParticipants(raw: unknown[]): Participant[] {
  return (raw as Participant[]).map((p) => ({
    userId: p.userId ?? "",
    displayName: p.displayName ?? "Player",
    score: p.score ?? 0,
    answeredCount: p.answeredCount ?? 0,
    correctCount: p.correctCount ?? 0,
    wrongCount: p.wrongCount ?? 0,
    answerTimes: p.answerTimes ?? [],
    fastAnswerCount: p.fastAnswerCount ?? 0,
    isFinished: p.isFinished ?? false,
    joinedAt: p.joinedAt ?? 0,
    totalXp: p.totalXp ?? 0,
  }));
}

// ── Level helpers ─────────────────────────────────────────────────────────────

function getPlayerLevel(xp: number) {
  const level = Math.floor(xp / 100) + 1;
  if (level <= 10) return { level, tier: "Beginner", color: "bg-green-500/20 text-green-400 border-green-500/30" };
  if (level <= 25) return { level, tier: "Intermediate", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" };
  if (level <= 50) return { level, tier: "Advanced", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" };
  return { level, tier: "Expert", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" };
}

function LevelBadge({ xp }: { xp: number }) {
  const { tier, color } = getPlayerLevel(xp);
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${color}`}>
      {tier}
    </span>
  );
}

function avgMs(times: number[]): number {
  if (!times.length) return 0;
  return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
}

function accuracy(p: Participant): number {
  const total = p.correctCount + p.wrongCount;
  if (total === 0) return 0;
  return Math.round((p.correctCount / total) * 100);
}

// ── Stat box ─────────────────────────────────────────────────────────────────

function StatBox({ label, value, icon: Icon, accent }: {
  label: string;
  value: number | string;
  icon?: React.ComponentType<{ className?: string }>;
  accent?: string;
}) {
  return (
    <div className="flex flex-col gap-1 bg-secondary/40 border border-border rounded-xl px-4 py-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {Icon && <Icon className={`w-3 h-3 ${accent ?? ""}`} />}
        {label}
      </div>
      <div className={`text-2xl font-bold font-mono ${accent ?? "text-foreground"}`}>{value}</div>
    </div>
  );
}

// ── Rank medals ───────────────────────────────────────────────────────────────

const MEDALS = ["🥇", "🥈", "🥉"];

// ── Main component ────────────────────────────────────────────────────────────

export default function MultiplayerQuiz() {
  const { courseId } = useParams();
  const id = parseInt(courseId || "0", 10);
  const search = useSearch();
  const [, navigate] = useLocation();
  const { user } = useUser();
  const queryClient = useQueryClient();

  // Pre-fill join code from ?join=CODE param (set by JoinRoomDialog)
  const pendingJoin = new URLSearchParams(search).get("join") ?? "";

  const [sessionCode, setSessionCode] = useState<string>("");
  const [joinCode, setJoinCode] = useState(pendingJoin);
  const [answeredUpTo, setAnsweredUpTo] = useState(-1);
  const [copied, setCopied] = useState(false);

  const displayName =
    user?.fullName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "Player";

  const { data: quiz } = useGetQuizByCourse(id, {
    query: { enabled: !!id, queryKey: getGetQuizByCourseQueryKey(id) },
  });

  const createSession = useCreateQuizSession();
  const joinSession = useJoinQuizSession();
  const submitAnswer = useSubmitSessionAnswer();

  const sessionQueryKey = getGetQuizSessionQueryKey(sessionCode);
  const { data: session, isLoading: isSessionLoading } = useGetQuizSession(
    sessionCode,
    {
      query: {
        enabled: !!sessionCode,
        queryKey: sessionQueryKey,
        // SSE drives updates; only refetch if tab regains focus (safety net)
        refetchInterval: false,
        refetchOnWindowFocus: true,
      },
    }
  );

  // ── Auto-join when navigated from Competitions page with ?join=CODE ──────────
  const autoJoinFiredRef = useRef(false);
  useEffect(() => {
    if (!pendingJoin || autoJoinFiredRef.current || sessionCode || !user) return;
    autoJoinFiredRef.current = true;
    joinSession.mutate(
      { code: pendingJoin, data: { displayName } },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(getGetQuizSessionQueryKey(pendingJoin), data);
          setSessionCode(pendingJoin);
          setAnsweredUpTo(-1);
          // Strip the ?join param from the URL so refresh doesn't re-join
          navigate(`/quiz/${courseId}/multiplayer`, { replace: true });
        },
        onError: () => {
          autoJoinFiredRef.current = false; // allow retry
        },
      }
    );
  }, [pendingJoin, user]);

  // ── SSE connection ──────────────────────────────────────────────────────────
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!sessionCode) return;
    if (session?.status === "finished") return; // no need for SSE when done

    const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
    const url = `${basePath}/api/quiz/sessions/${sessionCode}/events`;
    const es = new EventSource(url);
    esRef.current = es;

    es.addEventListener("session_update", (e) => {
      try {
        const data = JSON.parse(e.data);
        queryClient.setQueryData(sessionQueryKey, data);
      } catch { /* ignore parse errors */ }
    });

    es.addEventListener("player_joined", (e) => {
      try {
        const { displayName: who } = JSON.parse(e.data);
        toast(`🟢 ${who} joined the competition`, {
          duration: 3000,
          position: "top-center",
        });
      } catch { /* ignore */ }
    });

    es.onerror = () => {
      // EventSource will auto-reconnect; no action needed
    };

    return () => {
      es.close();
      esRef.current = null;
    };
  }, [sessionCode, session?.status]);

  // Close SSE when session finishes
  useEffect(() => {
    if (session?.status === "finished") {
      esRef.current?.close();
      esRef.current = null;
    }
  }, [session?.status]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleCreate = () => {
    if (!quiz) return;
    createSession.mutate(
      { data: { quizId: quiz.id, displayName } },
      {
        onSuccess: (data) => {
          setSessionCode(data.code);
          setAnsweredUpTo(-1);
        },
      }
    );
  };

  const handleJoin = () => {
    if (!joinCode) return;
    joinSession.mutate(
      { code: joinCode.toUpperCase(), data: { displayName } },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(
            getGetQuizSessionQueryKey(joinCode.toUpperCase()),
            data
          );
          setSessionCode(joinCode.toUpperCase());
          setAnsweredUpTo(-1);
        },
        onError: (err) => alert("Failed to join: " + (err as Error).message),
      }
    );
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    if (!sessionCode) return;
    const currentQ = session?.currentQuestion ?? 0;
    if (answeredUpTo >= currentQ) return;

    setAnsweredUpTo(currentQ);
    submitAnswer.mutate(
      { code: sessionCode, data: { questionId, answerIndex } },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(sessionQueryKey, data);
        },
        onError: () => {
          setAnsweredUpTo(currentQ - 1);
        },
      }
    );
  };

  const copyCode = () => {
    navigator.clipboard.writeText(sessionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Entry screen ─────────────────────────────────────────────────────────────
  if (!sessionCode) {
    return (
      <div className="p-8 max-w-md mx-auto mt-16">
        <div className="mb-10 text-center">
          <div className="text-5xl mb-3">⚔️</div>
          <h1 className="text-3xl font-bold font-mono mb-2">Multiplayer Quiz</h1>
          <p className="text-muted-foreground text-sm">
            Challenge a friend — quiz starts the moment they join
          </p>
        </div>

        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full h-14 text-base gap-3"
            onClick={handleCreate}
            disabled={createSession.isPending || !quiz}
          >
            {createSession.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Crown className="w-5 h-5 text-yellow-400" />
            )}
            Start Competition
          </Button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or join with a code</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Enter room code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="font-mono text-center text-lg uppercase tracking-widest"
              maxLength={6}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            />
            <Button
              size="lg"
              variant="secondary"
              onClick={handleJoin}
              disabled={joinSession.isPending || !joinCode}
              className="shrink-0"
            >
              {joinSession.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isSessionLoading || !session || !quiz) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const participants = asParticipants(session.participants as unknown[]);
  const isHost = session.hostUserId === user?.id;
  const currentQIndex = session.currentQuestion ?? 0;
  const hasAnsweredCurrentQ = answeredUpTo >= currentQIndex;
  const finishedCount = participants.filter((p) => p.isFinished).length;
  const stillAnswering = participants.filter((p) => !p.isFinished && p.answeredCount <= currentQIndex).length;

  // ── Waiting room ────────────────────────────────────────────────────────
  if (session.status === "waiting") {
    return (
      <div className="p-8 max-w-md mx-auto mt-12 text-center">
        <div className="text-4xl mb-4">⚔️</div>
        <h1 className="text-2xl font-bold font-mono mb-1">Room Ready!</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Share this code — the quiz starts automatically when your opponent joins
        </p>

        {/* Live dashboard – waiting state */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-left">
          <StatBox label="Players Joined" value={participants.length} icon={Users} />
          <StatBox label="Status" value="Waiting" icon={Loader2} accent="text-yellow-400" />
        </div>

        {/* Copyable room code */}
        <div
          className="relative bg-secondary border-2 border-dashed border-border rounded-2xl py-8 mb-6 cursor-pointer group hover:border-primary/50 transition-colors"
          onClick={copyCode}
        >
          <div className="text-6xl font-mono font-black tracking-[0.25em] text-primary select-all">
            {session.code}
          </div>
          <div className="absolute top-3 right-3 text-muted-foreground group-hover:text-primary transition-colors">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </div>
          <p className="text-xs text-muted-foreground mt-2">{copied ? "Copied!" : "Tap to copy"}</p>
        </div>

        {/* Player list */}
        <div className="bg-card border rounded-xl p-4 mb-6 text-left">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
            <Users className="w-4 h-4" />
            Players ({participants.length} / 2)
          </div>
          <div className="space-y-2">
            {participants.map((p) => {
              const lvl = getPlayerLevel(p.totalXp);
              return (
                <div key={p.userId} className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Wifi className="w-3 h-3 text-green-400 shrink-0" />
                    <span className="font-medium text-sm truncate">{p.displayName}</span>
                    {p.userId === user?.id && (
                      <span className="text-xs text-muted-foreground">(you)</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <LevelBadge xp={p.totalXp} />
                    {p.userId === session.hostUserId && (
                      <Badge variant="secondary" className="text-xs">Host</Badge>
                    )}
                  </div>
                </div>
              );
            })}
            {participants.length < 2 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-2 border border-dashed rounded-lg">
                <Loader2 className="w-3 h-3 animate-spin" />
                Waiting for opponent…
              </div>
            )}
          </div>
        </div>

        {isHost ? (
          <p className="text-sm text-muted-foreground">
            🔗 Send the code above to your friend — they join, you both play!
          </p>
        ) : (
          <p className="text-sm text-muted-foreground animate-pulse">
            ⏳ Waiting for the room to fill up…
          </p>
        )}
      </div>
    );
  }

  // ── Finished screen ────────────────────────────────────────────────────────
  if (session.status === "finished") {
    const sorted = [...participants].sort((a, b) => b.score - a.score);
    const me = participants.find((p) => p.userId === user?.id);
    const iWon = sorted[0]?.userId === user?.id;
    const isPerfect = me ? me.correctCount === quiz.questions.length : false;
    const correctXp = (me?.correctCount ?? 0) * 10;
    const fastXp = (me?.fastAnswerCount ?? 0) * 5;
    const winBonus = iWon ? 100 : 0;
    const perfectBonus = isPerfect ? 50 : 0;
    const totalXpEarned = correctXp + fastXp + winBonus + perfectBonus;

    return (
      <div className="p-6 max-w-2xl mx-auto mt-6">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">{iWon ? "🏆" : "😤"}</div>
          <h1 className="text-3xl font-bold font-mono mb-2">
            {iWon ? "You Won!" : `${sorted[0]?.displayName} Wins!`}
          </h1>
          <p className="text-muted-foreground text-sm">
            {iWon ? "Incredible — you outscored your opponent!" : "Better luck next time!"}
          </p>
        </div>

        {/* XP breakdown */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star className="w-4 h-4 text-primary" />
            <span className="font-semibold">XP Earned This Match</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {correctXp > 0 && (
              <div className="flex justify-between bg-secondary/50 rounded-lg px-3 py-2">
                <span className="text-muted-foreground">Correct answers</span>
                <span className="font-mono font-bold text-primary">+{correctXp}</span>
              </div>
            )}
            {fastXp > 0 && (
              <div className="flex justify-between bg-secondary/50 rounded-lg px-3 py-2">
                <span className="text-muted-foreground flex items-center gap-1"><Zap className="w-3 h-3" />Fast bonus</span>
                <span className="font-mono font-bold text-yellow-400">+{fastXp}</span>
              </div>
            )}
            {winBonus > 0 && (
              <div className="flex justify-between bg-secondary/50 rounded-lg px-3 py-2">
                <span className="text-muted-foreground flex items-center gap-1"><Trophy className="w-3 h-3" />Win bonus</span>
                <span className="font-mono font-bold text-yellow-400">+{winBonus}</span>
              </div>
            )}
            {perfectBonus > 0 && (
              <div className="flex justify-between bg-secondary/50 rounded-lg px-3 py-2">
                <span className="text-muted-foreground flex items-center gap-1"><Star className="w-3 h-3" />Perfect score</span>
                <span className="font-mono font-bold text-yellow-400">+{perfectBonus}</span>
              </div>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-primary/20 text-center">
            <span className="text-2xl font-bold font-mono text-primary">+{totalXpEarned} XP</span>
            <span className="text-muted-foreground text-sm ml-2">posted to leaderboard</span>
          </div>
        </div>

        {/* Live leaderboard */}
        <div className="bg-card border rounded-xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4" /> Final Leaderboard
          </h2>
          <div className="space-y-3">
            {sorted.map((p, idx) => {
              const isMe = p.userId === user?.id;
              const acc = accuracy(p);
              const avg = avgMs(p.answerTimes);
              return (
                <div
                  key={p.userId}
                  className={`rounded-xl p-4 ${isMe ? "bg-primary/10 border border-primary/30" : "bg-secondary/50"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{MEDALS[idx] ?? `${idx + 1}`}</span>
                      <div>
                        <div className="font-semibold text-sm flex items-center gap-2">
                          {p.displayName}
                          {isMe && <span className="text-xs text-muted-foreground">(you)</span>}
                        </div>
                        <LevelBadge xp={p.totalXp} />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-2xl font-bold text-primary">{p.score}</div>
                      <div className="text-xs text-muted-foreground">/{quiz.questions.length}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Target className="w-3 h-3 text-green-400" />
                      <span>{acc}% accuracy</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      <span>{p.correctCount}✓ {p.wrongCount}✗</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Timer className="w-3 h-3 text-blue-400" />
                      <span>{avg > 0 ? `${(avg / 1000).toFixed(1)}s avg` : "—"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              setSessionCode("");
              setJoinCode("");
              setAnsweredUpTo(-1);
            }}
          >
            Play Again
          </Button>
          <Button asChild className="flex-1">
            <Link href="/leaderboard">
              <Trophy className="w-4 h-4 mr-2" /> Leaderboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // ── Active quiz ────────────────────────────────────────────────────────────
  const currentQ = quiz.questions[currentQIndex];
  const totalQ = quiz.questions.length;
  const sortedParticipants = [...participants].sort((a, b) => b.score - a.score);

  return (
    <div className="p-4 max-w-5xl mx-auto">

      {/* Competition Dashboard */}
      <div className="mb-5 bg-card border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
            <Swords className="w-3.5 h-3.5 text-primary animate-pulse" />
            Live Competition Dashboard
          </h2>
          <Badge variant="outline" className="text-xs text-green-400 border-green-500/30 bg-green-500/10">
            ● LIVE
          </Badge>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatBox
            label="Players Joined"
            value={participants.length}
            icon={Users}
          />
          <StatBox
            label="Question"
            value={`${currentQIndex + 1} / ${totalQ}`}
            icon={Medal}
            accent="text-primary"
          />
          <StatBox
            label="Finished"
            value={finishedCount}
            icon={CheckCircle2}
            accent={finishedCount > 0 ? "text-green-400" : undefined}
          />
          <StatBox
            label="Still Answering"
            value={stillAnswering}
            icon={Timer}
            accent={stillAnswering > 0 ? "text-yellow-400" : undefined}
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-secondary rounded-full h-1.5 mb-5">
        <div
          className="bg-primary h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((currentQIndex + 1) / totalQ) * 100}%` }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-5">

        {/* Question panel */}
        <div className="flex-1">
          <Card className="mb-4">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-muted-foreground">
                  Q{currentQIndex + 1} of {totalQ}
                </span>
                <Swords className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <CardTitle className="text-lg leading-snug">{currentQ?.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQ?.options.map((opt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className={`w-full justify-start h-auto p-4 text-left font-normal transition-all ${
                    hasAnsweredCurrentQ
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:border-primary hover:bg-primary/5"
                  }`}
                  onClick={() => handleAnswer(currentQ.id, idx)}
                  disabled={hasAnsweredCurrentQ || submitAnswer.isPending}
                >
                  <span className="font-mono text-muted-foreground mr-3 w-5 shrink-0">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opt}
                </Button>
              ))}

              {hasAnsweredCurrentQ && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  Answer locked in — waiting for opponent…
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Live scoreboard */}
        <div className="w-full md:w-64 shrink-0 space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" /> Live Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sortedParticipants.map((p, idx) => {
                const isMe = p.userId === user?.id;
                const hasAnswered = p.answeredCount > currentQIndex;
                const acc = accuracy(p);
                const avg = avgMs(p.answerTimes);
                return (
                  <div
                    key={p.userId}
                    className={`rounded-xl p-3 ${isMe ? "bg-primary/10 border border-primary/20" : "bg-secondary/50"}`}
                  >
                    {/* Name row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-base">{MEDALS[idx] ?? `${idx + 1}`}</span>
                        <div className="min-w-0">
                          <div className={`font-semibold text-sm truncate ${isMe ? "text-primary" : ""}`}>
                            {isMe ? "You" : p.displayName}
                          </div>
                          <LevelBadge xp={p.totalXp} />
                        </div>
                      </div>
                      <span className="font-mono font-bold text-primary text-lg shrink-0">{p.score}</span>
                    </div>

                    {/* Status */}
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                      {hasAnswered ? (
                        <><CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />Answered</>
                      ) : (
                        <><Loader2 className="w-3 h-3 animate-spin shrink-0" />Thinking…</>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-1 text-[10px] text-muted-foreground">
                      <div className="flex items-center gap-0.5">
                        <Target className="w-2.5 h-2.5 text-green-400" />
                        {acc}%
                      </div>
                      <div className="flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5 text-green-400" />
                        {p.correctCount}✓ {p.wrongCount}✗
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Timer className="w-2.5 h-2.5 text-blue-400" />
                        {avg > 0 ? `${(avg / 1000).toFixed(1)}s` : "—"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* XP preview */}
          <Card className="bg-secondary/30">
            <CardContent className="pt-4 pb-3 space-y-1.5">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-yellow-400" /> XP System
              </div>
              {[
                { label: "Correct answer", value: "+10 XP" },
                { label: "Fast answer (<10s)", value: "+5 XP" },
                { label: "Win bonus", value: "+100 XP" },
                { label: "Perfect score", value: "+50 XP" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-mono text-primary font-semibold">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
