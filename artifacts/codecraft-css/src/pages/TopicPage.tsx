import { useState, useEffect, useMemo } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { useTheme } from "next-themes";
import { flatTopics, getNextTopic, getPrevTopic } from "@/data/courseData";
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
  Lightbulb,
} from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";

type EditorTab = "html" | "css" | "preview";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="p-2 rounded-full hover:bg-muted transition-colors"
    >
      {theme === "dark"
        ? <Sun className="w-5 h-5 text-muted-foreground" />
        : <Moon className="w-5 h-5 text-muted-foreground" />}
    </button>
  );
}

function buildPreviewDoc(htmlCode: string, cssCode: string) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>${cssCode}</style>
  </head>
  <body>
    ${htmlCode}
  </body>
</html>`;
}

export default function TopicPage() {
  const [, params] = useRoute("/lesson/:lessonId/topic/:topicId");
  const [, setLocation] = useLocation();
  const { theme } = useTheme();

  const currentTopicFlat = flatTopics.find(
    (t) => t.lessonId === params?.lessonId && t.topicId === params?.topicId,
  );
  const topic = currentTopicFlat?.topic;

  const [htmlCode, setHtmlCode] = useState(topic?.htmlExample || "");
  const [cssCode, setCssCode] = useState(topic?.cssExample || "");
  const [output, setOutput] = useState("");
  const [editorTab, setEditorTab] = useState<EditorTab>("html");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    if (topic) {
      setHtmlCode(topic.htmlExample);
      setCssCode(topic.cssExample);
      setOutput(buildPreviewDoc(topic.htmlExample, topic.cssExample));
      setQuizAnswers({});
      setQuizSubmitted(false);
      setEditorTab("html");
      window.scrollTo(0, 0);
    }
  }, [topic]);

  const cmTheme = useMemo(() => (theme === "dark" ? oneDark : "light"), [theme]);

  if (!topic || !currentTopicFlat) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-background px-6 text-center">
        <h1 className="text-xl font-bold">Topic not found</h1>
        <Link href="/" className="text-primary hover:underline text-sm">Return to Course Home</Link>
      </div>
    );
  }

  const prevTopic = getPrevTopic(currentTopicFlat.lessonId, currentTopicFlat.topicId);
  const nextTopic = getNextTopic(currentTopicFlat.lessonId, currentTopicFlat.topicId);

  const totalTopics = flatTopics.length;
  const currentIndex = flatTopics.findIndex((t) => t.topicId === topic.id);
  const progress = Math.round(((currentIndex + 1) / totalTopics) * 100);

  const runCode = () => {
    setOutput(buildPreviewDoc(htmlCode, cssCode));
    setEditorTab("preview");
  };

  const resetCode = () => {
    setHtmlCode(topic.htmlExample);
    setCssCode(topic.cssExample);
    setOutput(buildPreviewDoc(topic.htmlExample, topic.cssExample));
  };

  const calculateScore = () => {
    let correct = 0;
    topic.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.correctIndex) correct++;
    });
    return correct;
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col max-w-sm mx-auto">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-card/90 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Back to lessons"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">
              {currentIndex + 1}/{totalTopics}
            </span>
            <button
              onClick={() => prevTopic && setLocation(`/lesson/${prevTopic.lessonId}/topic/${prevTopic.topicId}`)}
              disabled={!prevTopic}
              aria-label="Previous topic"
              className="p-2 rounded-full hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              data-testid="btn-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => nextTopic && setLocation(`/lesson/${nextTopic.lessonId}/topic/${nextTopic.topicId}`)}
              disabled={!nextTopic}
              aria-label="Next topic"
              className="p-2 rounded-full hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              data-testid="btn-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <ThemeToggle />
          </div>
        </div>

        <div className="px-1">
          <p className="text-xs text-muted-foreground truncate">{currentTopicFlat.lessonTitle}</p>
          <h1 className="text-sm font-bold leading-tight truncate">{topic.title}</h1>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="flex-1 px-4 pt-5 pb-28 space-y-8">
        {/* Explanation */}
        <section>
          <h2 className="text-base font-bold mb-3 text-foreground">Explanation</h2>
          <div className="text-sm leading-relaxed text-muted-foreground space-y-3">
            {topic.explanation.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>

        {/* Editor Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold">Try It Yourself</h2>
            <div className="flex gap-2">
              <button
                onClick={resetCode}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-lg active:bg-secondary/70 transition-colors"
                data-testid="btn-reset-code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button
                onClick={runCode}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg active:bg-primary/80 transition-colors"
                data-testid="btn-run-code"
              >
                <Play className="w-3.5 h-3.5" />
                Run
              </button>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-muted rounded-xl p-1 mb-3 gap-1">
            {(["html", "css", "preview"] as EditorTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setEditorTab(tab)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize ${
                  editorTab === tab
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden border border-border">
            {editorTab === "html" && (
              <CodeMirror
                value={htmlCode}
                height="280px"
                extensions={[html()]}
                theme={cmTheme}
                onChange={(value) => setHtmlCode(value)}
                data-testid="code-editor-html"
              />
            )}
            {editorTab === "css" && (
              <CodeMirror
                value={cssCode}
                height="280px"
                extensions={[css()]}
                theme={cmTheme}
                onChange={(value) => setCssCode(value)}
                data-testid="code-editor-css"
              />
            )}
            {editorTab === "preview" && (
              <iframe
                srcDoc={output}
                title="Live Preview"
                className="w-full h-[280px] bg-white"
                sandbox="allow-scripts"
                data-testid="preview-iframe"
              />
            )}
          </div>
        </section>

        {/* Practice Exercises */}
        {topic.exercises && topic.exercises.length > 0 && (
          <section>
            <h2 className="text-base font-bold mb-3">Practice Exercises</h2>
            <div className="space-y-3">
              {topic.exercises.map((exercise, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-4 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <Lightbulb className="w-4 h-4 flex-shrink-0" />
                    {exercise.title}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{exercise.description}</p>
                  <details className="text-xs">
                    <summary className="cursor-pointer font-medium text-primary select-none">Show hint</summary>
                    <p className="mt-2 text-muted-foreground">{exercise.hint}</p>
                  </details>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quiz Section */}
        {topic.quiz && topic.quiz.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-base font-bold">Quiz</h2>

            {topic.quiz.map((q, qi) => (
              <div key={qi} className="bg-card rounded-2xl border border-border p-4 space-y-3">
                <p className="font-semibold text-sm">{qi + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const isSelected = quizAnswers[qi] === oi;
                    const isCorrect = oi === q.correctIndex;
                    let classes = "w-full text-left p-3.5 rounded-xl border text-sm transition-all ";

                    if (!quizSubmitted) {
                      classes += isSelected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border active:border-primary/50 active:bg-muted/50";
                    } else {
                      if (isCorrect) classes += "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
                      else if (isSelected && !isCorrect) classes += "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 line-through";
                      else classes += "border-border text-muted-foreground opacity-50";
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
                          {quizSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                          {quizSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <p className="text-xs text-muted-foreground bg-muted/40 rounded-xl p-3 leading-relaxed">
                    <span className="font-semibold text-foreground">Explanation: </span>
                    {q.explanation}
                  </p>
                )}
              </div>
            ))}

            {!quizSubmitted ? (
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < topic.quiz.length}
                className="w-full py-3.5 px-6 bg-primary text-primary-foreground rounded-2xl font-semibold text-sm active:bg-primary/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                data-testid="btn-submit-quiz"
              >
                Submit Quiz
              </button>
            ) : (
              <div className="bg-card rounded-2xl border border-border p-6 text-center space-y-3">
                <div className="text-5xl font-bold font-mono text-primary">
                  {calculateScore()}<span className="text-2xl text-muted-foreground">/{topic.quiz.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {calculateScore() === topic.quiz.length
                    ? "Perfect score! 🎉"
                    : calculateScore() >= topic.quiz.length / 2
                    ? "Good job! Keep practicing."
                    : "Keep studying — you'll get it!"}
                </p>
                <button
                  onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}
                  className="px-6 py-2.5 border border-border rounded-xl active:bg-muted transition-colors text-sm font-medium"
                  data-testid="btn-retake-quiz"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Floating bottom navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 pb-6 pt-3 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
        <div className="flex gap-3 pointer-events-auto">
          {prevTopic ? (
            <Link
              href={`/lesson/${prevTopic.lessonId}/topic/${prevTopic.topicId}`}
              className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-2xl active:bg-muted transition-all flex-1"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="overflow-hidden">
                <div className="text-[10px] text-muted-foreground">Previous</div>
                <div className="font-medium text-xs truncate">{prevTopic.topicTitle}</div>
              </div>
            </Link>
          ) : <div className="flex-1" />}

          {nextTopic ? (
            <Link
              href={`/lesson/${nextTopic.lessonId}/topic/${nextTopic.topicId}`}
              className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-2xl active:bg-primary/80 transition-all flex-1 justify-end"
            >
              <div className="overflow-hidden text-right">
                <div className="text-[10px] opacity-75">Next</div>
                <div className="font-medium text-xs truncate">{nextTopic.topicTitle}</div>
              </div>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-2xl active:bg-primary/80 transition-all flex-1"
            >
              <span className="font-medium text-sm">Finish Course</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
