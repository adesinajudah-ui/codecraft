import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTheme } from "next-themes";
import { ChevronDown, ChevronRight, BookOpen, Sun, Moon, CheckCircle2, Award, Cpu, ArrowLeft } from "lucide-react";
import { courseData, totalTopicCount } from "@/data/courseData";
import { getCompletedTopicIds } from "@/data/progress";

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

export default function Home() {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(courseData[0].id);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCompleted(getCompletedTopicIds());
  }, []);

  const toggleLesson = (id: string) => {
    setExpandedLesson((prev) => (prev === id ? null : id));
  };

  const completedCount = completed.size;
  const progressPct = totalTopicCount > 0 ? Math.round((completedCount / totalTopicCount) * 100) : 0;
  const allComplete = completedCount === totalTopicCount && totalTopicCount > 0;

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground pb-20">
      <header className="bg-card border-b border-border py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <a
              href="/learn"
              aria-label="Back to course selection"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Courses
            </a>
            <ThemeToggle />
          </div>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Cpu className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Welcome to <span className="text-primary">CodeCraft C</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete, from-scratch course in the C programming language — the language behind operating systems,
              embedded devices, and most other languages you'll ever use. Deep explanations, a live editor, exercises,
              and quizzes for every topic.
            </p>
          </div>

          <div className="mt-8 max-w-md mx-auto bg-muted/40 border border-border rounded-xl p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Your Progress
              </span>
              <span className="text-muted-foreground">
                {completedCount} / {totalTopicCount} topics
              </span>
            </div>
            <div className="h-2 rounded-full bg-border overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progressPct}%` }} />
            </div>
            {allComplete && (
              <Link
                href="/certificate"
                className="mt-3 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                data-testid="link-certificate"
              >
                <Award className="w-4 h-4" /> Claim Your Certificate
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Course Curriculum</h2>
          <span className="text-sm font-medium text-muted-foreground bg-secondary/20 px-3 py-1 rounded-full">
            {courseData.length} Lessons · {totalTopicCount} Topics
          </span>
        </div>

        <div className="space-y-4">
          {courseData.map((lesson, index) => {
            const isExpanded = expandedLesson === lesson.id;
            const lessonCompletedCount = lesson.topics.filter((t) => completed.has(t.id)).length;
            return (
              <div key={lesson.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all duration-200">
                <button
                  onClick={() => toggleLesson(lesson.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-muted/50 transition-colors"
                  data-testid={`button-lesson-${lesson.id}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 pl-4">
                    <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                      {lessonCompletedCount}/{lesson.topics.length}
                    </span>
                    {isExpanded ? <ChevronDown className="w-6 h-6 text-muted-foreground" /> : <ChevronRight className="w-6 h-6 text-muted-foreground" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border bg-muted/20 p-4">
                    <ul className="space-y-2">
                      {lesson.topics.map((topic, topicIndex) => (
                        <li key={topic.id}>
                          <Link
                            href={`/lesson/${lesson.id}/topic/${topic.id}`}
                            className="flex items-center justify-between p-4 rounded-lg hover:bg-card hover:shadow-sm border border-transparent hover:border-border transition-all group"
                            data-testid={`link-topic-${topic.id}`}
                          >
                            <div className="flex items-center gap-3">
                              {completed.has(topic.id) ? (
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                              ) : (
                                <span className="text-muted-foreground font-mono text-sm w-5 text-center shrink-0">
                                  {index + 1}.{topicIndex + 1}
                                </span>
                              )}
                              <span className="font-medium group-hover:text-primary transition-colors">{topic.title}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-muted-foreground hidden sm:inline">{topic.estimatedReadingTime} min</span>
                              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
