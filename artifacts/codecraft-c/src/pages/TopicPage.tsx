import { useState, useEffect } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { useTheme } from "next-themes";
import { flatTopics, getNextTopic, getPrevTopic } from "@/data/courseData";
import { isTopicComplete, toggleTopicComplete } from "@/data/progress";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  Sun,
  Moon,
  Clock,
  Lightbulb,
  AlertTriangle,
  ShieldCheck,
  Trophy,
  CheckCircle2,
  Circle,
} from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="p-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
    >
      {theme === "dark" ? <Sun className="w-4 h-4 text-muted-foreground" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
    </button>
  );
}

export default function TopicPage() {
  const [, params] = useRoute("/lesson/:lessonId/topic/:topicId");
  const [, setLocation] = useLocation();
  const { theme } = useTheme();

  const currentTopicFlat = flatTopics.find((t) => t.lessonId === params?.lessonId && t.topicId === params?.topicId);
  const topic = currentTopicFlat?.topic;

  const [code, setCode] = useState(topic?.codeExample || "");
  const [hasRun, setHasRun] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (topic) {
      setCode(topic.codeExample);
      setHasRun(false);
      setQuizAnswers({});
      setQuizSubmitted(false);
      setComplete(isTopicComplete(topic.id));
      window.scrollTo(0, 0);
    }
  }, [topic]);

  if (!topic || !currentTopicFlat) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-background">
        <h1 className="text-2xl font-bold">Topic not found</h1>
        <Link href="/" className="text-primary hover:underline">
          Return to Course Home
        </Link>
      </div>
    );
  }

  const prevTopic = getPrevTopic(currentTopicFlat.lessonId, currentTopicFlat.topicId);
  const nextTopic = getNextTopic(currentTopicFlat.lessonId, currentTopicFlat.topicId);

  const totalTopics = flatTopics.length;
  const currentIndex = flatTopics.findIndex((t) => t.topicId === topic.id && t.lessonId === currentTopicFlat.lessonId);

  const resetCode = () => {
    setCode(topic.codeExample);
    setHasRun(false);
  };

  const calculateScore = () => {
    let correct = 0;
    topic.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.correctIndex) correct++;
    });
    return correct;
  };

  const handleToggleComplete = () => {
    const nowComplete = toggleTopicComplete(topic.id);
    setComplete(nowComplete);
  };

  const goToNext = () => {
    if (nextTopic) setLocation(`/lesson/${nextTopic.lessonId}/topic/${nextTopic.topicId}`);
    else setLocation("/");
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground pb-32">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border py-4 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0 group"
              aria-label="Back to lessons"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back
            </Link>
            <div className="w-px h-6 bg-border shrink-0" />
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground mb-0.5 truncate">{currentTopicFlat.lessonTitle}</div>
              <h1 className="text-base md:text-lg font-bold leading-tight truncate">{topic.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {topic.estimatedReadingTime} min
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {currentIndex + 1} / {totalTopics}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => prevTopic && setLocation(`/lesson/${prevTopic.lessonId}/topic/${prevTopic.topicId}`)}
                disabled={!prevTopic}
                aria-label="Previous topic"
                className="p-2 rounded border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="btn-prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => nextTopic && setLocation(`/lesson/${nextTopic.lessonId}/topic/${nextTopic.topicId}`)}
                disabled={!nextTopic}
                aria-label="Next topic"
                className="p-2 rounded border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="btn-next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-8 space-y-16">
        {/* Mark complete */}
        <button
          onClick={handleToggleComplete}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium text-sm transition-colors ${
            complete
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
          }`}
          data-testid="btn-mark-complete"
        >
          {complete ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
          {complete ? "Marked as Complete" : "Mark as Complete"}
        </button>

        {/* Explanation */}
        <section className="prose dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-foreground border-b border-border pb-4 mb-6">Explanation</h2>
          <div className="text-lg leading-relaxed text-muted-foreground space-y-4">
            {topic.explanation.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Editor Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-bold">Try It Yourself</h2>
            <div className="flex gap-2">
              <button
                onClick={resetCode}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
                data-testid="btn-reset-code"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={() => setHasRun(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                data-testid="btn-run-code"
              >
                <Play className="w-4 h-4" />
                Run Code
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-border">
              <div className="bg-card px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">C Editor</div>
              <CodeMirror
                value={code}
                height="400px"
                extensions={[cpp()]}
                theme={theme === "dark" ? oneDark : "light"}
                onChange={(value) => setCode(value)}
                data-testid="code-editor"
              />
            </div>

            <div className="rounded-xl overflow-hidden border border-border flex flex-col">
              <div className="bg-card px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border flex items-center justify-between">
                <span>Expected Output</span>
                <span className="text-xs opacity-70">(reference — not a live compiler)</span>
              </div>
              <div className="h-[400px] bg-[#1e1e2e] text-[#cdd6f4] font-mono text-sm p-4 overflow-auto whitespace-pre-wrap">
                {hasRun ? topic.expectedOutput : <span className="text-[#6c7086] italic">Click "Run Code" to see what this program prints.</span>}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Since C needs a compiler, this editor doesn't execute code live in the browser — edit freely to experiment with syntax, then compare
            against the expected output shown here (based on the original example). For real compilation, try the same code on a local
            compiler like GCC or an online tool such as Compiler Explorer.
          </p>
        </section>

        {/* Key Takeaways / Mistakes / Best Practices */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-bold flex items-center gap-2 text-primary">
              <Lightbulb className="w-5 h-5" /> Key Takeaways
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              {topic.keyTakeaways.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-bold flex items-center gap-2 text-amber-500">
              <AlertTriangle className="w-5 h-5" /> Common Mistakes
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              {topic.commonMistakes.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-bold flex items-center gap-2 text-green-500">
              <ShieldCheck className="w-5 h-5" /> Best Practices
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              {topic.bestPractices.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Practice Exercises */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-border pb-4">Practice Exercises</h2>
          <div className="grid gap-4">
            {topic.exercises.map((ex, i) => (
              <details key={i} className="bg-card rounded-xl border border-border p-5 group" data-testid={`exercise-${i}`}>
                <summary className="font-semibold cursor-pointer flex items-center justify-between">
                  {ex.title}
                  <span className="text-xs text-muted-foreground group-open:hidden">show hint</span>
                </summary>
                <p className="text-muted-foreground mt-3">{ex.description}</p>
                <p className="text-sm text-primary/80 mt-2 italic">Hint: {ex.hint}</p>
              </details>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-xl p-5 space-y-2">
            <h3 className="font-bold flex items-center gap-2 text-primary">
              <Trophy className="w-5 h-5" /> Challenge Exercise
            </h3>
            <p className="font-semibold">{topic.challenge.title}</p>
            <p className="text-muted-foreground">{topic.challenge.description}</p>
            <details>
              <summary className="text-sm text-primary/80 cursor-pointer mt-1">Need a hint?</summary>
              <p className="text-sm text-muted-foreground mt-1">{topic.challenge.hint}</p>
            </details>
          </div>
        </section>

        {/* Quiz Section */}
        {topic.quiz && topic.quiz.length > 0 && (
          <section className="space-y-6 pb-8">
            <h2 className="text-2xl font-bold border-b border-border pb-4">
              Quiz <span className="text-base font-normal text-muted-foreground">({topic.quiz.length} questions)</span>
            </h2>

            {topic.quiz.map((q, qi) => (
              <div key={qi} className="bg-card rounded-xl border border-border p-6 space-y-4">
                <p className="font-semibold text-lg">
                  {qi + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const isSelected = quizAnswers[qi] === oi;
                    const isCorrect = oi === q.correctIndex;
                    let classes = "w-full text-left p-4 rounded-lg border transition-all ";

                    if (!quizSubmitted) {
                      classes += isSelected ? "border-primary bg-primary/10 text-foreground" : "border-border hover:border-primary/50 hover:bg-muted/50";
                    } else {
                      if (isCorrect) classes += "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
                      else if (isSelected && !isCorrect) classes += "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 line-through";
                      else classes += "border-border text-muted-foreground opacity-60";
                    }

                    return (
                      <button
                        key={oi}
                        onClick={() => !quizSubmitted && setQuizAnswers((prev) => ({ ...prev, [qi]: oi }))}
                        disabled={quizSubmitted}
                        className={classes}
                        data-testid={`quiz-${qi}-option-${oi}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
                          {quizSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <div className="text-sm bg-muted/40 border border-border rounded-lg p-3 text-muted-foreground">
                    <span className="font-semibold text-foreground">Explanation: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}

            {!quizSubmitted ? (
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < topic.quiz.length}
                className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="btn-submit-quiz"
              >
                Submit Quiz
              </button>
            ) : (
              <div className="bg-card rounded-xl border border-border p-6 text-center space-y-4">
                <div className="text-4xl font-bold font-mono text-primary">
                  {calculateScore()} / {topic.quiz.length}
                </div>
                <p className="text-muted-foreground">
                  {calculateScore() === topic.quiz.length
                    ? "Perfect score! 🎉"
                    : calculateScore() >= topic.quiz.length / 2
                    ? "Good job! Keep practicing."
                    : "Keep studying — you'll get it!"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                    data-testid="btn-retake-quiz"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Navigation */}
        <div className="flex justify-between gap-4 border-t border-border pt-8">
          {prevTopic ? (
            <Link
              href={`/lesson/${prevTopic.lessonId}/topic/${prevTopic.topicId}`}
              className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-muted/50 transition-all group"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <div>
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="font-medium text-sm">{prevTopic.topicTitle}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <button
            onClick={goToNext}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all group ml-auto"
            data-testid="btn-next-topic"
          >
            <div className="text-right">
              <div className="text-xs opacity-80">{nextTopic ? "Next" : "Finished!"}</div>
              <div className="font-medium text-sm">{nextTopic ? nextTopic.topicTitle : "Back to Course Home"}</div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
