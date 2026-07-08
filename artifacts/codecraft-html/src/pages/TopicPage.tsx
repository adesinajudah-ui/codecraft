import { useState, useEffect } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { useTheme } from "next-themes";
import { flatTopics, getNextTopic, getPrevTopic, courseData } from "@/data/courseData";
import { ChevronLeft, ChevronRight, Play, RotateCcw, CheckCircle, XCircle, Sun, Moon } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="p-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
    >
      {theme === "dark"
        ? <Sun className="w-4 h-4 text-muted-foreground" />
        : <Moon className="w-4 h-4 text-muted-foreground" />}
    </button>
  );
}

export default function TopicPage() {
  const [, params] = useRoute("/lesson/:lessonId/topic/:topicId");
  const [, setLocation] = useLocation();
  const { theme } = useTheme();
  
  const currentTopicFlat = flatTopics.find(t => t.lessonId === params?.lessonId && t.topicId === params?.topicId);
  const topic = currentTopicFlat?.topic;
  
  const [code, setCode] = useState(topic?.codeExample || "");
  const [output, setOutput] = useState("");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    if (topic) {
      setCode(topic.codeExample);
      setOutput(topic.codeExample);
      setQuizAnswers({});
      setQuizSubmitted(false);
      window.scrollTo(0, 0);
    }
  }, [topic]);

  if (!topic || !currentTopicFlat) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-background">
        <h1 className="text-2xl font-bold">Topic not found</h1>
        <Link href="/" className="text-primary hover:underline">Return to Course Home</Link>
      </div>
    );
  }

  const prevTopic = getPrevTopic(currentTopicFlat.lessonId, currentTopicFlat.topicId);
  const nextTopic = getNextTopic(currentTopicFlat.lessonId, currentTopicFlat.topicId);
  
  const totalTopics = flatTopics.length;
  const currentIndex = flatTopics.findIndex(t => t.topicId === topic.id);

  const runCode = () => {
    setOutput(code);
  };

  const resetCode = () => {
    setCode(topic.codeExample);
    setOutput(topic.codeExample);
  };

  const calculateScore = () => {
    let correct = 0;
    topic.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.correctIndex) correct++;
    });
    return correct;
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground pb-32">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border py-4 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
              <Link href="/" className="hover:text-foreground transition-colors">Courses</Link>
              <ChevronRight className="w-3 h-3" />
              <span>{currentTopicFlat.lessonTitle}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold">{topic.title}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              Topic {currentIndex + 1} of {totalTopics}
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
        {/* Explanation */}
        <section className="prose dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-foreground border-b border-border pb-4 mb-6">Explanation</h2>
          <div className="text-lg leading-relaxed text-muted-foreground space-y-4">
            {topic.explanation.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
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
                onClick={runCode}
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
              <div className="bg-card px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">
                HTML Editor
              </div>
              <CodeMirror
                value={code}
                height="400px"
                extensions={[html()]}
                theme={theme === "dark" ? oneDark : "light"}
                onChange={(value) => setCode(value)}
                data-testid="code-editor"
              />
            </div>

            <div className="rounded-xl overflow-hidden border border-border">
              <div className="bg-card px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">
                Preview
              </div>
              <iframe
                srcDoc={output}
                title="HTML Preview"
                className="w-full h-[400px] bg-white"
                sandbox="allow-scripts"
                data-testid="preview-iframe"
              />
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        {topic.quiz && topic.quiz.length > 0 && (
          <section className="space-y-6 pb-8">
            <h2 className="text-2xl font-bold border-b border-border pb-4">Quiz</h2>

            {topic.quiz.map((q, qi) => (
              <div key={qi} className="bg-card rounded-xl border border-border p-6 space-y-4">
                <p className="font-semibold text-lg">{qi + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const isSelected = quizAnswers[qi] === oi;
                    const isCorrect = oi === q.correctIndex;
                    let classes = "w-full text-left p-4 rounded-lg border transition-all ";

                    if (!quizSubmitted) {
                      classes += isSelected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border hover:border-primary/50 hover:bg-muted/50";
                    } else {
                      if (isCorrect) classes += "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
                      else if (isSelected && !isCorrect) classes += "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 line-through";
                      else classes += "border-border text-muted-foreground opacity-60";
                    }

                    return (
                      <button
                        key={oi}
                        onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
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
                <button
                  onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}
                  className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                  data-testid="btn-retake-quiz"
                >
                  Retake Quiz
                </button>
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
          ) : <div />}

          {nextTopic ? (
            <Link
              href={`/lesson/${nextTopic.lessonId}/topic/${nextTopic.topicId}`}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all group ml-auto"
            >
              <div className="text-right">
                <div className="text-xs opacity-80">Next</div>
                <div className="font-medium text-sm">{nextTopic.topicTitle}</div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all ml-auto"
            >
              <span className="font-medium">Back to Course Home</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
