import { useState } from "react";
import { ArrowLeft, Search, Users } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

// ── Data ──────────────────────────────────────────────────────────────────────

interface Course {
  title: string;
  slug: string;
  icon_label: string;
  icon_color: string;
  learner_count: string;
  progress_percent: number;
}

interface Category {
  name: string;
  description: string;
  courses: Course[];
}

const CATEGORIES: Category[] = [
  {
    name: "Web & App Development",
    description: "Create websites and apps that bring your ideas to life",
    courses: [
      { title: "Introduction to HTML",             slug: "introduction-to-html",        icon_label: "HTML", icon_color: "#E34C26", learner_count: "941.6K", progress_percent: 0 },
      { title: "Introduction to CSS",              slug: "introduction-to-css",         icon_label: "CSS",  icon_color: "#264DE4", learner_count: "782.3K", progress_percent: 0 },
      { title: "JavaScript Fundamentals",          slug: "javascript-fundamentals",     icon_label: "JS",   icon_color: "#F7DF1E", learner_count: "1.2M",   progress_percent: 0 },
      { title: "Web Development (Combined)",       slug: "web-development-combined",    icon_label: "WD",   icon_color: "#06B6D4", learner_count: "654.1K", progress_percent: 0 },
      { title: "Angular",                          slug: "angular",                     icon_label: "A",    icon_color: "#DD0031", learner_count: "418.9K", progress_percent: 0 },
      { title: "Front-end Frameworks (React/Vue)", slug: "front-end-frameworks",        icon_label: "FE",   icon_color: "#61DAFB", learner_count: "893.5K", progress_percent: 0 },
      { title: "Back-end Basics (Node.js)",        slug: "back-end-basics",             icon_label: "NJ",   icon_color: "#5FA04E", learner_count: "537.2K", progress_percent: 0 },
      { title: "TypeScript for Beginners",         slug: "typescript-for-beginners",    icon_label: "TS",   icon_color: "#3178C6", learner_count: "476.8K", progress_percent: 0 },
    ],
  },
  {
    name: "Advanced Programming",
    description: "Sharpen your skills with algorithms, patterns, and system design",
    courses: [
      { title: "C# Intermediate",     slug: "csharp-intermediate",     icon_label: "C#",   icon_color: "#9333EA", learner_count: "341.2K", progress_percent: 0 },
      { title: "Python Intermediate", slug: "python-intermediate",     icon_label: "PY",   icon_color: "#3572A5", learner_count: "528.7K", progress_percent: 0 },
      { title: "Java Intermediate",   slug: "java-intermediate",       icon_label: "Java", icon_color: "#E76F00", learner_count: "412.4K", progress_percent: 0 },
      { title: "C Programming",       slug: "c-programming",           icon_label: "C",    icon_color: "#00599C", learner_count: "287.9K", progress_percent: 0 },
      { title: "PHP",                 slug: "php",                     icon_label: "PHP",  icon_color: "#4F5B93", learner_count: "319.6K", progress_percent: 0 },
    ],
  },
  {
    name: "Data & AI",
    description: "Explore machine learning, data science, and artificial intelligence",
    courses: [
      { title: "Python for Data Science", slug: "python-data-science",  icon_label: "PY", icon_color: "#3572A5", learner_count: "1.05M",  progress_percent: 0 },
      { title: "Machine Learning Basics", slug: "machine-learning",     icon_label: "ML", icon_color: "#FF6B35", learner_count: "743.9K", progress_percent: 0 },
      { title: "SQL & Databases",         slug: "sql-databases",        icon_label: "SQ", icon_color: "#00758F", learner_count: "568.2K", progress_percent: 0 },
    ],
  },
  {
    name: "Mobile Development",
    description: "Build native and cross-platform mobile apps for iOS and Android",
    courses: [
      { title: "React Native",        slug: "react-native",   icon_label: "RN", icon_color: "#61DAFB", learner_count: "489.3K", progress_percent: 0 },
      { title: "Flutter & Dart",      slug: "flutter-dart",   icon_label: "FL", icon_color: "#54C5F8", learner_count: "372.6K", progress_percent: 0 },
      { title: "Mobile UI/UX Basics", slug: "mobile-uiux",    icon_label: "UX", icon_color: "#A855F7", learner_count: "214.8K", progress_percent: 0 },
    ],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function CourseIcon({ label, color }: { label: string; color: string }) {
  const isDark = isColorDark(color);
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
      style={{ backgroundColor: color }}
    >
      <span className="text-[11px] font-bold tracking-tight" style={{ color: isDark ? "#fff" : "#111" }}>
        {label}
      </span>
    </div>
  );
}

function isColorDark(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-2 mt-2.5">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${Math.max(percent, 0)}%` }} />
      </div>
      <span className="text-xs text-muted-foreground w-7 text-right flex-shrink-0">{percent}%</span>
    </div>
  );
}

function LearnerBadge({ count }: { count: string }) {
  return (
    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary border border-border flex-shrink-0">
      <Users className="w-3 h-3 text-muted-foreground" />
      <span className="text-[11px] font-medium text-muted-foreground">{count}</span>
    </div>
  );
}

function CourseCard({ course, onClick }: { course: Course; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col px-4 py-4 bg-card border border-border rounded-2xl cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all duration-150 active:scale-[0.99]"
    >
      <div className="flex items-center gap-3">
        <CourseIcon label={course.icon_label} color={course.icon_color} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2 flex-1">{course.title}</p>
            <LearnerBadge count={course.learner_count} />
          </div>
          <ProgressBar percent={course.progress_percent} />
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Learn() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const activeCategory = CATEGORIES[activeCategoryIndex];
  const filteredCourses = activeCategory.courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-3 flex-shrink-0">
        <button
          onClick={() => setLocation("/dashboard")}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors flex-shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">All courses</h1>
      </div>

      {/* Search bar */}
      <div className="px-4 pb-4 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex-shrink-0 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-4 pb-4" style={{ width: "max-content" }}>
          {CATEGORIES.map((cat, i) => {
            const isActive = i === activeCategoryIndex;
            return (
              <button
                key={cat.name}
                onClick={() => { setActiveCategoryIndex(i); setSearch(""); }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 border",
                  isActive
                    ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                    : "bg-secondary text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category header */}
      <div className="px-4 pb-4 flex-shrink-0">
        <h2 className="text-lg font-bold text-foreground">{activeCategory.name}</h2>
        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{activeCategory.description}</p>
      </div>

      {/* Course list */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="w-10 h-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">No courses found</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.slug}
                course={course}
                onClick={() => setLocation(`/learn/${course.slug}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
