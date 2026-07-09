import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import {
  useGetQuizSession,
  useCreateQuizSession,
  useJoinQuizSession,
  useStartQuizSession,
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
import { Loader2, Users, Trophy, Crown, Star, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useUser } from "@clerk/react";

export default function MultiplayerQuiz() {
  const { courseId } = useParams();
  const id = parseInt(courseId || "0", 10);
  const { user } = useUser();
  const queryClient = useQueryClient();

  const [sessionCode, setSessionCode] = useState<string>("");
  const [joinCode, setJoinCode] = useState("");
  // Track which question index the user has already submitted an answer for
  const [answeredUpTo, setAnsweredUpTo] = useState(-1);

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
  const startSession = useStartQuizSession();
  const submitAnswer = useSubmitSessionAnswer();

  const sessionQueryKey = getGetQuizSessionQueryKey(sessionCode);
  const { data: session, isLoading: isSessionLoading } = useGetQuizSession(sessionCode, {
    query: {
      enabled: !!sessionCode,
      queryKey: sessionQueryKey,
      refetchInterval: (q) => {
        // Stop polling once finished
        if (q.state.data?.status === "finished") return false;
        return 2000;
      },
    },
  });

  // answeredUpTo resets naturally: hasAnsweredCurrentQ = (answeredUpTo >= currentQIndex)
  // so when currentQIndex advances the flag becomes false without any extra state reset.

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
        onSuccess: () => {
          setSessionCode(joinCode.toUpperCase());
          setAnsweredUpTo(-1);
        },
        onError: (err) => alert("Failed to join: " + (err as Error).message),
      }
    );
  };

  const handleStart = () => {
    if (!sessionCode) return;
    startSession.mutate(
      { code: sessionCode },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(sessionQueryKey, data);
        },
        onError: (err) => alert("Could not start: " + (err as Error).message),
      }
    );
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    if (!sessionCode) return;
    const currentQ = session?.currentQuestion ?? 0;
    if (answeredUpTo >= currentQ) return; // already answered this question

    // Optimistically lock the button, roll back on error
    setAnsweredUpTo(currentQ);
    submitAnswer.mutate(
      { code: sessionCode, data: { questionId, answerIndex } },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(sessionQueryKey, data);
        },
        onError: () => {
          setAnsweredUpTo(currentQ - 1); // allow retry
        },
      }
    );
  };

  // ── Lobby / entry screen ──────────────────────────────────────────────────
  if (!sessionCode) {
    return (
      <div className="p-8 max-w-lg mx-auto mt-20">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold font-mono mb-1">Multiplayer Quiz</h1>
          <p className="text-muted-foreground text-sm">Challenge friends and climb the leaderboard</p>
        </div>

        <Card className="text-center mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-mono flex items-center justify-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" /> Create a Room
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              className="w-full"
              onClick={handleCreate}
              disabled={createSession.isPending || !quiz}
            >
              {createSession.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Multiplayer Session
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-muted-foreground mb-6 text-sm">— OR —</div>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-xl font-mono flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Join a Room
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter Room Code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="text-center font-mono text-xl uppercase tracking-widest"
              maxLength={6}
            />
            <Button
              size="lg"
              variant="secondary"
              className="w-full"
              onClick={handleJoin}
              disabled={joinSession.isPending || !joinCode}
            >
              {joinSession.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Join Session
            </Button>
          </CardContent>
        </Card>
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

  // ── Waiting room ──────────────────────────────────────────────────────────
  if (session.status === "waiting") {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center mt-10">
        <h1 className="text-3xl font-mono font-bold mb-2">Waiting Room</h1>
        <p className="text-muted-foreground mb-6 text-sm">Share this code with friends</p>

        <div className="text-5xl font-mono font-bold tracking-widest text-primary mb-8 bg-secondary py-5 rounded-2xl border border-border">
          {session.code}
        </div>

        <div className="bg-card border rounded-xl p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Participants ({session.participants.length})
          </h2>
          <div className="space-y-2">
            {session.participants.map((p) => (
              <div
                key={p.userId}
                className="p-3 bg-secondary/50 rounded-lg flex items-center justify-between"
              >
                <span className="font-medium">
                  {p.displayName}
                  {p.userId === user?.id && (
                    <span className="text-muted-foreground text-xs ml-2">(you)</span>
                  )}
                </span>
                {p.userId === session.hostUserId && (
                  <Badge variant="secondary" className="text-xs">Host</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {isHost ? (
          <Button
            size="lg"
            className="w-full"
            onClick={handleStart}
            disabled={startSession.isPending || session.participants.length < 1}
          >
            {startSession.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Start Quiz ({session.participants.length} player{session.participants.length !== 1 ? "s" : ""})
          </Button>
        ) : (
          <p className="text-muted-foreground animate-pulse">Waiting for host to start…</p>
        )}
      </div>
    );
  }

  // ── Finished screen ───────────────────────────────────────────────────────
  if (session.status === "finished") {
    const sorted = [...session.participants].sort((a, b) => b.score - a.score);
    const winner = sorted[0];
    const myResult = sorted.find((p) => p.userId === user?.id);
    const myRank = sorted.findIndex((p) => p.userId === user?.id) + 1;
    const xpTiers = [100, 60, 30, 10];
    const myXp = xpTiers[Math.min(myRank - 1, xpTiers.length - 1)];

    return (
      <div className="p-8 max-w-2xl mx-auto mt-8 text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold font-mono mb-2">Quiz Over!</h1>
          {winner && (
            <p className="text-muted-foreground">
              <span className="text-foreground font-semibold">{winner.displayName}</span> wins with{" "}
              <span className="text-primary font-mono">{winner.score}</span> correct answer
              {winner.score !== 1 ? "s" : ""}!
            </p>
          )}
        </div>

        {/* XP earned */}
        {myResult && (
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-8 flex items-center justify-center gap-3">
            <Star className="w-5 h-5 text-primary" />
            <span className="font-semibold">
              You earned <span className="text-primary font-mono">{myXp} XP</span> — posted to the leaderboard!
            </span>
          </div>
        )}

        {/* Podium */}
        <div className="bg-card border rounded-xl p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" /> Final Rankings
          </h2>
          <div className="space-y-3">
            {sorted.map((p, idx) => {
              const medals = ["🥇", "🥈", "🥉"];
              const isMe = p.userId === user?.id;
              const earnedXp = xpTiers[Math.min(idx, xpTiers.length - 1)];
              return (
                <div
                  key={p.userId}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isMe ? "bg-primary/10 border border-primary/30" : "bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl w-7 text-center">{medals[idx] ?? `${idx + 1}.`}</span>
                    <span className="font-medium">
                      {p.displayName}
                      {isMe && <span className="text-muted-foreground text-xs ml-2">(you)</span>}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <span className="text-muted-foreground text-sm font-mono">
                      {p.score}/{quiz.questions.length}
                    </span>
                    <Badge variant="secondary" className="font-mono text-xs">
                      +{earnedXp} XP
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4">
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
              <Trophy className="w-4 h-4 mr-2" /> View Leaderboard
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
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm font-mono text-muted-foreground">
          Question {currentQIndex + 1} of {totalQ}
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
          ● Live
        </Badge>
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
                  Answer submitted — waiting for others…
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Live scoreboard */}
        <div className="w-full md:w-60 shrink-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Trophy className="w-4 h-4 text-yellow-500" /> Live Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[...session.participants]
                .sort((a, b) => b.score - a.score)
                .map((p, idx) => {
                  const isMe = p.userId === user?.id;
                  return (
                    <div key={p.userId} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-muted-foreground text-sm w-4 shrink-0">{idx + 1}.</span>
                        <span
                          className={`font-medium truncate text-sm ${isMe ? "text-primary" : ""}`}
                          title={p.displayName}
                        >
                          {p.displayName}
                          {isMe && <span className="ml-1 text-xs opacity-70">(you)</span>}
                        </span>
                      </div>
                      <span className="font-mono text-primary text-sm shrink-0">{p.score}</span>
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
