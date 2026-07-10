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
import { Settings as SettingsIcon, Moon, Sun, Bell, Shield, Palette, User, LogOut, Trash2, Globe, AtSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useState as useReactState } from "react";
import { useGetMyUsername, useSetMyUsername, getGetMyUsernameQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

function UsernameField() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data } = useGetMyUsername();
  const [value, setValue] = useReactState("");
  const [editing, setEditing] = useReactState(false);
  const { mutate, isPending } = useSetMyUsername({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetMyUsernameQueryKey() });
        setEditing(false);
        toast({ title: "Username saved" });
      },
      onError: (err: any) => {
        toast({ title: "Couldn't save username", description: err?.status === 409 ? "That username is taken." : "Try again.", variant: "destructive" });
      },
    },
  });

  const current = data?.username ?? null;

  return (
    <div className="space-y-1.5">
      <Label className="text-xs flex items-center gap-1"><AtSign className="w-3 h-3" /> Username (for Study Groups)</Label>
      {editing || !current ? (
        <div className="flex gap-2">
          <Input
            value={value || current || ""}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. code_ninja"
            className="h-9 text-sm"
          />
          <Button size="sm" disabled={isPending || !(value || "").trim()} onClick={() => mutate({ data: { username: (value || "").trim() } })}>
            Save
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">@{current}</span>
          <Button size="sm" variant="ghost" onClick={() => { setValue(current); setEditing(true); }}>Change</Button>
        </div>
      )}
    </div>
  );
}

export default function Settings() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const [notifications, setNotifications] = useState({
    lessonReminders: true, competitionAlerts: true,
    communityReplies: true, weeklyReport: false, achievements: true,
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true, showProgress: true, showOnLeaderboard: true,
  });

  const [language, setLanguage] = useState("en");
  const [editorFontSize, setEditorFontSize] = useState("14");

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your preferences have been updated." });
  };

  return (
    <div className="p-4 pb-8">
      <div className="mb-5">
        <h1 className="text-xl font-bold font-mono tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground text-xs mt-0.5">Manage your account and preferences.</p>
      </div>

      <div className="space-y-4">
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader className="pb-3 px-4 pt-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-primary" /> Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-14 h-14 border-2 border-primary/20">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="bg-primary/20 text-primary font-bold text-lg">
                    {user?.firstName?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{user?.fullName || "Developer"}</p>
                  <p className="text-xs text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                  <Badge variant="outline" className="mt-1 text-xs">Free Plan</Badge>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">First Name</Label>
                  <Input defaultValue={user?.firstName || ""} placeholder="First name" className="h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Last Name</Label>
                  <Input defaultValue={user?.lastName || ""} placeholder="Last name" className="h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Email</Label>
                  <Input defaultValue={user?.primaryEmailAddress?.emailAddress || ""} disabled className="h-9 text-sm opacity-60" />
                </div>
                <UsernameField />
              </div>
              <Button size="sm" onClick={handleSave}>Save Profile</Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <CardHeader className="pb-3 px-4 pt-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Palette className="w-4 h-4 text-primary" /> Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Theme</p>
                <div className="flex gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm" className="flex-1 gap-2"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="w-4 h-4" /> Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm" className="flex-1 gap-2"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="w-4 h-4" /> Dark
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Editor Font Size</p>
                  <p className="text-xs text-muted-foreground">Code editor text size</p>
                </div>
                <Select value={editorFontSize} onValueChange={setEditorFontSize}>
                  <SelectTrigger className="w-20 h-8 text-xs">
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
                  <p className="text-xs text-muted-foreground">Display language</p>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-28 h-8 text-xs">
                    <Globe className="w-3 h-3 mr-1.5" />
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
            <CardHeader className="pb-3 px-4 pt-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Bell className="w-4 h-4 text-primary" /> Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              {[
                { key: "lessonReminders", label: "Lesson Reminders", desc: "Daily streak reminders" },
                { key: "competitionAlerts", label: "Competition Alerts", desc: "New competition notifications" },
                { key: "communityReplies", label: "Community Replies", desc: "Replies to your posts" },
                { key: "achievements", label: "Achievements", desc: "Badge and milestone alerts" },
                { key: "weeklyReport", label: "Weekly Report", desc: "Your weekly progress summary" },
              ].map((item, i) => (
                <div key={item.key}>
                  {i > 0 && <Separator className="mb-3" />}
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
              <Button size="sm" onClick={handleSave} className="mt-2">Save</Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <CardHeader className="pb-3 px-4 pt-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-primary" /> Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              {[
                { key: "showProfile", label: "Public Profile", desc: "Others can view your profile" },
                { key: "showProgress", label: "Show Progress", desc: "Display lesson progress publicly" },
                { key: "showOnLeaderboard", label: "Leaderboard", desc: "Appear on global rankings" },
              ].map((item, i) => (
                <div key={item.key}>
                  {i > 0 && <Separator className="mb-3" />}
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
              <Button size="sm" onClick={handleSave} className="mt-2">Save</Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-destructive/30">
            <CardHeader className="pb-3 px-4 pt-4">
              <CardTitle className="flex items-center gap-2 text-sm text-destructive">
                <Trash2 className="w-4 h-4" /> Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                <div>
                  <p className="text-sm font-medium">Sign Out</p>
                  <p className="text-xs text-muted-foreground">Sign out on this device.</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => signOut()}>
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                <div>
                  <p className="text-sm font-medium">Delete Account</p>
                  <p className="text-xs text-muted-foreground">Permanently removes all data.</p>
                </div>
                <Button variant="destructive" size="sm" className="gap-1.5">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
