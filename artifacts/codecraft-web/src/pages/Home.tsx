import { Show } from "@clerk/react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, GraduationCap, Code2, Trophy, Users, Zap, ChevronRight, BookOpen, Star, Award } from "lucide-react";
import { motion } from "framer-motion";

const languages = [
  { name: "HTML", icon: "🌐", color: "from-orange-500/20 to-orange-600/5 border-orange-500/30", lessons: 20 },
  { name: "CSS", icon: "🎨", color: "from-blue-500/20 to-blue-600/5 border-blue-500/30", lessons: 20 },
  { name: "JavaScript", icon: "⚡", color: "from-yellow-500/20 to-yellow-600/5 border-yellow-500/30", lessons: 20 },
  { name: "Python", icon: "🐍", color: "from-green-500/20 to-green-600/5 border-green-500/30", lessons: 20 },
  { name: "Java", icon: "☕", color: "from-red-500/20 to-red-600/5 border-red-500/30", lessons: 20 },
  { name: "C", icon: "⚙️", color: "from-purple-500/20 to-purple-600/5 border-purple-500/30", lessons: 20 },
];

const features = [
  { icon: BookOpen, title: "Structured Learning", desc: "20+ detailed lessons per language, from beginner to advanced.", color: "text-blue-500" },
  { icon: Code2, title: "Live Code Editor", desc: "Write, run, and debug code directly in your browser.", color: "text-green-500" },
  { icon: Trophy, title: "Quiz & Compete", desc: "Test knowledge and challenge others in real-time competitions.", color: "text-yellow-500" },
  { icon: Award, title: "Earn Certificates", desc: "Get a certificate for every language you master.", color: "text-orange-500" },
  { icon: Users, title: "Community", desc: "Join thousands of learners and share your progress.", color: "text-purple-500" },
  { icon: Star, title: "Leaderboards", desc: "Climb the global rankings and showcase your expertise.", color: "text-pink-500" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors" title="Toggle theme">
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-bold font-mono tracking-tight text-primary">CodeCraft</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Show when="signed-in">
            <Link href="/dashboard"><Button variant="secondary" size="sm">Dashboard</Button></Link>
          </Show>
          <Show when="signed-out">
            <Link href="/sign-in"><Button variant="ghost" size="sm">Sign In</Button></Link>
            <Link href="/sign-up"><Button size="sm" className="hidden sm:flex">Get Started Free</Button></Link>
          </Show>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative px-6 py-20 md:py-32 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-8">
                <Zap className="w-3.5 h-3.5" /> 120+ Lessons across 6 Languages
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                Master code.{" "}<span className="text-primary">Build the future.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                CodeCraft is the complete programming education platform. Learn HTML, CSS, JavaScript, Python, Java, and C — with interactive lessons, built-in editor, quizzes, and competitions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Show when="signed-out">
                  <Link href="/sign-up">
                    <Button size="lg" className="text-base px-8 gap-2 font-mono w-full sm:w-auto">
                      Start Learning Free <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/sign-in">
                    <Button size="lg" variant="outline" className="text-base px-8 w-full sm:w-auto">Sign In</Button>
                  </Link>
                </Show>
                <Show when="signed-in">
                  <Link href="/dashboard">
                    <Button size="lg" className="text-base px-8 gap-2 font-mono">
                      Continue Journey <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </Show>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-border bg-card/50">
          <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{ value: "6", label: "Languages" }, { value: "120+", label: "Lessons" }, { value: "12K+", label: "Students" }, { value: "95%", label: "Completion Rate" }].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl font-bold font-mono text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-mono mb-3">6 Languages. One Platform.</h2>
            <p className="text-muted-foreground">From web basics to systems programming — we have it all.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {languages.map((lang, i) => (
              <motion.div key={lang.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                className={`p-4 rounded-xl border bg-gradient-to-br ${lang.color} text-center cursor-pointer hover:scale-105 transition-transform`}>
                <div className="text-3xl mb-2">{lang.icon}</div>
                <p className="font-semibold text-sm">{lang.name}</p>
                <p className="text-xs text-muted-foreground">{lang.lessons} lessons</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 py-16 bg-secondary/30 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold font-mono mb-3">Everything You Need to Learn</h2>
              <p className="text-muted-foreground">A complete platform built for serious learners.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors">
                  <feature.icon className={`w-6 h-6 ${feature.color} mb-3`} />
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Ready to start your coding journey?</h2>
            <p className="text-muted-foreground mb-8">Join thousands of developers who are already leveling up on CodeCraft.</p>
            <Show when="signed-out">
              <Link href="/sign-up">
                <Button size="lg" className="text-base px-10 gap-2 font-mono">
                  Create Free Account <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </Show>
            <Show when="signed-in">
              <Link href="/learn">
                <Button size="lg" className="text-base px-10 gap-2 font-mono">
                  Start Learning <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </Show>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-2">
          <GraduationCap className="w-4 h-4 text-primary" />
          <span className="font-mono font-bold text-primary">CodeCraft</span>
        </div>
        <p>© {new Date().getFullYear()} CodeCraft. Master code. Build the future.</p>
      </footer>
    </div>
  );
}
