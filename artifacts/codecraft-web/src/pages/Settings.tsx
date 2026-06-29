import { useState } from "react";
import { useUser, useClerk } from "@clerk/react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, Moon, Sun, Bell, Shield, Palette, User, LogOut, Trash2, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Settings() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const [notifications, setNotifications] = useState({
    lessonReminders: true,
    competitionAlerts: true,
    communityReplies: true,
    weeklyReport: false,
    achievements: true,
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showProgress: true,
    showOnLeaderboard: true,
  });

  const [language, setLanguage] = useState("en");
  const [editorFontSize, setEditorFontSize] = useState("14");

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your preferences have been updated." });
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight flex items-center gap-3">
          <SettingsIcon className="w-7 h-7 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="w-4 h-4 text-primary" /> Profile
              </CardTitle>
              <CardDescription>Manage your public profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-2 border-primary/20">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl">
                    {user?.firstName?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user?.fullName || "Developer"}</p>
                  <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                  <Badge variant="outline" className="mt-1 text-xs">Free Plan</Badge>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm">First Name</Label>
                  <Input defaultValue={user?.firstName || ""} placeholder="First name" className="h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">Last Name</Label>
                  <Input defaultValue={user?.lastName || ""} placeholder="Last name" className="h-9" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-sm">Email</Label>
                  <Input defaultValue={user?.primaryEmailAddress?.emailAddress || ""} disabled className="h-9 opacity-60" />
                  <p className="text-xs text-muted-foreground">Email changes are managed through account verification.</p>
                </div>
              </div>
              <Button size="sm" onClick={handleSave}>Save Profile</Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Palette className="w-4 h-4 text-primary" /> Appearance
              </CardTitle>
              <CardDescription>Customize how CodeCraft looks for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Theme</p>
                  <p className="text-xs text-muted-foreground">Switch between dark and light mode.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    className="gap-2 h-8"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="w-4 h-4" /> Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    className="gap-2 h-8"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="w-4 h-4" /> Dark
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Code Editor Font Size</p>
                  <p className="text-xs text-muted-foreground">Adjust the editor text size.</p>
                </div>
                <Select value={editorFontSize} onValueChange={setEditorFontSize}>
                  <SelectTrigger className="w-24 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["12", "13", "14", "15", "16", "18"].map(s => (
                      <SelectItem key={s} value={s}>{s}px</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Language</p>
                  <p className="text-xs text-muted-foreground">Platform display language.</p>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-36 h-8">
                    <Globe className="w-3 h-3 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="w-4 h-4 text-primary" /> Notifications
              </CardTitle>
              <CardDescription>Choose what alerts you receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "lessonReminders", label: "Lesson Reminders", desc: "Daily reminders to continue your streak" },
                { key: "competitionAlerts", label: "Competition Alerts", desc: "Get notified about new competitions" },
                { key: "communityReplies", label: "Community Replies", desc: "Alerts when someone replies to your post" },
                { key: "achievements", label: "Achievement Unlocked", desc: "Celebrate when you earn badges" },
                { key: "weeklyReport", label: "Weekly Progress Report", desc: "A summary of your week" },
              ].map((item, i) => (
                <div key={item.key}>
                  {i > 0 && <Separator className="mb-4" />}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(v) => setNotifications(n => ({ ...n, [item.key]: v }))}
                    />
                  </div>
                </div>
              ))}
              <Button size="sm" onClick={handleSave}>Save Notifications</Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="w-4 h-4 text-primary" /> Privacy
              </CardTitle>
              <CardDescription>Control what others can see.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "showProfile", label: "Public Profile", desc: "Allow others to view your profile page" },
                { key: "showProgress", label: "Show Progress", desc: "Display your lesson progress publicly" },
                { key: "showOnLeaderboard", label: "Leaderboard Visibility", desc: "Appear on global leaderboards" },
              ].map((item, i) => (
                <div key={item.key}>
                  {i > 0 && <Separator className="mb-4" />}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={privacy[item.key as keyof typeof privacy]}
                      onCheckedChange={(v) => setPrivacy(p => ({ ...p, [item.key]: v }))}
                    />
                  </div>
                </div>
              ))}
              <Button size="sm" onClick={handleSave}>Save Privacy</Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-destructive">
                <Trash2 className="w-4 h-4" /> Danger Zone
              </CardTitle>
              <CardDescription>Irreversible account actions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                <div>
                  <p className="text-sm font-medium">Sign Out</p>
                  <p className="text-xs text-muted-foreground">Sign out of your account on this device.</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => signOut()}>
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                <div>
                  <p className="text-sm font-medium">Delete Account</p>
                  <p className="text-xs text-muted-foreground">Permanently remove all your data. Cannot be undone.</p>
                </div>
                <Button variant="destructive" size="sm" className="gap-2">
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
