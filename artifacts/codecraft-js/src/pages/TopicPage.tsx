import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from 'next-themes';
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
} from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { lessons } from '../data/courseData';
import type { Topic, Lesson, QuizQuestion } from '../data/types';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="p-2 rounded-full hover:bg-muted transition-colors"
    >
      {theme === 'dark'
        ? <Sun className="w-5 h-5 text-muted-foreground" />
        : <Moon className="w-5 h-5 text-muted-foreground" />}
    </button>
  );
}

function buildPreviewDoc(jsCode: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 13px;
      background: #1e1e2e;
      color: #cdd6f4;
      padding: 12px 14px;
      min-height: 100vh;
    }
    .line { padding: 2px 0; white-space: pre-wrap; word-break: break-all; line-height: 1.6; }
    .line-error { color: #f38ba8; }
    .line-warn { color: #f9e2af; }
    .line-info { color: #89dceb; }
    .empty { color: #6c7086; font-style: italic; padding: 20px 0; }
  </style>
</head>
<body>
  <div id="out"></div>
  <script>
    const out = document.getElementById('out');
    let hasOutput = false;
    function addLine(text, cls) {
      hasOutput = true;
      const d = document.createElement('div');
      d.className = 'line' + (cls ? ' line-' + cls : '');
      d.textContent = text;
      out.appendChild(d);
    }
    function fmt(v) {
      if (v === null) return 'null';
      if (v === undefined) return 'undefined';
      if (typeof v === 'object') { try { return JSON.stringify(v, null, 2); } catch { return String(v); } }
      return String(v);
    }
    console.log = (...args) => addLine(args.map(fmt).join(' '));
    console.error = (...args) => addLine(args.map(fmt).join(' '), 'error');
    console.warn = (...args) => addLine(args.map(fmt).join(' '), 'warn');
    console.info = (...args) => addLine(args.map(fmt).join(' '), 'info');
    window.onerror = (msg, src, line, col, err) => {
      addLine((err ? err.name + ': ' : '') + msg, 'error');
      return true;
    };
    window.addEventListener('unhandledrejection', e => {
      addLine('Unhandled rejection: ' + (e.reason?.message || e.reason), 'error');
    });
    try {
${jsCode.split('\n').map(l => '      ' + l).join('\n')}
    } catch(e) {
      addLine(e.name + ': ' + e.message, 'error');
    }
    if (!hasOutput) {
      const d = document.createElement('div');
      d.className = 'empty';
      d.textContent = '(no output — add console.log() calls to see results)';
      out.appendChild(d);
    }
  </script>
</body>
</html>`;
}

// Build a flat list for prev/next navigation across lessons
const flatTopics: { lessonId: string; lessonTitle: string; topicId: string; topicTitle: string }[] = [];
for (const lesson of lessons) {
  for (const topic of lesson.topics) {
    flatTopics.push({
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      topicId: topic.id,
      topicTitle: topic.title,
    });
  }
}

function getPrevTopic(lessonId: string, topicId: string) {
  const idx = flatTopics.findIndex(t => t.lessonId === lessonId && t.topicId === topicId);
  return idx > 0 ? flatTopics[idx - 1] : null;
}

function getNextTopic(lessonId: string, topicId: string) {
  const idx = flatTopics.findIndex(t => t.lessonId === lessonId && t.topicId === topicId);
  return idx !== -1 && idx < flatTopics.length - 1 ? flatTopics[idx + 1] : null;
}

interface TopicPageProps {
  lessonId: string;
  topicId: string;
}

export default function TopicPage({ lessonId, topicId }: TopicPageProps) {
  const [, setLocation] = useLocation();
  const { theme } = useTheme();

  const lesson = lessons.find(l => l.id === lessonId) as Lesson | undefined;
  const topic = lesson?.topics.find(t => t.id === topicId) as Topic | undefined;

  const [code, setCode] = useState(topic?.jsExample ?? '');
  const [output, setOutput] = useState('');
  const [editorTab, setEditorTab] = useState<'editor' | 'output'>('editor');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    if (topic) {
      setCode(topic.jsExample);
      setOutput('');
      setQuizAnswers({});
      setQuizSubmitted(false);
      setEditorTab('editor');
      window.scrollTo(0, 0);
    }
  }, [topic]);

  const cmTheme = useMemo(() => (theme === 'dark' ? oneDark : 'light'), [theme]);

  if (!lesson || !topic) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-background px-6 text-center">
        <h1 className="text-xl font-bold">Topic not found</h1>
        <Link href="/" className="text-primary hover:underline text-sm">Return to Course Home</Link>
      </div>
    );
  }

  const prevTopic = getPrevTopic(lessonId, topicId);
  const nextTopic = getNextTopic(lessonId, topicId);
  const currentIndex = flatTopics.findIndex(t => t.lessonId === lessonId && t.topicId === topicId);
  const progress = Math.round(((currentIndex + 1) / flatTopics.length) * 100);

  const runCode = () => {
    setOutput(buildPreviewDoc(code));
    setEditorTab('output');
  };

  const resetCode = () => {
    setCode(topic.jsExample);
    setOutput('');
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
              {currentIndex + 1}/{flatTopics.length}
            </span>
            <button
              onClick={() => prevTopic && setLocation(`/lesson/${prevTopic.lessonId}/topic/${prevTopic.topicId}`)}
              disabled={!prevTopic}
              aria-label="Previous topic"
              className="p-2 rounded-full hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => nextTopic && setLocation(`/lesson/${nextTopic.lessonId}/topic/${nextTopic.topicId}`)}
              disabled={!nextTopic}
              aria-label="Next topic"
              className="p-2 rounded-full hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <ThemeToggle />
          </div>
        </div>

        <div className="px-1">
          <p className="text-xs text-muted-foreground truncate">{lesson.title}</p>
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
            {topic.explanation.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
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
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button
                onClick={runCode}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg active:bg-primary/80 transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                Run
              </button>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-muted rounded-xl p-1 mb-3 gap-1">
            {(['editor', 'output'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setEditorTab(tab)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize ${
                  editorTab === tab
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'editor' ? 'JavaScript' : 'Output'}
              </button>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden border border-border">
            {editorTab === 'editor' && (
              <CodeMirror
                value={code}
                height="280px"
                extensions={[javascript()]}
                theme={cmTheme}
                onChange={(value) => setCode(value)}
              />
            )}
            {editorTab === 'output' && (
              output ? (
                <iframe
                  srcDoc={output}
                  title="JS Output"
                  className="w-full h-[280px] bg-[#1e1e2e]"
                  sandbox="allow-scripts"
                />
              ) : (
                <div className="h-[280px] flex flex-col items-center justify-center bg-[#1e1e2e] gap-2">
                  <p className="text-sm text-[#6c7086]">No output yet</p>
                  <button
                    onClick={runCode}
                    className="text-xs text-[#89dceb] font-medium"
                  >
                    Run code →
                  </button>
                </div>
              )
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
                    let classes = 'w-full text-left p-3.5 rounded-xl border text-sm transition-all ';

                    if (!quizSubmitted) {
                      classes += isSelected
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border active:border-primary/50 active:bg-muted/50';
                    } else {
                      if (isCorrect) classes += 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400';
                      else if (isSelected && !isCorrect) classes += 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 line-through';
                      else classes += 'border-border text-muted-foreground opacity-50';
                    }

                    return (
                      <button
                        key={oi}
                        onClick={() => !quizSubmitted && setQuizAnswers((prev) => ({ ...prev, [qi]: oi }))}
                        disabled={quizSubmitted}
                        className={classes}
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
                    ? 'Perfect score! 🎉'
                    : calculateScore() >= topic.quiz.length / 2
                    ? 'Good job! Keep practicing.'
                    : 'Keep studying — you\'ll get it!'}
                </p>
                <button
                  onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}
                  className="px-6 py-2.5 border border-border rounded-xl active:bg-muted transition-colors text-sm font-medium"
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
