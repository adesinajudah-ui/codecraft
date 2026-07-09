import { useState } from "react";
import { useParams, Link } from "wouter";
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
} from "lucide-react";
import { useUser } from "@clerk/react";

export default function MultiplayerQuiz() {
  const { courseId } = useParams();
  const id = parseInt(courseId || "0", 10);
  const { user } = useUser();
  const queryClient = useQueryClient();

  const [sessionCode, setSessionCode] = useState<string>("");
  const [joinCode, setJoinCode] = useState("");
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
        refetchInterval: (q) => {
          if (q.state.data?.status === "finished") return false;
          return 1500;
        },
      },
    }
  );

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

  // ── Entry screen ──────────────────────────────────────────────────────────
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
              {joinSession.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Join"
              )}
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

  const isHost = session.hostUserId === user?.id;
  const currentQIndex = session.currentQuestion ?? 0;
  const hasAnsweredCurrentQ = answeredUpTo >= currentQIndex;

  // ── Waiting room (host waits for opponent) ────────────────────────────────
  if (session.status === "waiting") {
    return (
      <div className="p-8 max-w-md mx-auto mt-12 text-center">
        <div className="text-4xl mb-4">⚔️</div>
        <h1 className="text-2xl font-bold font-mono mb-1">Room Ready!</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Share this code — the quiz starts automatically when your opponent joins
        </p>

        {/* Copyable room code */}
        <div
          className="relative bg-secondary border-2 border-dashed border-border rounded-2xl py-8 mb-6 cursor-pointer group hover:border-primary/50 transition-colors"
          onClick={copyCode}
        >
          <div className="text-6xl font-mono font-black tracking-[0.25em] text-primary select-all">
            {session.code}
          </div>
          <div className="absolute top-3 right-3 text-muted-foreground group-hover:text-primary transition-colors">
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {copied ? "Copied!" : "Tap to copy"}
          </p>
        </div>

        {/* Player list */}
        <div className="bg-card border rounded-xl p-4 mb-6 text-left">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
            <Users className="w-4 h-4" />
            Players ({session.participants.length} / 2)
          </div>
          <div className="space-y-2">
            {session.participants.map((p) => (
              <div
                key={p.userId}
                className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2"
              >
                <span className="font-medium text-sm">
                  {p.displayName}
                  {p.userId === user?.id && (
                    <span className="text-xs text-muted-foreground ml-2">
                      (you)
                    </span>
                  )}
                </span>
                {p.userId === session.hostUserId && (
                  <Badge variant="secondary" className="text-xs">
                    Host
                  </Badge>
                )}
              </div>
            ))}
            {session.participants.length < 2 && (
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

  // ── Finished screen ───────────────────────────────────────────────────────
  if (session.status === "finished") {
    const sorted = [...session.participants].sort((a, b) => b.score - a.score);
    const winner = sorted[0];
    const myRank = sorted.findIndex((p) => p.userId === user?.id) + 1;
    const xpTiers = [100, 60, 30, 10];
    const myXp = xpTiers[Math.min(myRank - 1, xpTiers.length - 1)];
    const iWon = winner?.userId === user?.id;

    return (
      <div className="p-8 max-w-lg mx-auto mt-8 text-center">
        <div className="mb-8">
          <div className="text-7xl mb-4">{iWon ? "🏆" : "😤"}</div>
          <h1 className="text-3xl font-bold font-mono mb-2">
            {iWon ? "You Won!" : `${winner?.displayName} Wins!`}
          </h1>
          <p className="text-muted-foreground text-sm">
            {iWon
              ? "Incredible — you outscored your opponent!"
              : "Better luck next time. Challenge them again?"}
          </p>
        </div>

        {/* XP banner */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6 flex items-center justify-center gap-3">
          <Star className="w-5 h-5 text-primary" />
          <span className="font-semibold">
            You earned{" "}
            <span className="text-primary font-mono text-lg">{myXp} XP</span> —
            posted to the leaderboard!
          </span>
        </div>

        {/* Head-to-head result cards */}
        <div className="bg-card border rounded-xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Final Score
          </h2>
          <div className="flex items-stretch gap-4">
            {sorted.map((p, idx) => {
              const medals = ["🥇", "🥈", "🥉"];
              const isMe = p.userId === user?.id;
              const earnedXp = xpTiers[Math.min(idx, xpTiers.length - 1)];
              return (
                <div
                  key={p.userId}
                  className={`flex-1 rounded-xl p-4 text-center ${
                    isMe
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-secondary/50"
                  }`}
                >
                  <div className="text-3xl mb-1">{medals[idx] ?? `${idx + 1}`}</div>
                  <div className="font-semibold text-sm truncate">
                    {p.displayName}
                  </div>
                  {isMe && (
                    <div className="text-xs text-muted-foreground">(you)</div>
                  )}
                  <div className="font-mono text-3xl font-bold text-primary mt-2">
                    {p.score}
                    <span className="text-base text-muted-foreground font-normal">
                      /{quiz.questions.length}
                    </span>
                  </div>
                  <Badge variant="secondary" className="mt-2 text-xs font-mono">
                    +{earnedXp} XP
                  </Badge>
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

  // ── Active quiz ───────────────────────────────────────────────────────────
  const currentQ = quiz.questions[currentQIndex];
  const totalQ = quiz.questions.length;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-mono text-muted-foreground">
          Question {currentQIndex + 1} / {totalQ}
        </div>
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary">LIVE</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-secondary rounded-full h-1.5 mb-6">
        <div
          className="bg-primary h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((currentQIndex + 1) / totalQ) * 100}%` }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Question panel */}
        <div className="flex-1">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg leading-snug">
                {currentQ?.question}
              </CardTitle>
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
        <div className="w-full md:w-56 shrink-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Swords className="w-4 h-4 text-primary" /> Live Battle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[...session.participants]
                .sort((a, b) => b.score - a.score)
                .map((p) => {
                  const isMe = p.userId === user?.id;
                  const hasAnswered = p.answeredCount > currentQIndex;
                  return (
                    <div
                      key={p.userId}
                      className={`rounded-lg p-3 ${
                        isMe
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-secondary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`font-semibold text-sm truncate ${
                            isMe ? "text-primary" : ""
                          }`}
                        >
                          {isMe ? "You" : p.displayName}
                        </span>
                        <span className="font-mono font-bold text-primary text-lg">
                          {p.score}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        {hasAnswered ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
                            Answered
                          </>
                        ) : (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin shrink-0" />
                            Thinking…
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
