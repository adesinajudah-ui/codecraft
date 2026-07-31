import { useState, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, ChevronDown, Bell, MoreVertical,
  Play, Lock, Zap, Award, ChevronRight,
  BookOpen, Bot, Flame, CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

interface TrackCourse {
  title: string;
  slug: string;
  icon_label: string;
  icon_color: string;
}

type LessonType = "lesson" | "booster" | "practice";
type LessonStatus = "completed" | "unlocked" | "locked";

interface Lesson {
  title: string;
  type: LessonType;
  xp: number;
  status: LessonStatus;
}

interface Module {
  title: string;
  locked: boolean;
  lessons: Lesson[];
}

interface CourseData {
  title: string;
  category: string;
  progress_percent: number;
  modules: Module[];
  certificate_unlocked: boolean;
}

// ── Static data ───────────────────────────────────────────────────────────────

const WEB_DEV_TRACK: TrackCourse[] = [
  { title: "Introduction to HTML",        slug: "introduction-to-html",     icon_label: "HTML", icon_color: "#E34C26" },
  { title: "Introduction to CSS",         slug: "introduction-to-css",      icon_label: "CSS",  icon_color: "#264DE4" },
  { title: "JavaScript Fundamentals",     slug: "javascript-fundamentals",  icon_label: "JS",   icon_color: "#F7DF1E" },
  { title: "Web Development (Combined)",  slug: "web-development-combined", icon_label: "WD",   icon_color: "#06B6D4" },
  { title: "Angular",                     slug: "angular",                  icon_label: "A",    icon_color: "#DD0031" },
  { title: "Front-end Frameworks",        slug: "front-end-frameworks",     icon_label: "FE",   icon_color: "#61DAFB" },
  { title: "Back-end Basics",             slug: "back-end-basics",          icon_label: "NJ",   icon_color: "#5FA04E" },
  { title: "TypeScript for Beginners",    slug: "typescript-for-beginners", icon_label: "TS",   icon_color: "#3178C6" },
];

// Base course data — lessons use initial statuses (deep-cloned on mount into state)
const COURSE_DATA_INITIAL: Record<string, CourseData> = {
  "introduction-to-html": {
    title: "Introduction to HTML",
    category: "Web Development",
    progress_percent: 0,
    modules: [
      {
        title: "Getting Started with HTML",
        locked: false,
        lessons: [
          { title: "The Core Web Technology", type: "lesson",   xp: 10, status: "unlocked" },
          { title: "HTML Code",               type: "lesson",   xp: 10, status: "locked"   },
          { title: "AI-generated practice",   type: "booster",  xp: 20, status: "locked"   },
          { title: "Headings",                type: "lesson",   xp: 10, status: "locked"   },
          { title: "Images",                  type: "lesson",   xp: 10, status: "locked"   },
        ],
      },
      {
        title: "Going Deeper with HTML",
        locked: true,
        lessons: [
          { title: "Paragraphs & Text",       type: "lesson",   xp: 10, status: "locked"   },
          { title: "Links",                   type: "lesson",   xp: 10, status: "locked"   },
          { title: "AI-generated practice",   type: "booster",  xp: 20, status: "locked"   },
          { title: "Lists",                   type: "lesson",   xp: 10, status: "locked"   },
          { title: "Tables",                  type: "lesson",   xp: 15, status: "locked"   },
        ],
      },
      {
        title: "Using Attributes",
        locked: true,
        lessons: [
          { title: "What are Attributes?",    type: "lesson",   xp: 10, status: "locked"   },
          { title: "Global Attributes",       type: "lesson",   xp: 10, status: "locked"   },
          { title: "AI-generated practice",   type: "booster",  xp: 20, status: "locked"   },
          { title: "Forms & Inputs",          type: "lesson",   xp: 10, status: "locked"   },
        ],
      },
      {
        title: "Mastering HTML",
        locked: true,
        lessons: [
          { title: "Semantic HTML",           type: "lesson",   xp: 10, status: "locked"   },
          { title: "Accessibility Basics",    type: "lesson",   xp: 10, status: "locked"   },
          { title: "AI-generated practice",   type: "booster",  xp: 20, status: "locked"   },
          { title: "Final Project",           type: "lesson",   xp: 25, status: "locked"   },
        ],
      },
    ],
    certificate_unlocked: false,
  },
};

// Only "introduction-to-html" has full content; all other slugs are intentionally blank.

// ── Helpers ───────────────────────────────────────────────────────────────────

function isColorDark(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function CourseIcon({ label, color, size = "md" }: { label: string; color: string; size?: "sm" | "md" }) {
  const dark = isColorDark(color);
  const dim = size === "sm" ? "w-10 h-10 text-[10px]" : "w-12 h-12 text-[11px]";
  return (
    <div className={cn("rounded-full flex items-center justify-center flex-shrink-0 shadow-sm font-bold tracking-tight", dim)} style={{ backgroundColor: color }}>
      <span style={{ color: dark ? "#fff" : "#111" }}>{label}</span>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function LessonIcon({ type, status }: { type: LessonType; status: LessonStatus }) {
  const locked = status === "locked";
  if (locked) {
    return (
      <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <Lock className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
    );
  }
  if (type === "practice" || type === "booster") {
    return (
      <div className="w-9 h-9 rounded-full bg-orange-500/15 flex items-center justify-center flex-shrink-0">
        {type === "booster"
          ? <Flame className="w-4 h-4 text-orange-500" />
          : <Bot className="w-4 h-4 text-violet-500" />}
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
      <BookOpen className="w-4 h-4 text-primary" />
    </div>
  );
}

interface LessonCardProps {
  lesson: Lesson;
  onComplete: () => void;
}

function LessonCard({ lesson, onComplete }: LessonCardProps) {
  const isLocked    = lesson.status === "locked";
  const isCompleted = lesson.status === "completed";
  const isUnlocked  = lesson.status === "unlocked";

  return (
    <div
      className={cn(
        "rounded-xl border transition-colors",
        isLocked    && "bg-muted/30 border-border opacity-50",
        isCompleted && "bg-card border-emerald-500/30",
        isUnlocked  && "bg-card border-border hover:border-primary/30",
        !isLocked   && "cursor-pointer"
      )}
    >
      {/* Top row: icon · title+xp · status badge */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-2">
        <LessonIcon type={lesson.type} status={lesson.status} />

        <div className="flex-1 min-w-0">
          <p className={cn(
            "text-sm font-semibold leading-snug truncate",
            isLocked    ? "text-muted-foreground" : "text-foreground"
          )}>
            {lesson.title}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <Zap className={cn("w-3 h-3", isLocked ? "text-muted-foreground" : "text-yellow-500")} />
            <span className={cn("text-xs", isLocked ? "text-muted-foreground" : "text-muted-foreground")}>
              +{lesson.xp} XP
            </span>
            <span className="text-xs text-muted-foreground ml-1 capitalize">
              · {lesson.type}
            </span>
          </div>
        </div>

        {/* Status badge — top-right */}
        {isLocked    && <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
        {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
      </div>

      {/* LEARN button — full-width, shown only when unlocked */}
      {isUnlocked && (
        <div className="px-4 pb-3">
          <button
            onClick={onComplete}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold tracking-widest transition-colors"
          >
            LEARN
          </button>
        </div>
      )}
    </div>
  );
}

interface ModuleAccordionProps {
  module: Module;
  defaultOpen?: boolean;
  onLessonComplete: (lessonIdx: number) => void;
}

function ModuleAccordion({ module, defaultOpen = false, onLessonComplete }: ModuleAccordionProps) {
  const [open, setOpen] = useState(defaultOpen && !module.locked);

  const completedCount = module.lessons.filter((l) => l.status === "completed").length;

  return (
    <div className={cn("rounded-2xl border overflow-hidden", module.locked ? "border-border" : "border-primary/30")}>
      {/* Module header */}
      <button
        onClick={() => { if (!module.locked) setOpen((o) => !o); }}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-4 text-left transition-colors",
          module.locked ? "cursor-default" : "hover:bg-secondary/50 cursor-pointer"
        )}
      >
        <div className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
          module.locked ? "bg-muted" : "bg-emerald-500/15"
        )}>
          {module.locked
            ? <Lock className="w-4 h-4 text-muted-foreground" />
            : <Play className="w-4 h-4 text-emerald-500 fill-emerald-500" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-semibold", module.locked ? "text-muted-foreground" : "text-foreground")}>
            {module.title}
          </p>
          {!module.locked && module.lessons.length > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {completedCount}/{module.lessons.length} completed
            </p>
          )}
          {module.locked && (
            <p className="text-xs text-muted-foreground mt-0.5">Complete previous module to unlock</p>
          )}
        </div>
        {!module.locked && (
          <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0", open && "rotate-180")} />
        )}
      </button>

      {/* Lessons */}
      <AnimatePresence initial={false}>
        {open && module.lessons.length > 0 && (
          <motion.div
            key="lessons"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 flex flex-col gap-2">
              {module.lessons.map((lesson, idx) => (
                <LessonCard
                  key={`${lesson.title}-${idx}`}
                  lesson={lesson}
                  onComplete={() => onLessonComplete(idx)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CertificateTeaser() {
  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-5 flex items-center gap-4 opacity-75">
      <div className="w-14 h-14 rounded-xl bg-yellow-500/15 flex items-center justify-center flex-shrink-0">
        <Award className="w-7 h-7 text-yellow-500/60" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground">Your Certificate is close</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          You are doing great! Keep learning to unlock your certificate!
        </p>
      </div>
    </div>
  );
}

function TrackCarousel({ currentSlug, onSelect }: { currentSlug: string; onSelect: (slug: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={scrollRef}
      className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {WEB_DEV_TRACK.map((course) => {
        const isActive = course.slug === currentSlug;
        const dark = isColorDark(course.icon_color);
        return (
          <button
            key={course.slug}
            onClick={() => onSelect(course.slug)}
            style={{ scrollSnapAlign: "start" }}
            className={cn(
              "flex flex-col items-center gap-2 flex-shrink-0 w-20 p-2 rounded-xl transition-all duration-150",
              isActive ? "bg-primary/10 ring-1 ring-primary/30" : "hover:bg-secondary"
            )}
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm text-[10px] font-bold" style={{ backgroundColor: course.icon_color }}>
              <span style={{ color: dark ? "#fff" : "#111" }}>{course.icon_label}</span>
            </div>
            <span className="text-[10px] font-medium text-center leading-tight line-clamp-2 text-foreground w-full">
              {course.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Progression logic ─────────────────────────────────────────────────────────

/**
 * Immutably completes lesson at (modIdx, lessonIdx) and unlocks the next one.
 * If the lesson was the last in its module, unlocks the next module and its first lesson.
 */
function applyLessonComplete(modules: Module[], modIdx: number, lessonIdx: number): Module[] {
  const next = deepClone(modules);
  const mod = next[modIdx];

  // Mark this lesson completed
  mod.lessons[lessonIdx].status = "completed";

  const nextLessonIdx = lessonIdx + 1;
  if (nextLessonIdx < mod.lessons.length) {
    // Unlock next lesson within same module
    mod.lessons[nextLessonIdx].status = "unlocked";
  } else {
    // This was the last lesson — unlock next module
    const nextModIdx = modIdx + 1;
    if (nextModIdx < next.length) {
      next[nextModIdx].locked = false;
      if (next[nextModIdx].lessons.length > 0) {
        next[nextModIdx].lessons[0].status = "unlocked";
      }
    }
  }

  return next;
}

/** Recompute overall progress as % of all lessons completed across all modules */
function computeProgress(modules: Module[]): number {
  let total = 0;
  let done = 0;
  for (const mod of modules) {
    total += mod.lessons.length;
    done  += mod.lessons.filter((l) => l.status === "completed").length;
  }
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const [, setLocation] = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const slug = courseId ?? "";
  const initialData = COURSE_DATA_INITIAL[slug];

  // Stateful modules — deep-cloned from initial data once per slug
  const [modules, setModules] = useState<Module[]>(() =>
    initialData ? deepClone(initialData.modules) : []
  );

  // Only Introduction to HTML has content — all other courses are blank for now
  if (!initialData) return null;

  const trackCourse = WEB_DEV_TRACK.find((t) => t.slug === slug);
  const iconColor = trackCourse?.icon_color ?? "#E34C26";
  const iconLabel = trackCourse?.icon_label ?? "?";
  const progress   = computeProgress(modules);

  function handleLessonComplete(modIdx: number, lessonIdx: number) {
    setModules((prev) => applyLessonComplete(prev, modIdx, lessonIdx));
  }

  return (
    <div className="flex flex-col min-h-full">

      {/* ── Sticky page header ── */}
      <div className="sticky top-0 z-20 bg-card/95 backdrop-blur-sm border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2 px-3 py-3">
          <button
            onClick={() => setLocation("/learn")}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors flex-shrink-0"
            aria-label="Back to courses"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex-1 flex items-center justify-center gap-1.5 min-w-0 py-1"
          >
            <span className="text-sm font-bold text-foreground truncate max-w-[180px]">{initialData.title}</span>
            <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-250 flex-shrink-0", dropdownOpen && "rotate-180")} />
          </button>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
              <Bell style={{ width: 18, height: 18 }} className="text-foreground" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
              <MoreVertical style={{ width: 18, height: 18 }} className="text-foreground" />
            </button>
          </div>
        </div>

        {/* Dropdown panel */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              key="dropdown"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden border-t border-border"
            >
              <div className="px-4 pt-4 pb-5">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">My Courses</p>
                <TrackCarousel
                  currentSlug={slug}
                  onSelect={(newSlug) => {
                    setDropdownOpen(false);
                    setLocation(`/learn/${newSlug}`);
                  }}
                />
                <button
                  onClick={() => { setDropdownOpen(false); setLocation("/learn"); }}
                  className="mt-4 w-full py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-bold tracking-wide hover:bg-emerald-600 transition-colors"
                >
                  DISCOVER ALL COURSES
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 px-4 py-5 flex flex-col gap-5">

        {/* Course hero */}
        <div className="flex items-center gap-3">
          <CourseIcon label={iconLabel} color={iconColor} />
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{initialData.category}</p>
            <h1 className="text-lg font-bold text-foreground leading-tight">{initialData.title}</h1>
          </div>
        </div>

        {/* Overall progress */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-muted-foreground">Overall Progress</span>
            <span className="text-xs font-bold text-emerald-500">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-emerald-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Module list */}
        <div className="flex flex-col gap-3">
          {modules.map((mod, modIdx) => (
            <ModuleAccordion
              key={mod.title}
              module={mod}
              defaultOpen={modIdx === 0}
              onLessonComplete={(lessonIdx) => handleLessonComplete(modIdx, lessonIdx)}
            />
          ))}
        </div>

        {/* Certificate teaser */}
        <CertificateTeaser />

        {/* More courses to explore */}
        <div>
          <button
            onClick={() => setMoreOpen((o) => !o)}
            className="w-full flex items-center justify-between py-3 text-sm font-semibold text-primary"
          >
            <span>More courses to explore</span>
            <ChevronRight className={cn("w-4 h-4 transition-transform duration-200", moreOpen && "rotate-90")} />
          </button>
          <AnimatePresence>
            {moreOpen && (
              <motion.div
                key="more"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-2 pb-2">
                  {WEB_DEV_TRACK.filter((t) => t.slug !== slug).slice(0, 4).map((t) => {
                    const dark = isColorDark(t.icon_color);
                    return (
                      <button
                        key={t.slug}
                        onClick={() => setLocation(`/learn/${t.slug}`)}
                        className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors text-left"
                      >
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ backgroundColor: t.icon_color }}>
                          <span style={{ color: dark ? "#fff" : "#111" }}>{t.icon_label}</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">{t.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setLocation("/learn")}
                    className="text-xs font-semibold text-primary text-center py-2"
                  >
                    View all courses →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
