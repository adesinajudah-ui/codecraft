import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { courseData } from "@/data/courseData";

export default function Home() {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(courseData[0].id);

  const toggleLesson = (id: string) => {
    setExpandedLesson(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground pb-20">
      <header className="bg-card border-b border-border py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Welcome to <span className="text-primary">CodeCraft</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            The premium interactive coding bootcamp for absolute beginners. Learn HTML from scratch with deep explanations, interactive editors, and comprehensive quizzes.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Course Curriculum</h2>
          <span className="text-sm font-medium text-muted-foreground bg-secondary/20 px-3 py-1 rounded-full">
            {courseData.length} Lessons
          </span>
        </div>

        <div className="space-y-4">
          {courseData.map((lesson, index) => {
            const isExpanded = expandedLesson === lesson.id;
            return (
              <div 
                key={lesson.id} 
                className="bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleLesson(lesson.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-muted/50 transition-colors"
                  data-testid={`button-lesson-${lesson.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-left">{lesson.title}</h3>
                  </div>
                  <div className="text-muted-foreground">
                    {isExpanded ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
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
                              <span className="text-muted-foreground font-mono text-sm w-6">
                                {index + 1}.{topicIndex + 1}
                              </span>
                              <span className="font-medium group-hover:text-primary transition-colors">
                                {topic.title}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
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
