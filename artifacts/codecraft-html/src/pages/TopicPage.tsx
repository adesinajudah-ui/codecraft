import { useState, useEffect } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { flatTopics, getNextTopic, getPrevTopic, courseData } from "@/data/courseData";
import { ChevronLeft, ChevronRight, Play, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";

export default function TopicPage() {
  const [, params] = useRoute("/lesson/:lessonId/topic/:topicId");
  const [, setLocation] = useLocation();
  
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
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Topic {currentIndex + 1} of {totalTopics}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => prevTopic && setLocation(`/lesson/${prevTopic.lessonId}/topic/${prevTopic.topicId}`)}
                disabled={!prevTopic}
                className="p-2 rounded border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="btn-prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => nextTopic && setLocation(`/lesson/${nextTopic.lessonId}/topic/${nextTopic.topicId}`)}
                disabled={!nextTopic}
                className="p-2 rounded border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="btn-next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
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
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
              <button 
                onClick={runCode}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                data-testid="btn-run-code"
              >
                <Play className="w-4 h-4" /> Run Code
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg overflow-hidden bg-[#282c34]">
              <div className="bg-muted px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border">index.html</div>
              <CodeMirror
                value={code}
                height="300px"
                theme={oneDark}
                extensions={[html()]}
                onChange={(val) => setCode(val)}
                className="text-base"
              />
            </div>
            <div className="border border-border rounded-lg overflow-hidden bg-white flex flex-col">
              <div className="bg-muted px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border dark:bg-slate-800">Browser Output</div>
              <iframe 
                srcDoc={output}
                title="output"
                sandbox="allow-scripts"
                className="w-full flex-1 min-h-[300px] bg-white text-black"
              />
            </div>
          </div>
        </section>

        {/* Exercises */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-4">Practice Exercises</h2>
          <div className="grid gap-4">
            {topic.exercises.map((ex, i) => (
              <div key={i} className="bg-card border border-border p-6 rounded-lg space-y-3">
                <h3 className="font-bold text-lg text-primary">{ex.title}</h3>
                <p className="text-muted-foreground">{ex.description}</p>
                <details className="group cursor-pointer">
                  <summary className="text-sm font-medium text-accent-foreground w-fit select-none">Show Hint</summary>
                  <div className="mt-2 p-3 bg-accent/20 rounded text-sm text-foreground border border-accent/30">
                    {ex.hint}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        {topic.quiz && topic.quiz.length > 0 && (
          <section className="space-y-8 bg-muted/30 p-8 rounded-xl border border-border">
            <h2 className="text-2xl font-bold">Knowledge Check</h2>
            <div className="space-y-8">
              {topic.quiz.map((q, qIndex) => (
                <div key={qIndex} className="bg-card p-6 rounded-lg border border-border shadow-sm">
                  <p className="font-semibold text-lg mb-4">{qIndex + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = quizAnswers[qIndex] === optIndex;
                      const isCorrect = optIndex === q.correctIndex;
                      const showResult = quizSubmitted;
                      
                      let btnClass = "w-full text-left p-4 rounded border transition-all ";
                      if (showResult) {
                        if (isCorrect) btnClass += "bg-green-500/20 border-green-500 text-green-700 dark:text-green-400 ";
                        else if (isSelected && !isCorrect) btnClass += "bg-red-500/20 border-red-500 text-red-700 dark:text-red-400 ";
                        else btnClass += "border-border bg-card opacity-50 ";
                      } else {
                        if (isSelected) btnClass += "border-primary bg-primary/10 ";
                        else btnClass += "border-border bg-card hover:bg-muted ";
                      }

                      return (
                        <button
                          key={optIndex}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [qIndex]: optIndex }))}
                          className={btnClass}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt}</span>
                            {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div className="mt-4 p-4 bg-muted rounded-lg text-sm">
                      <span className="font-bold">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-border flex items-center justify-between">
              {quizSubmitted ? (
                <div className="flex items-center gap-6">
                  <div className="text-xl font-bold">
                    Score: {calculateScore()} / {topic.quiz.length}
                  </div>
                  <button 
                    onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                    className="px-6 py-2 bg-secondary text-secondary-foreground font-medium rounded hover:bg-secondary/80 transition-colors"
                  >
                    Retake Quiz
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length !== topic.quiz.length}
                  className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
