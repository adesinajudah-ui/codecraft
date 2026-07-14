import { useState } from 'react';
import { Link } from 'wouter';
import { useTheme } from 'next-themes';
import { ChevronDown, ChevronRight, Sun, Moon, ArrowLeft, BookOpen } from 'lucide-react';
import { lessons } from '../data/courseData';

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

export default function Home() {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(lessons[0].id);

  const toggleLesson = (id: string) => {
    setExpandedLesson((prev) => (prev === id ? null : id));
  };

  const totalTopics = lessons.reduce((sum, l) => sum + l.topics.length, 0);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col max-w-sm mx-auto">
      <div className="h-safe-top" />

      {/* Top navigation bar */}
      <header className="sticky top-0 z-10 bg-card/90 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <a href="/learn" aria-label="Back to course selection" className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </a>
        <span className="font-semibold text-sm tracking-wide">JavaScript Course</span>
        <ThemeToggle />
      </header>

      {/* Hero */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">
              Learn <span className="text-primary">JavaScript</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {lessons.length} lessons &middot; {totalTopics} topics
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Master JavaScript from scratch — live editor, exercises, and quizzes included.
        </p>
      </div>

      {/* Progress bar placeholder */}
      <div className="px-4 mb-4">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-0 bg-primary rounded-full" />
        </div>
        <p className="text-xs text-muted-foreground mt-1">0% complete</p>
      </div>

      {/* Course curriculum */}
      <div className="px-4 pb-8 space-y-3 flex-1">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Curriculum
        </h2>

        {lessons.map((lesson, index) => {
          const isExpanded = expandedLesson === lesson.id;
          return (
            <div
              key={lesson.id}
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleLesson(lesson.id)}
                className="w-full flex items-center justify-between px-4 py-4 active:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm leading-tight">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {lesson.topics.length} topics
                    </p>
                  </div>
                </div>
                <div className="text-muted-foreground ml-2">
                  {isExpanded
                    ? <ChevronDown className="w-4 h-4" />
                    : <ChevronRight className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-border bg-muted/20">
                  {lesson.topics.map((topic, topicIndex) => (
                    <Link
                      key={topic.id}
                      href={`/lesson/${lesson.id}/topic/${topic.id}`}
                      className="flex items-center justify-between px-4 py-3.5 border-b border-border/50 last:border-b-0 active:bg-card transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground font-mono w-8 flex-shrink-0">
                          {index + 1}.{topicIndex + 1}
                        </span>
                        <span className="text-sm font-medium group-active:text-primary transition-colors">
                          {topic.title}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
