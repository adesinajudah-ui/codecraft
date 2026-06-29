import { useState } from "react";
import { useUser } from "@clerk/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Swords, Plus, Users, Clock, Trophy, Zap, Star, Copy, Check, Timer, Crown, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const activeRooms = [
  { id: "R1", code: "JS-4829", host: "Alex C.", language: "JavaScript", difficulty: "Medium", players: 3, maxPlayers: 8, status: "waiting" },
  { id: "R2", code: "PY-7731", host: "Priya S.", language: "Python", difficulty: "Easy", players: 6, maxPlayers: 8, status: "waiting" },
  { id: "R3", code: "HT-2214", host: "Marcus J.", language: "HTML", difficulty: "Easy", players: 8, maxPlayers: 8, status: "in-progress" },
];

const recentResults = [
  { id: 1, competition: "JavaScript Speed Quiz", position: 1, players: 6, xp: 200, coins: 50, date: "2h ago" },
  { id: 2, competition: "Python Basics Battle", position: 3, players: 8, xp: 75, coins: 15, date: "1d ago" },
  { id: 3, competition: "HTML Masters", position: 2, players: 5, xp: 120, coins: 30, date: "3d ago" },
];

const leaderboard = [
  { rank: 1, name: "Sofia M.", wins: 24, xp: 4800, badge: "🏆" },
  { rank: 2, name: "Alex C.", wins: 19, xp: 3800, badge: "🥈" },
  { rank: 3, name: "James P.", wins: 15, xp: 3000, badge: "🥉" },
  { rank: 4, name: "Priya S.", wins: 12, xp: 2400, badge: "⭐" },
  { rank: 5, name: "You", wins: 3, xp: 395, badge: "🎯" },
];

function RoomCard({ room }: { room: typeof activeRooms[0] }) {
  const { toast } = useToast();
  const isFull = room.players === room.maxPlayers;
  const isInProgress = room.status === "in-progress";

  return (
    <Card className={`border transition-all hover:border-primary/40 ${isInProgress ? "opacity-70" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="font-mono text-xs">{room.code}</Badge>
              <Badge
                className={`text-xs ${isInProgress ? "bg-red-500/20 text-red-500 border-red-500/30" : "bg-green-500/20 text-green-500 border-green-500/30"}`}
              >
                {isInProgress ? "In Progress" : "Waiting"}
              </Badge>
            </div>
            <p className="font-semibold">{room.language} Quiz</p>
            <p className="text-xs text-muted-foreground">Hosted by {room.host}</p>
          </div>
          <Badge variant="secondary" className="text-xs">{room.difficulty}</Badge>
        </div>

        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{room.players}/{room.maxPlayers}</span>
          </div>
          <div className="flex -space-x-1">
            {Array.from({ length: Math.min(room.players, 5) }).map((_, i) => (
              <div key={i} className="w-5 h-5 rounded-full bg-primary/20 border border-background flex items-center justify-center">
                <span className="text-xs text-primary">{String.fromCharCode(65 + i)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full bg-secondary rounded-full h-1 mb-3">
          <div className="bg-primary h-1 rounded-full transition-all" style={{ width: `${(room.players / room.maxPlayers) * 100}%` }} />
        </div>

        <Button
          size="sm"
          className="w-full h-8 text-xs"
          disabled={isFull || isInProgress}
          onClick={() => toast({ title: "Joining room...", description: `Connecting to ${room.language} competition` })}
        >
          {isInProgress ? "Already Started" : isFull ? "Room Full" : "Join Room"}
        </Button>
      </CardContent>
    </Card>
  );
}

function CreateRoomDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [language, setLanguage] = useState("JavaScript");
  const [difficulty, setDifficulty] = useState("Medium");
  const [maxPlayers, setMaxPlayers] = useState("8");
  const [created, setCreated] = useState(false);
  const [roomCode] = useState(() => `${language.substring(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCreate = () => setCreated(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Code copied!", description: "Share it with friends to join your room." });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-primary" />
            {created ? "Room Created!" : "Create Competition Room"}
          </DialogTitle>
          <DialogDescription>
            {created ? "Share the room code with friends to join." : "Set up your multiplayer quiz competition."}
          </DialogDescription>
        </DialogHeader>

        {!created ? (
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Programming Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["HTML", "CSS", "JavaScript", "Python", "Java", "C"].map(l => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Max Players</label>
              <Select value={maxPlayers} onValueChange={setMaxPlayers}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["2", "4", "6", "8", "12", "16"].map(n => (
                    <SelectItem key={n} value={n}>{n} players</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
              <Button className="flex-1" onClick={handleCreate}>
                <Plus className="w-4 h-4 mr-2" /> Create Room
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <div className="text-center">
              <div className="text-5xl mb-4">🎉</div>
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 mb-4">
                <p className="text-xs text-muted-foreground mb-1">Room Code</p>
                <p className="text-3xl font-bold font-mono text-primary tracking-widest">{roomCode}</p>
              </div>
              <Button variant="outline" className="gap-2 w-full" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Room Code"}
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="p-2 rounded-lg bg-secondary">
                <p className="font-semibold">{language}</p>
                <p className="text-xs text-muted-foreground">Language</p>
              </div>
              <div className="p-2 rounded-lg bg-secondary">
                <p className="font-semibold">{difficulty}</p>
                <p className="text-xs text-muted-foreground">Difficulty</p>
              </div>
              <div className="p-2 rounded-lg bg-secondary">
                <p className="font-semibold">{maxPlayers}</p>
                <p className="text-xs text-muted-foreground">Max Players</p>
              </div>
            </div>
            <Button className="w-full gap-2">
              <Play className="w-4 h-4" /> Start Competition
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function JoinRoomDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [code, setCode] = useState("");
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Join a Room
          </DialogTitle>
          <DialogDescription>Enter the room code shared by the host.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <Input
            placeholder="e.g. JS-4829"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            className="font-mono text-center text-lg h-12 tracking-widest"
            maxLength={7}
          />
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button
              className="flex-1"
              disabled={code.length < 5}
              onClick={() => {
                toast({ title: "Joining room...", description: `Connecting to room ${code}` });
                onClose();
              }}
            >
              Join Room
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Competitions() {
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight flex items-center gap-3">
            <Swords className="w-7 h-7 text-primary" />
            Competitions
          </h1>
          <p className="text-muted-foreground mt-1">Compete against other developers in real-time quiz battles.</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button variant="outline" onClick={() => setShowJoin(true)} className="gap-2">
            <Users className="w-4 h-4" /> Join Room
          </Button>
          <Button onClick={() => setShowCreate(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Create Room
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Competitions Joined", value: "15", icon: Swords, color: "text-blue-500" },
          { label: "Wins", value: "3", icon: Trophy, color: "text-yellow-500" },
          { label: "XP from Battles", value: "395", icon: Zap, color: "text-primary" },
          { label: "Best Streak", value: "2", icon: Star, color: "text-orange-500" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-4">
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="text-2xl font-bold font-mono">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="rooms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rooms" className="gap-2 text-xs">
            <Users className="w-3.5 h-3.5" /> Live Rooms
          </TabsTrigger>
          <TabsTrigger value="results" className="gap-2 text-xs">
            <Trophy className="w-3.5 h-3.5" /> My Results
          </TabsTrigger>
          <TabsTrigger value="rankings" className="gap-2 text-xs">
            <Crown className="w-3.5 h-3.5" /> Rankings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rooms">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">{activeRooms.length} active rooms</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeRooms.map((room, i) => (
              <motion.div key={room.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <RoomCard room={room} />
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-dashed border-2 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setShowCreate(true)}>
                <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[180px] text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Create New Room</p>
                    <p className="text-xs text-muted-foreground">Host your own competition</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardContent className="pt-4 divide-y divide-border">
              {recentResults.map((result, i) => (
                <motion.div key={result.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4 py-3 first:pt-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${result.position === 1 ? "bg-yellow-500/20 text-yellow-500" : result.position === 2 ? "bg-gray-400/20 text-gray-400" : "bg-orange-500/20 text-orange-500"}`}>
                    {result.position === 1 ? "🥇" : result.position === 2 ? "🥈" : "🥉"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{result.competition}</p>
                    <p className="text-xs text-muted-foreground">#{result.position} of {result.players} players · {result.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-mono font-semibold text-primary">+{result.xp} XP</p>
                    <p className="text-xs text-yellow-500">+{result.coins} 🪙</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rankings">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-500" /> Competition Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="divide-y divide-border">
                {leaderboard.map((entry, i) => (
                  <motion.div key={entry.rank} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className={`flex items-center gap-4 py-3 first:pt-0 ${entry.name === "You" ? "bg-primary/5 -mx-4 px-4 rounded" : ""}`}>
                    <div className="w-8 text-center font-bold font-mono text-muted-foreground">{entry.badge}</div>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">{entry.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${entry.name === "You" ? "text-primary" : ""}`}>{entry.name}</p>
                      <p className="text-xs text-muted-foreground">{entry.wins} wins</p>
                    </div>
                    <p className="text-sm font-mono font-bold text-primary">{entry.xp.toLocaleString()} XP</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateRoomDialog open={showCreate} onClose={() => setShowCreate(false)} />
      <JoinRoomDialog open={showJoin} onClose={() => setShowJoin(false)} />
    </div>
  );
}
