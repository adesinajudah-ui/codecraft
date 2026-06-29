import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { useUser, useClerk } from "@clerk/react";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  TerminalSquare,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  Home,
  Users,
  Award,
  Settings,
  BookMarked,
  Swords,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const sidebarNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/my-courses", label: "My Courses", icon: BookMarked },
  { href: "/editor", label: "Practice", icon: TerminalSquare },
  { href: "/competitions", label: "Competitions", icon: Swords },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/certificates", label: "Certificates", icon: Award },
  { href: "/community", label: "Community", icon: Users },
];

const bottomNavItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/community", label: "Community", icon: Users },
  { href: "/competitions", label: "Compete", icon: Swords },
  { href: "/leaderboard", label: "Rank", icon: Trophy },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9 rounded-full"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const allNavItems = isAdmin
    ? [...sidebarNavItems, { href: "/admin", label: "Admin", icon: ShieldAlert }]
    : sidebarNavItems;

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn("flex flex-col h-full bg-card", isMobile ? "w-72" : collapsed ? "w-16" : "w-64")}>
      <div className={cn("flex items-center border-b border-border flex-shrink-0", collapsed && !isMobile ? "p-3 justify-center flex-col gap-2" : "p-4 gap-3")}>
        {(!collapsed || isMobile) && (
          <>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-bold font-mono tracking-tight text-primary truncate">CodeCraft</span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <ThemeToggle />
              {!isMobile && (
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setCollapsed(true)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              )}
            </div>
          </>
        )}
        {collapsed && !isMobile && (
          <>
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setCollapsed(false)}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {allNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} onClick={() => isMobile && setMobileOpen(false)}>
              <div
                title={collapsed && !isMobile ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150",
                  collapsed && !isMobile ? "justify-center px-2" : "",
                  isActive
                    ? "bg-primary/15 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {(!collapsed || isMobile) && (
                  <>
                    <span className="text-sm flex-1">{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className={cn("border-t border-border flex-shrink-0", collapsed && !isMobile ? "p-2" : "p-3")}>
        {(!collapsed || isMobile) && (
          <Link href="/profile" onClick={() => isMobile && setMobileOpen(false)}>
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer mb-2">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt={user.fullName || "User"} className="w-9 h-9 rounded-full border-2 border-primary/30 flex-shrink-0" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">{user?.firstName?.[0] || "U"}</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user?.fullName || "Developer"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
          </Link>
        )}
        {collapsed && !isMobile && (
          <div className="flex justify-center mb-1">
            <Link href="/profile">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="User" className="w-8 h-8 rounded-full border-2 border-primary/30 cursor-pointer" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-bold text-primary">{user?.firstName?.[0] || "U"}</span>
                </div>
              )}
            </Link>
          </div>
        )}

        <div className={cn("flex gap-1", collapsed && !isMobile ? "flex-col items-center" : "")}>
          {collapsed && !isMobile && <ThemeToggle />}
          <Link href="/settings" onClick={() => isMobile && setMobileOpen(false)} className={cn(!collapsed || isMobile ? "flex-1" : "")}>
            <Button
              variant="ghost"
              size={collapsed && !isMobile ? "icon" : "sm"}
              className={cn("text-muted-foreground", !collapsed || isMobile ? "w-full justify-start" : "w-9 h-9")}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
              {(!collapsed || isMobile) && <span className="ml-2">Settings</span>}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size={collapsed && !isMobile ? "icon" : "sm"}
            className={cn("text-muted-foreground hover:text-destructive", !collapsed || isMobile ? "flex-1 justify-start" : "w-9 h-9")}
            onClick={() => signOut()}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            {(!collapsed || isMobile) && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-shrink-0 border-r border-border transition-all duration-300 overflow-hidden",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Overlay Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 md:hidden"
            >
              <div className="relative h-full">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute right-2 top-3 z-10 p-1.5 rounded-md hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <SidebarContent isMobile />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-md hover:bg-secondary transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="font-bold font-mono text-primary">CodeCraft</span>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border flex items-stretch safe-area-inset-bottom">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <div className={cn(
                "flex flex-col items-center justify-center py-2 gap-0.5 relative",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {isActive && (
                  <motion.div
                    layoutId="bottomNav"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-b-full"
                  />
                )}
                <Icon className={cn("w-5 h-5 transition-transform", isActive ? "scale-110" : "")} />
                <span className={cn("text-xs", isActive ? "font-semibold" : "font-medium")}>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
