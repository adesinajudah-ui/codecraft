import { useState } from "react";
import { useParams, Link } from "wouter";
import { useGetQuizByCourse, useSubmitQuizAttempt, getGetQuizByCourseQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Trophy } from "lucide-react";

export default function QuizPage() {
  const { courseId } = useParams();
  const id = parseInt(courseId || "0", 10);

  const { data: quiz, isLoading } = useGetQuizByCourse(id, {
    query: { enabled: !!id, queryKey: getGetQuizByCourseQueryKey(id) }
  });

  const submitQuiz = useSubmitQuizAttempt();

  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!quiz) {
    return <div className="p-8 text-center text-muted-foreground">Quiz not found for this course.</div>;
  }

  const handleSelectOption = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.length < quiz.questions.length || answers.some(a => a === undefined)) {
      alert("Please answer all questions.");
      return;
    }

    submitQuiz.mutate({
      data: {
        quizId: quiz.id,
        answers
      }
    }, {
      onSuccess: (res) => {
        setResult(res);
        setSubmitted(true);
      }
    });
  };

  if (submitted && result) {
    const isPerfect = result.score === result.totalQuestions;
    return (
      <div className="p-8 max-w-2xl mx-auto text-center flex flex-col items-center">
        <Trophy className={`w-24 h-24 mb-6 ${isPerfect ? 'text-yellow-500' : 'text-muted-foreground'}`} />
        <h1 className="text-4xl font-bold font-mono mb-4">Quiz Completed!</h1>
        <p className="text-xl mb-2">You scored {result.score} out of {result.totalQuestions}</p>
        <p className="text-2xl font-bold text-primary mb-8">+{result.xpAwarded} XP Earned</p>
        <Link href={`/learn/${courseId}`}>
          <Button size="lg">Back to Course</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Link href={`/learn/${courseId}`}>
        <Button variant="ghost" size="sm" className="mb-6 -ml-3 text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to course
        </Button>
      </Link>

      <h1 className="text-3xl font-bold font-mono tracking-tight mb-8">{quiz.title}</h1>

      <div className="space-y-8 mb-8">
        {quiz.questions.map((q, qIndex) => (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                <span className="text-muted-foreground mr-2">{qIndex + 1}.</span>
                {q.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {q.options.map((opt, optIndex) => {
                const isSelected = answers[qIndex] === optIndex;
                return (
                  <div
                    key={optIndex}
                    onClick={() => handleSelectOption(qIndex, optIndex)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-primary/20 border-primary text-foreground' 
                        : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    {opt}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button 
          size="lg" 
          onClick={handleSubmit} 
          disabled={submitQuiz.isPending || answers.filter(a => a !== undefined).length < quiz.questions.length}
        >
          {submitQuiz.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          Submit Quiz
        </Button>
      </div>
    </div>
  );
}
