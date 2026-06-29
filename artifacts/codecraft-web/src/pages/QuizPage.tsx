import { useState } from "react";
import { useParams, Link } from "wouter";
import { useGetQuizByCourse, useSubmitQuizAttempt, getGetQuizByCourseQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Trophy, CheckCircle2, XCircle, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizPage() {
  const { courseId } = useParams();
  const id = parseInt(courseId || "0", 10);

  const { data: quiz, isLoading } = useGetQuizByCourse(id, {
    query: { enabled: !!id, queryKey: getGetQuizByCourseQueryKey(id) }
  });

  const submitQuiz = useSubmitQuizAttempt();

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [reviewMode, setReviewMode] = useState(false);

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setRevealed(false);
    setSubmitted(false);
    setResult(null);
    setReviewMode(false);
  };

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

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentQ];

  const handleSelectOption = (optionIndex: number) => {
    if (revealed) return;
    setSelectedOption(optionIndex);
    setRevealed(true);
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < totalQuestions - 1) {
      setCurrentQ(q => q + 1);
      setSelectedOption(null);
      setRevealed(false);
    } else {
      const finalAnswers = [...answers];
      submitQuiz.mutate(
        { data: { quizId: quiz.id, answers: finalAnswers } },
        {
          onSuccess: (res) => {
            setResult(res);
            setSubmitted(true);
          }
        }
      );
    }
  };

  if (submitted && result) {
    const score = result.score;
    const isPerfect = score === totalQuestions;
    const percentage = Math.round((score / totalQuestions) * 100);

    if (reviewMode) {
      return (
        <div className="p-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-mono">Answer Review</h2>
            <Button size="sm" variant="ghost" onClick={() => setReviewMode(false)}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to results
            </Button>
          </div>
          <div className="space-y-5 pb-8">
            {quiz.questions.map((q: any, qi: number) => {
              const userAnswer = answers[qi];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div key={q.id} className={cn("rounded-xl border p-4", isCorrect ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5")}>
                  <div className="flex items-start gap-2 mb-3">
                    {isCorrect
                      ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                    <p className="font-medium text-sm">{qi + 1}. {q.question}</p>
                  </div>
                  <div className="space-y-1.5 pl-7">
                    {q.options.map((opt: string, oi: number) => (
                      <div
                        key={oi}
                        className={cn(
                          "px-3 py-2 rounded-lg text-sm border",
                          oi === q.correctIndex ? "border-green-500 bg-green-500/15 text-green-700 dark:text-green-400 font-medium" :
                          oi === userAnswer && !isCorrect ? "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 line-through" :
                          "border-border text-muted-foreground"
                        )}
                      >
                        {oi === q.correctIndex && "✓ "}
                        {oi === userAnswer && !isCorrect && "✗ "}
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 max-w-sm mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Trophy className={cn("w-20 h-20 mb-4", isPerfect ? "text-yellow-400" : percentage >= 60 ? "text-primary" : "text-muted-foreground")} />
        </motion.div>

        <h1 className="text-2xl font-bold font-mono mb-1">
          {isPerfect ? "Perfect Score! 🎉" : percentage >= 60 ? "Well Done!" : "Keep Practicing!"}
        </h1>
        <p className="text-muted-foreground text-sm mb-6">{quiz.title}</p>

        <div className="w-full bg-secondary rounded-2xl p-5 mb-6">
          <div className="text-5xl font-bold font-mono text-foreground mb-1">{score}/{totalQuestions}</div>
          <div className="text-muted-foreground text-sm">{percentage}% correct</div>
          <div className="mt-4 w-full bg-background rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={cn("h-2 rounded-full", percentage >= 80 ? "bg-green-500" : percentage >= 60 ? "bg-primary" : "bg-orange-500")}
            />
          </div>
        </div>

        <div className="w-full bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 mb-6">
          <p className="text-primary font-bold text-lg">+{result.xpAwarded} XP Earned</p>
        </div>

        <div className="w-full space-y-2">
          <Button className="w-full" onClick={() => setReviewMode(true)} variant="outline">
            Review All Answers
          </Button>
          <Button className="w-full" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Quiz
          </Button>
          <Link href={`/learn/${courseId}`} className="block">
            <Button className="w-full" variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = ((currentQ) / totalQuestions) * 100;
  const isCorrect = revealed && selectedOption === currentQuestion.correctIndex;

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border bg-card flex items-center gap-3">
        <Link href={`/learn/${courseId}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span className="font-medium">{quiz.title}</span>
            <span>{currentQ + 1} / {totalQuestions}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-1.5">
            <motion.div
              className="h-1.5 bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-2">Question {currentQ + 1}</p>
            <h2 className="text-base font-semibold leading-snug mb-5">{currentQuestion.question}</h2>

            <div className="space-y-2.5">
              {currentQuestion.options.map((opt: string, oi: number) => {
                const isSelected = selectedOption === oi;
                const isCorrectAnswer = oi === currentQuestion.correctIndex;
                let optionStyle = "border-border bg-card text-foreground";
                if (revealed) {
                  if (isCorrectAnswer) optionStyle = "border-green-500 bg-green-500/15 text-green-700 dark:text-green-300";
                  else if (isSelected && !isCorrectAnswer) optionStyle = "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400";
                  else optionStyle = "border-border bg-card text-muted-foreground opacity-60";
                } else if (isSelected) {
                  optionStyle = "border-primary bg-primary/10 text-foreground";
                }

                return (
                  <motion.button
                    key={oi}
                    onClick={() => handleSelectOption(oi)}
                    disabled={revealed}
                    whileTap={!revealed ? { scale: 0.98 } : {}}
                    className={cn(
                      "w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3",
                      optionStyle,
                      !revealed && "hover:border-primary/50 cursor-pointer"
                    )}
                  >
                    <span className="text-sm leading-snug">{opt}</span>
                    {revealed && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                    {revealed && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "mt-4 p-3 rounded-xl text-sm font-medium",
                    isCorrect ? "bg-green-500/15 text-green-700 dark:text-green-400" : "bg-red-500/10 text-red-600 dark:text-red-400"
                  )}
                >
                  {isCorrect ? "✓ Correct! Well done." : `✗ Not quite. The correct answer is: "${currentQuestion.options[currentQuestion.correctIndex]}"`}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {revealed && (
        <div className="px-4 py-3 border-t border-border bg-card">
          <Button
            className="w-full"
            onClick={handleNext}
            disabled={submitQuiz.isPending}
          >
            {submitQuiz.isPending
              ? <Loader2 className="w-4 h-4 animate-spin mr-2" />
              : currentQ < totalQuestions - 1
                ? <><span>Next Question</span><ChevronRight className="w-4 h-4 ml-2" /></>
                : <><Trophy className="w-4 h-4 mr-2" /><span>See Results</span></>
            }
          </Button>
        </div>
      )}
    </div>
  );
}
