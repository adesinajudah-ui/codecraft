import { useGetProgressSummary } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/react";
import { Award, Download, Share2, Lock, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const langColors: Record<string, { bg: string; text: string; border: string }> = {
  HTML: { bg: "from-orange-500/20 to-orange-600/10", text: "text-orange-500", border: "border-orange-500/30" },
  CSS: { bg: "from-blue-500/20 to-blue-600/10", text: "text-blue-500", border: "border-blue-500/30" },
  JavaScript: { bg: "from-yellow-500/20 to-yellow-600/10", text: "text-yellow-500", border: "border-yellow-500/30" },
  Python: { bg: "from-green-500/20 to-green-600/10", text: "text-green-500", border: "border-green-500/30" },
  Java: { bg: "from-red-500/20 to-red-600/10", text: "text-red-500", border: "border-red-500/30" },
  C: { bg: "from-purple-500/20 to-purple-600/10", text: "text-purple-500", border: "border-purple-500/30" },
};

function CertificateCard({ name, completed, progress, xp, user }: {
  name: string; completed: boolean; progress: number; xp: number; user: string;
}) {
  const colors = langColors[name] || { bg: "from-primary/20 to-primary/10", text: "text-primary", border: "border-primary/30" };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 600;
    const ctx = canvas.getContext("2d")!;

    // Background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, 900, 600);

    // Border
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, 840, 540);

    // Inner border
    ctx.strokeStyle = "#0e7490";
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, 810, 510);

    // Title
    ctx.fillStyle = "#22d3ee";
    ctx.font = "bold 42px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Completion", 450, 130);

    // Divider
    ctx.fillStyle = "#22d3ee";
    ctx.fillRect(150, 150, 600, 2);

    // Subtitle
    ctx.fillStyle = "#94a3b8";
    ctx.font = "20px Georgia, serif";
    ctx.fillText("This certifies that", 450, 200);

    // User name
    ctx.fillStyle = "#f1f5f9";
    ctx.font = "bold 36px Georgia, serif";
    ctx.fillText(user, 450, 255);

    // Course
    ctx.fillStyle = "#94a3b8";
    ctx.font = "20px Georgia, serif";
    ctx.fillText("has successfully completed", 450, 305);

    ctx.fillStyle = "#22d3ee";
    ctx.font = "bold 32px Georgia, serif";
    ctx.fillText(`${name} Programming`, 450, 360);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "18px Georgia, serif";
    ctx.fillText(`on CodeCraft Platform | ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 450, 400);

    // XP
    ctx.fillStyle = "#22d3ee";
    ctx.font = "bold 20px monospace";
    ctx.fillText(`🏆 ${xp} XP Earned`, 450, 460);

    // Divider
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(150, 490, 600, 2);

    // Footer
    ctx.fillStyle = "#475569";
    ctx.font = "14px monospace";
    ctx.fillText("CodeCraft | Master code. Build the future.", 450, 540);

    const link = document.createElement("a");
    link.download = `CodeCraft_${name}_Certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className={`relative overflow-hidden border ${completed ? colors.border : "border-border"} transition-all hover:shadow-lg`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} pointer-events-none`} />
        <CardContent className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-background/80 flex items-center justify-center border ${colors.border}`}>
                {completed
                  ? <CheckCircle2 className={`w-6 h-6 ${colors.text}`} />
                  : <Lock className="w-6 h-6 text-muted-foreground" />}
              </div>
              <div>
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-xs text-muted-foreground">Programming Certificate</p>
              </div>
            </div>
            {completed && (
              <Badge className={`${colors.text} bg-background/80 border ${colors.border} font-mono text-xs`}>
                Earned
              </Badge>
            )}
          </div>

          {!completed && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{Math.round(progress)}% Complete</span>
                <span>Need 100%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full ${colors.text.replace("text-", "bg-")} rounded-full transition-all`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {completed && (
            <div className="mb-4 p-3 rounded-lg bg-background/60 border border-border/50">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">XP Earned</p>
                  <p className={`font-bold font-mono ${colors.text}`}>{xp} XP</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Issued</p>
                  <p className="font-medium text-xs">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {completed ? (
              <>
                <Button size="sm" className="flex-1 gap-2 h-8 text-xs" onClick={handleDownload}>
                  <Download className="w-3.5 h-3.5" />
                  Download
                </Button>
                <Button size="sm" variant="outline" className="gap-2 h-8 text-xs px-3">
                  <Share2 className="w-3.5 h-3.5" />
                  Share
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" className="flex-1 h-8 text-xs" disabled={progress === 0}>
                {progress > 0 ? "Continue Learning" : "Start Learning"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Certificates() {
  const { user } = useUser();
  const { data: summaries, isLoading } = useGetProgressSummary();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const earnedCount = summaries?.filter(s => s.totalLessons > 0 && s.completedLessons === s.totalLessons).length || 0;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight flex items-center gap-3">
          <Award className="w-7 h-7 text-primary" />
          My Certificates
        </h1>
        <p className="text-muted-foreground mt-1">Complete all lessons in a language to earn your certificate.</p>
      </div>

      {earnedCount > 0 && (
        <Card className="mb-6 bg-primary/5 border-primary/30">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Congratulations! 🎉</p>
              <p className="text-sm text-muted-foreground">
                You've earned <span className="font-bold text-primary">{earnedCount}</span> certificate{earnedCount > 1 ? "s" : ""} so far. Keep learning to collect them all!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summaries && summaries.length > 0
          ? summaries.map(s => (
              <CertificateCard
                key={s.languageId}
                name={s.languageName}
                completed={s.totalLessons > 0 && s.completedLessons === s.totalLessons}
                progress={s.totalLessons > 0 ? (s.completedLessons / s.totalLessons) * 100 : 0}
                xp={s.xpEarned}
                user={user?.fullName || "Developer"}
              />
            ))
          : ["HTML", "CSS", "JavaScript", "Python", "Java", "C"].map(name => (
              <CertificateCard
                key={name}
                name={name}
                completed={false}
                progress={0}
                xp={0}
                user={user?.fullName || "Developer"}
              />
            ))}
      </div>
    </div>
  );
}
