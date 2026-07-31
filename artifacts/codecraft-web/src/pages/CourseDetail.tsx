import { useState, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, ChevronDown, Bell, MoreVertical,
  Play, Lock, Zap, Award, ChevronRight,
  BookOpen, Bot, Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

interface TrackCourse {
  title: string;
  slug: string;
  icon_label: string;
  icon_color: string;
}

type LessonType = "lesson" | "practice" | "booster";

interface Lesson {
  title: string;
  type: LessonType;
  xp: number;
  locked: boolean;
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

const COURSE_DATA: Record<string, CourseData> = {
  "introduction-to-html": {
    title: "Introduction to HTML",
    category: "Web Development",
    progress_percent: 5,
    modules: [
      {
        title: "Getting Started with HTML",
        locked: false,
        lessons: [
          { title: "AI-generated practice", type: "practice", xp: 20, locked: false },
          { title: "Headings",              type: "lesson",   xp: 10, locked: false },
          { title: "Images",               type: "lesson",   xp: 10, locked: true  },
          { title: "Booster",              type: "booster",  xp: 15, locked: true  },
        ],
      },
      { title: "Going Deeper with HTML", locked: true, lessons: [] },
      { title: "Using Attributes",       locked: true, lessons: [] },
      { title: "Mastering HTML",         locked: true, lessons: [] },
    ],
    certificate_unlocked: false,
  },
};

// Fill in minimal data for all other Web Dev track courses
WEB_DEV_TRACK.forEach((tc) => {
  if (!COURSE_DATA[tc.slug]) {
    COURSE_DATA[tc.slug] = {
      title: tc.title,
      category: "Web Development",
      progress_percent: 0,
      modules: [
        { title: "Introduction",    locked: false, lessons: [{ title: "Getting Started", type: "lesson", xp: 10, locked: false }] },
        { title: "Core Concepts",   locked: true,  lessons: [] },
        { title: "Advanced Topics", locked: true,  lessons: [] },
        { title: "Final Project",   locked: true,  lessons: [] },
      ],
      certificate_unlocked: false,
    };
  }
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function isColorDark(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
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

function LessonIcon({ type, locked }: { type: LessonType; locked: boolean }) {
  if (locked) return <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0"><Lock className="w-3.5 h-3.5 text-muted-foreground" /></div>;
  if (type === "practice") return <div className="w-8 h-8 rounded-full bg-violet-500/15 flex items-center justify-center flex-shrink-0"><Bot className="w-3.5 h-3.5 text-violet-500" /></div>;
  if (type === "booster")  return <div className="w-8 h-8 rounded-full bg-orange-500/15 flex items-center justify-center flex-shrink-0"><Flame className="w-3.5 h-3.5 text-orange-500" /></div>;
  return <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0"><BookOpen className="w-3.5 h-3.5 text-primary" /></div>;
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors",
      lesson.locked
        ? "bg-muted/40 border-border opacity-60"
        : "bg-card border-border hover:border-primary/30 cursor-pointer"
    )}>
      <LessonIcon type={lesson.type} locked={lesson.locked} />
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium truncate", lesson.locked ? "text-muted-foreground" : "text-foreground")}>
          {lesson.title}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <Zap className="w-3 h-3 text-yellow-500" />
          <span className="text-xs text-muted-foreground">+{lesson.xp} XP</span>
          {lesson.type === "lesson" && <span className="text-xs text-muted-foreground ml-1">· Lesson</span>}
          {lesson.type === "practice" && <span className="text-xs text-muted-foreground ml-1">· Practice</span>}
          {lesson.type === "booster" && <span className="text-xs text-muted-foreground ml-1">· Booster</span>}
        </div>
      </div>
      {!lesson.locked && lesson.type === "lesson" && (
        <button className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold tracking-wide hover:bg-emerald-600 transition-colors flex-shrink-0">
          LEARN
        </button>
      )}
      {!lesson.locked && lesson.type === "practice" && (
        <button className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center hover:bg-primary/25 transition-colors flex-shrink-0">
          <Play className="w-3.5 h-3.5 text-primary fill-primary" />
        </button>
      )}
      {lesson.locked && <Lock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
    </div>
  );
}

function ModuleAccordion({
  module,
  defaultOpen = false,
}: {
  module: Module;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen && !module.locked);

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
        {/* Play / Lock icon */}
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
          {!module.locked && (
            <p className="text-xs text-muted-foreground mt-0.5">{module.lessons.length} activities</p>
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
              {module.lessons.map((lesson) => (
                <LessonCard key={lesson.title} lesson={lesson} />
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

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const [, setLocation] = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const slug = courseId ?? "introduction-to-html";
  const course = COURSE_DATA[slug] ?? COURSE_DATA["introduction-to-html"];
  const trackCourse = WEB_DEV_TRACK.find((t) => t.slug === slug);
  const iconColor = trackCourse?.icon_color ?? "#E34C26";
  const iconLabel = trackCourse?.icon_label ?? "?";

  return (
    <div className="flex flex-col min-h-full">

      {/* ── Sticky page header ── */}
      <div className="sticky top-0 z-20 bg-card/95 backdrop-blur-sm border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2 px-3 py-3">
          {/* Hamburger */}
          <button
            onClick={() => setLocation("/learn")}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors flex-shrink-0"
            aria-label="Back to courses"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          {/* Title + chevron */}
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex-1 flex items-center justify-center gap-1.5 min-w-0 py-1"
          >
            <span className="text-sm font-bold text-foreground truncate max-w-[180px]">{course.title}</span>
            <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-250 flex-shrink-0", dropdownOpen && "rotate-180")} />
          </button>

          {/* Right icons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
              <Bell className="w-4.5 h-4.5 text-foreground" style={{ width: 18, height: 18 }} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
              <MoreVertical className="w-4.5 h-4.5 text-foreground" style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </div>

        {/* ── Dropdown panel ── */}
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
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{course.category}</p>
            <h1 className="text-lg font-bold text-foreground leading-tight">{course.title}</h1>
          </div>
        </div>

        {/* Overall progress */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-muted-foreground">Overall Progress</span>
            <span className="text-xs font-bold text-emerald-500">{course.progress_percent}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${course.progress_percent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Module list */}
        <div className="flex flex-col gap-3">
          {course.modules.map((mod, i) => (
            <ModuleAccordion key={mod.title} module={mod} defaultOpen={i === 0} />
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
