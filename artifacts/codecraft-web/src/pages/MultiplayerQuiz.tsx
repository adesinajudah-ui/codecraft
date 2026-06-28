import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { 
  useGetQuizSession, 
  useCreateQuizSession, 
  useJoinQuizSession, 
  useSubmitSessionAnswer,
  getGetQuizSessionQueryKey,
  useGetQuizByCourse,
  getGetQuizByCourseQueryKey
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Users, Trophy } from "lucide-react";
import { useUser } from "@clerk/react";

export default function MultiplayerQuiz() {
  const { courseId } = useParams();
  const id = parseInt(courseId || "0", 10);
  const { user } = useUser();

  const [sessionCode, setSessionCode] = useState<string>("");
  const [joinCode, setJoinCode] = useState("");

  const { data: quiz } = useGetQuizByCourse(id, {
    query: { enabled: !!id, queryKey: getGetQuizByCourseQueryKey(id) }
  });

  const createSession = useCreateQuizSession();
  const joinSession = useJoinQuizSession();
  const submitAnswer = useSubmitSessionAnswer();

  const { data: session, isLoading: isSessionLoading } = useGetQuizSession(sessionCode, {
    query: { 
      enabled: !!sessionCode, 
      queryKey: getGetQuizSessionQueryKey(sessionCode),
      refetchInterval: 2000 // Poll every 2 seconds
    }
  });

  const handleCreate = () => {
    if (!quiz) return;
    createSession.mutate({ data: { quizId: quiz.id } }, {
      onSuccess: (data) => {
        setSessionCode(data.code);
      }
    });
  };

  const handleJoin = () => {
    if (!joinCode) return;
    joinSession.mutate({ code: joinCode }, {
      onSuccess: () => {
        setSessionCode(joinCode);
      },
      onError: (err) => alert("Failed to join: " + err.message)
    });
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    if (!sessionCode) return;
    submitAnswer.mutate({
      code: sessionCode,
      data: { questionId, answerIndex }
    });
  };

  if (!sessionCode) {
    return (
      <div className="p-8 max-w-lg mx-auto mt-20">
        <Card className="text-center mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-mono">Create a Room</CardTitle>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="w-full" onClick={handleCreate} disabled={createSession.isPending || !quiz}>
              {createSession.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Multiplayer Session
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-muted-foreground mb-8 text-sm">OR</div>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-mono">Join a Room</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="Enter Room Code" 
              value={joinCode} 
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="text-center font-mono text-xl uppercase tracking-widest"
            />
            <Button size="lg" variant="secondary" className="w-full" onClick={handleJoin} disabled={joinSession.isPending || !joinCode}>
              {joinSession.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Join Session
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSessionLoading || !session || !quiz) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const isHost = session.hostUserId === user?.id;

  if (session.status === 'waiting') {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center mt-10">
        <h1 className="text-3xl font-mono mb-2">Waiting Room</h1>
        <div className="text-5xl font-mono font-bold tracking-widest text-primary mb-8 bg-secondary py-4 rounded-xl">
          {session.code}
        </div>
        
        <div className="bg-card border rounded-xl p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Participants ({session.participants.length})
          </h2>
          <div className="space-y-2">
            {session.participants.map(p => (
              <div key={p.userId} className="p-3 bg-secondary/50 rounded-lg flex items-center justify-between">
                <span className="font-medium">{p.displayName} {p.userId === user?.id ? "(You)" : ""}</span>
              </div>
            ))}
          </div>
        </div>

        {isHost ? (
          <Button size="lg" className="w-full" onClick={() => {/* TODO: Host start endpoint */ alert('Host start not implemented in API, this would advance status')}}>
            Start Quiz
          </Button>
        ) : (
          <p className="text-muted-foreground animate-pulse">Waiting for host to start...</p>
        )}
      </div>
    );
  }

  // Active quiz state
  const currentQIndex = session.currentQuestion || 0;
  const currentQ = quiz.questions[currentQIndex];

  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <div className="mb-4 flex justify-between items-center text-sm font-mono text-muted-foreground">
          <span>Question {currentQIndex + 1} of {quiz.questions.length}</span>
          <span className="bg-primary/20 text-primary px-2 py-1 rounded">Live</span>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ?.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQ?.options.map((opt, idx) => (
              <Button 
                key={idx}
                variant="outline"
                className="w-full justify-start h-auto p-4 text-left font-normal"
                onClick={() => handleAnswer(currentQ.id, idx)}
              >
                {opt}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="w-full md:w-64">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Live Scores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {session.participants.sort((a, b) => b.score - a.score).map((p, idx) => (
              <div key={p.userId} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground w-4">{idx + 1}.</span>
                  <span className="font-medium truncate max-w-[100px]" title={p.displayName}>{p.displayName}</span>
                </div>
                <span className="font-mono text-primary">{p.score}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
