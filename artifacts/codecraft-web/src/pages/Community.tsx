import { useState } from "react";
import { useUser } from "@clerk/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp, Clock, Flame, Code2, Users, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const samplePosts = [
  {
    id: 1,
    author: { name: "Alex Chen", avatar: "", initials: "AC", role: "JavaScript Expert", xp: 12450 },
    time: "2 hours ago",
    content: "🔥 Pro tip: Use Array.reduce() to flatten nested arrays without external libraries!\n\n```js\nconst flat = nested.reduce((acc, val) => acc.concat(val), []);\n```\n\nWay cleaner than multiple for-loops. What's your favorite JS trick?",
    tags: ["JavaScript", "Tips"],
    likes: 47,
    comments: 12,
    liked: false,
    bookmarked: false,
  },
  {
    id: 2,
    author: { name: "Priya Sharma", avatar: "", initials: "PS", role: "Python Developer", xp: 9820 },
    time: "5 hours ago",
    content: "Just completed all 20 Python lessons! 🎉 The section on decorators finally clicked for me. The key insight: decorators are just functions that wrap other functions.\n\nWho else found decorators tricky at first?",
    tags: ["Python", "Achievement"],
    likes: 89,
    comments: 23,
    liked: true,
    bookmarked: false,
  },
  {
    id: 3,
    author: { name: "Marcus Johnson", avatar: "", initials: "MJ", role: "Full Stack Dev", xp: 18200 },
    time: "1 day ago",
    content: "CSS Grid vs Flexbox — the debate that never ends 😄\n\nMy rule of thumb:\n• Flexbox → 1D layout (row OR column)\n• Grid → 2D layout (rows AND columns)\n\nBoth are powerful. Master both!",
    tags: ["CSS", "Tips", "Frontend"],
    likes: 134,
    comments: 45,
    liked: false,
    bookmarked: true,
  },
  {
    id: 4,
    author: { name: "Sofia Martín", avatar: "", initials: "SM", role: "C++ Engineer", xp: 7650 },
    time: "2 days ago",
    content: "Started learning Java today on CodeCraft. Coming from C, the object-oriented concepts are taking some getting used to. But the lessons are super clear! Loving the built-in code editor 💻",
    tags: ["Java", "Beginner"],
    likes: 31,
    comments: 8,
    liked: false,
    bookmarked: false,
  },
];

const trendingTopics = [
  { tag: "JavaScript", count: 1243 },
  { tag: "Python", count: 987 },
  { tag: "React", count: 756 },
  { tag: "CSS", count: 634 },
  { tag: "Java", count: 521 },
  { tag: "Algorithms", count: 412 },
];

const suggestedUsers = [
  { name: "Elena Volkov", initials: "EV", role: "Algorithm Expert", xp: 21000, following: false },
  { name: "James Park", initials: "JP", role: "Web Developer", xp: 15400, following: true },
  { name: "Aisha Patel", initials: "AP", role: "Data Scientist", xp: 13200, following: false },
];

function PostCard({ post }: { post: typeof samplePosts[0] }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [bookmarked, setBookmarked] = useState(post.bookmarked);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border border-border hover:border-primary/30 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border-2 border-primary/20">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="bg-primary/20 text-primary font-bold text-sm">
                  {post.author.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{post.author.name}</span>
                  <Badge variant="secondary" className="text-xs py-0 px-1.5">
                    {post.author.xp.toLocaleString()} XP
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.author.role}</span>
                  <span>·</span>
                  <span>{post.time}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs h-7 px-3 flex-shrink-0">
              + Follow
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="mb-3">
            <p className="text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs text-primary border-primary/30 cursor-pointer hover:bg-primary/10">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-1 pt-3 border-t border-border/60">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 text-xs h-8 px-3 ${liked ? "text-red-500 hover:text-red-400" : "text-muted-foreground"}`}
              onClick={() => { setLiked(!liked); setLikes(l => liked ? l - 1 : l + 1); }}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              {likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-xs h-8 px-3 text-muted-foreground"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-4 h-4" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-xs h-8 px-3 text-muted-foreground">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`ml-auto gap-2 text-xs h-8 px-3 ${bookmarked ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>

          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-3 space-y-2">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-primary font-bold">Y</span>
                    </div>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Write a comment..."
                        className="min-h-0 h-9 py-1.5 text-sm resize-none"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                      />
                    </div>
                    <Button size="sm" disabled={!comment.trim()} className="h-9 px-3 text-xs">Post</Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Be the first to comment on this post!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Community() {
  const { user } = useUser();
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosting(true);
    setTimeout(() => { setNewPost(""); setPosting(false); }, 800);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight flex items-center gap-3">
          <Users className="w-7 h-7 text-primary" />
          Community
        </h1>
        <p className="text-muted-foreground mt-1">Share knowledge, ask questions, and grow together.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex gap-3">
                <Avatar className="w-9 h-9 border-2 border-primary/20 flex-shrink-0">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="bg-primary/20 text-primary font-bold text-xs">
                    {user?.firstName?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share a coding tip, question, or achievement..."
                    className="min-h-[80px] text-sm resize-none mb-2"
                    value={newPost}
                    onChange={e => setNewPost(e.target.value)}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                        <Code2 className="w-3 h-3" /> Code
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                        # Tag
                      </Button>
                    </div>
                    <Button size="sm" disabled={!newPost.trim() || posting} onClick={handlePost} className="h-7 text-xs">
                      {posting ? "Posting..." : "Post"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="trending">
            <TabsList className="w-full">
              <TabsTrigger value="trending" className="flex-1 gap-2 text-xs">
                <TrendingUp className="w-3.5 h-3.5" /> Trending
              </TabsTrigger>
              <TabsTrigger value="latest" className="flex-1 gap-2 text-xs">
                <Clock className="w-3.5 h-3.5" /> Latest
              </TabsTrigger>
              <TabsTrigger value="top" className="flex-1 gap-2 text-xs">
                <Flame className="w-3.5 h-3.5" /> Top
              </TabsTrigger>
            </TabsList>
            <TabsContent value="trending" className="space-y-4 mt-4">
              {samplePosts.map(post => <PostCard key={post.id} post={post} />)}
            </TabsContent>
            <TabsContent value="latest" className="space-y-4 mt-4">
              {[...samplePosts].reverse().map(post => <PostCard key={post.id} post={post} />)}
            </TabsContent>
            <TabsContent value="top" className="space-y-4 mt-4">
              {[...samplePosts].sort((a, b) => b.likes - a.likes).map(post => <PostCard key={post.id} post={post} />)}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <h2 className="font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Trending Topics
              </h2>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {trendingTopics.map((topic, i) => (
                <div key={topic.tag} className="flex items-center justify-between py-1 cursor-pointer hover:text-primary transition-colors group">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                    <span className="text-sm font-medium group-hover:text-primary">#{topic.tag}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{topic.count} posts</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <h2 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" /> Who to Follow
              </h2>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {suggestedUsers.map(u => (
                <div key={u.name} className="flex items-center gap-3">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-primary/20 text-primary font-bold text-xs">{u.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.xp.toLocaleString()} XP</p>
                  </div>
                  <Button size="sm" variant={u.following ? "outline" : "default"} className="h-7 text-xs px-3 flex-shrink-0">
                    {u.following ? "Following" : "Follow"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <h2 className="font-semibold flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-primary" /> Community Stats
              </h2>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {[
                { label: "Active Members", value: "12,847" },
                { label: "Posts Today", value: "342" },
                { label: "Questions Answered", value: "98%" },
                { label: "Code Snippets Shared", value: "4,219" },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span className="font-semibold font-mono">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
