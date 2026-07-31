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
  X,
  Home,
  Users,
  Award,
  Settings,
  BookMarked,
  Swords,
  Sun,
  Moon,
  GraduationCap,
  Menu,
  UsersRound,
  UserCircle,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useListPendingInvites, useGetWalletBalance } from "@workspace/api-client-react";
import { useIsDesktop } from "@/hooks/use-desktop";

const drawerNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/account", label: "Account", icon: UserCircle },
  { href: "/learn", label: "All Courses", icon: BookOpen },
  { href: "/my-courses", label: "My Courses", icon: BookMarked },
  { href: "/editor", label: "Practice", icon: TerminalSquare },
  { href: "/study-groups", label: "Study Groups", icon: UsersRound },
  { href: "/competitions", label: "Competitions", icon: Swords },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/certificates", label: "Certificates", icon: Award },
  { href: "/community", label: "Community", icon: Users },
];

function CoinBalanceBadge() {
  const { data } = useGetWalletBalance();
  return (
    <Link href="/wallet">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-500 cursor-pointer hover:bg-yellow-500/25 transition-colors">
        <Coins className="w-3.5 h-3.5" />
        <span className="text-xs font-bold font-mono">{data?.coinBalance ?? 0}</span>
      </div>
    </Link>
  );
}

const bottomNavItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/learn", label: "All Courses", icon: BookOpen },
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

function DesktopSidebar({
  allNavItems,
  pendingCount,
  location,
}: {
  allNavItems: typeof drawerNavItems;
  pendingCount: number;
  location: string;
}) {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <aside className="w-64 flex-shrink-0 h-screen sticky top-0 flex flex-col bg-card border-r border-border">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-primary" />
        </div>
        <span className="text-lg font-bold font-mono tracking-tight text-primary">CodeCraft</span>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {allNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150",
                  isActive
                    ? "bg-primary/15 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm flex-1">{item.label}</span>
                {item.href === "/study-groups" && pendingCount > 0 && (
                  <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link href="/profile">
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
        <div className="flex gap-1">
          <Link href="/settings" className="flex-1">
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
              <Settings className="w-4 h-4" />
              <span className="ml-2">Settings</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 justify-start text-muted-foreground hover:text-destructive"
            onClick={() => signOut()}
          >
            <LogOut className="w-4 h-4" />
            <span className="ml-2">Sign Out</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}

function DesktopShell({ children, allNavItems, pendingCount, location }: {
  children: ReactNode;
  allNavItems: typeof drawerNavItems;
  pendingCount: number;
  location: string;
}) {
  return (
    <div className="min-h-screen flex bg-background">
      <DesktopSidebar allNavItems={allNavItems} pendingCount={pendingCount} location={location} />
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="flex items-center justify-end gap-3 px-6 py-3 border-b border-border bg-card flex-shrink-0">
          <CoinBalanceBadge />
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto w-full px-6 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const allNavItems = isAdmin
    ? [...drawerNavItems, { href: "/admin", label: "Admin", icon: ShieldAlert }]
    : drawerNavItems;

  const { data: pendingInvites } = useListPendingInvites();
  const pendingCount = pendingInvites?.length ?? 0;

  if (isDesktop) {
    return (
      <DesktopShell allNavItems={allNavItems} pendingCount={pendingCount} location={location}>
        {children}
      </DesktopShell>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile app shell — fills the viewport like a native phone app */}
      <div className="relative w-full h-screen overflow-hidden bg-background flex flex-col">

        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card flex-shrink-0">
          <button onClick={() => setDrawerOpen(true)} className="p-1.5 rounded-md hover:bg-secondary transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="font-bold font-mono text-primary">CodeCraft</span>
          </div>
          <div className="flex items-center gap-2">
            <CoinBalanceBadge />
            <ThemeToggle />
          </div>
        </header>

        {/* Drawer Overlay */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 bg-black/60"
                onClick={() => setDrawerOpen(false)}
              />
              <motion.aside
                initial={{ x: -288 }}
                animate={{ x: 0 }}
                exit={{ x: -288 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute left-0 top-0 bottom-0 z-50 w-72 bg-card flex flex-col"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-bold font-mono tracking-tight text-primary">CodeCraft</span>
                  </div>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-1.5 rounded-md hover:bg-secondary transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
                  {allNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href));
                    return (
                      <Link key={item.href} href={item.href} onClick={() => setDrawerOpen(false)}>
                        <div
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150",
                            isActive
                              ? "bg-primary/15 text-primary font-semibold"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm flex-1">{item.label}</span>
                          {item.href === "/study-groups" && pendingCount > 0 && (
                            <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                              {pendingCount}
                            </span>
                          )}
                          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </div>
                      </Link>
                    );
                  })}
                </nav>

                {/* Drawer Footer */}
                <div className="border-t border-border p-3">
                  <Link href="/profile" onClick={() => setDrawerOpen(false)}>
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
                  <div className="flex gap-1">
                    <Link href="/settings" onClick={() => setDrawerOpen(false)} className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                        <Settings className="w-4 h-4" />
                        <span className="ml-2">Settings</span>
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 justify-start text-muted-foreground hover:text-destructive"
                      onClick={() => signOut()}
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="ml-2">Sign Out</span>
                    </Button>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-16">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 z-30 bg-card border-t border-border flex items-stretch">
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
    </div>
  );
}
