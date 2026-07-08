import { useState } from "react";
import { useUser } from "@clerk/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp, Clock, Flame, Code2, Users, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const samplePosts = [
  {
    id: 1,
    author: { name: "Alex Chen", avatar: "", initials: "AC", role: "JavaScript Expert", xp: 12450 },
    time: "2h ago",
    content: "🔥 Pro tip: Use Array.reduce() to flatten nested arrays!\n\n```js\nconst flat = nested.reduce((acc, val) => acc.concat(val), []);\n```\n\nWay cleaner than multiple for-loops!",
    tags: ["JavaScript", "Tips"],
    likes: 47, comments: 12, liked: false, bookmarked: false,
  },
  {
    id: 2,
    author: { name: "Priya Sharma", avatar: "", initials: "PS", role: "Python Developer", xp: 9820 },
    time: "5h ago",
    content: "Just completed all 20 Python lessons! 🎉 The section on decorators finally clicked for me. Decorators are just functions that wrap other functions.",
    tags: ["Python", "Achievement"],
    likes: 89, comments: 23, liked: true, bookmarked: false,
  },
  {
    id: 3,
    author: { name: "Marcus Johnson", avatar: "", initials: "MJ", role: "Full Stack Dev", xp: 18200 },
    time: "1d ago",
    content: "CSS Grid vs Flexbox — the debate that never ends 😄\n\n• Flexbox → 1D layout (row OR column)\n• Grid → 2D layout (rows AND columns)\n\nBoth are powerful. Master both!",
    tags: ["CSS", "Tips", "Frontend"],
    likes: 134, comments: 45, liked: false, bookmarked: true,
  },
  {
    id: 4,
    author: { name: "Sofia Martín", avatar: "", initials: "SM", role: "C++ Engineer", xp: 7650 },
    time: "2d ago",
    content: "Started learning Java today on CodeCraft. Coming from C, the OOP concepts are taking some getting used to. But the lessons are super clear! 💻",
    tags: ["Java", "Beginner"],
    likes: 31, comments: 8, liked: false, bookmarked: false,
  },
];

const trendingTopics = [
  { tag: "JavaScript", count: 1243 },
  { tag: "Python", count: 987 },
  { tag: "React", count: 756 },
  { tag: "CSS", count: 634 },
  { tag: "Java", count: 521 },
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
        <CardHeader className="pb-2 px-4 pt-4">
          <div className="flex items-start gap-3">
            <Avatar className="w-9 h-9 border-2 border-primary/20 flex-shrink-0">
              <AvatarFallback className="bg-primary/20 text-primary font-bold text-xs">
                {post.author.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm">{post.author.name}</span>
                <Badge variant="secondary" className="text-xs py-0 px-1.5">
                  {post.author.xp.toLocaleString()} XP
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>{post.author.role}</span>
                <span>·</span>
                <span>{post.time}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-4 pb-3">
          <p className="text-sm leading-relaxed whitespace-pre-line mb-3">{post.content}</p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs text-primary border-primary/30">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-0.5 pt-2 border-t border-border/60">
            <Button
              variant="ghost" size="sm"
              className={`gap-1.5 text-xs h-8 px-2.5 ${liked ? "text-red-500" : "text-muted-foreground"}`}
              onClick={() => { setLiked(!liked); setLikes(l => liked ? l - 1 : l + 1); }}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} />
              {likes}
            </Button>
            <Button
              variant="ghost" size="sm"
              aria-label={`${post.comments} comments`}
              className="gap-1.5 text-xs h-8 px-2.5 text-muted-foreground"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" aria-label="Share post" className="gap-1.5 text-xs h-8 px-2.5 text-muted-foreground">
              <Share2 className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost" size="sm"
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark post"}
              className={`ml-auto h-8 px-2.5 ${bookmarked ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
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
                <div className="pt-3 flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-primary font-bold">Y</span>
                  </div>
                  <div className="flex-1 flex gap-2">
                    <Textarea
                      placeholder="Write a comment..."
                      className="min-h-0 h-9 py-1.5 text-sm resize-none"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                    <Button size="sm" disabled={!comment.trim()} className="h-9 px-3 text-xs flex-shrink-0">Post</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TrendingSection() {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <button
        className="w-full flex items-center justify-between px-4 py-3"
        onClick={() => setOpen(o => !o)}
      >
        <span className="font-semibold text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" /> Trending Topics
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <CardContent className="pt-0 px-4 pb-3 space-y-2 border-t border-border">
              {trendingTopics.map((topic, i) => (
                <div key={topic.tag} className="flex items-center justify-between py-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                    <span className="text-sm font-medium">#{topic.tag}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{topic.count} posts</span>
                </div>
              ))}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
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
    <div className="p-4">
      <div className="mb-5">
        <h1 className="text-xl font-bold font-mono tracking-tight flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" /> Community
        </h1>
        <p className="text-muted-foreground text-xs mt-0.5">Share knowledge and grow together.</p>
      </div>

      {/* Compose */}
      <Card className="mb-4">
        <CardContent className="pt-4 px-4 pb-4">
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 border-2 border-primary/20 flex-shrink-0">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="bg-primary/20 text-primary font-bold text-xs">
                {user?.firstName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share a coding tip or question..."
                className="min-h-[70px] text-sm resize-none mb-2"
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                  <Code2 className="w-3 h-3" /> Code
                </Button>
                <Button size="sm" disabled={!newPost.trim() || posting} onClick={handlePost} className="h-7 text-xs">
                  {posting ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending (collapsible) */}
      <div className="mb-4">
        <TrendingSection />
      </div>

      {/* Posts feed */}
      <Tabs defaultValue="trending">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="trending" className="flex-1 gap-1.5 text-xs">
            <TrendingUp className="w-3.5 h-3.5" /> Trending
          </TabsTrigger>
          <TabsTrigger value="latest" className="flex-1 gap-1.5 text-xs">
            <Clock className="w-3.5 h-3.5" /> Latest
          </TabsTrigger>
          <TabsTrigger value="top" className="flex-1 gap-1.5 text-xs">
            <Flame className="w-3.5 h-3.5" /> Top
          </TabsTrigger>
        </TabsList>
        <TabsContent value="trending" className="space-y-3 mt-0">
          {samplePosts.map(post => <PostCard key={post.id} post={post} />)}
        </TabsContent>
        <TabsContent value="latest" className="space-y-3 mt-0">
          {[...samplePosts].reverse().map(post => <PostCard key={post.id} post={post} />)}
        </TabsContent>
        <TabsContent value="top" className="space-y-3 mt-0">
          {[...samplePosts].sort((a, b) => b.likes - a.likes).map(post => <PostCard key={post.id} post={post} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
