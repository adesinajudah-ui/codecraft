import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, Link } from "wouter";
import {
  useGetLesson, useMarkLessonComplete, useRunCode, getGetLessonQueryKey,
  useUnlockPremiumContent, useGetWalletBalance, getGetWalletBalanceQueryKey,
} from "@workspace/api-client-react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft, Play, Copy, RotateCcw, CheckCircle2, Check, ChevronRight, Code2, BookOpen, Lock, Coins } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { getGetUserProgressQueryKey } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function PremiumLessonLock({ lesson, courseId, onUnlocked }: { lesson: any; courseId: string | undefined; onUnlocked: () => void }) {
  const { toast } = useToast();
  const { data: balance } = useGetWalletBalance();
  const unlock = useUnlockPremiumContent();

  const canAfford = (balance?.coinBalance ?? 0) >= lesson.coinCost;

  const handleUnlock = () => {
    unlock.mutate({ data: { contentType: "lesson", contentId: lesson.id } }, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: getGetWalletBalanceQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetLessonQueryKey(lesson.id) });
        toast({ title: "Lesson unlocked! 🔓", description: `${lesson.coinCost} coins deducted.` });
        onUnlocked();
      },
      onError: (err: any) => {
        if (err?.status === 402) {
          toast({ title: "Not enough coins", description: `You need ${lesson.coinCost} coins but only have ${balance?.coinBalance ?? 0}.`, variant: "destructive" });
        } else {
          toast({ title: "Couldn't unlock lesson", description: "Please try again.", variant: "destructive" });
        }
      },
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <Link href={`/learn/${courseId}`}>
        <Button variant="ghost" size="sm" className="absolute top-3 left-3 text-muted-foreground gap-1.5 h-8 px-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </Link>
      <Card className="max-w-sm w-full border-yellow-500/30">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-yellow-500/15 flex items-center justify-center mb-3">
            <Lock className="w-7 h-7 text-yellow-500" />
          </div>
          <h2 className="text-lg font-bold mb-1">{lesson.title}</h2>
          <p className="text-sm text-muted-foreground mb-4">This is a premium lesson. Unlock it to view the content and code example.</p>
          <Button
            className="gap-1.5 w-full bg-yellow-600 hover:bg-yellow-700 text-white"
            disabled={unlock.isPending}
            onClick={handleUnlock}
          >
            {unlock.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Coins className="w-4 h-4" />}
            Unlock for {lesson.coinCost} coins
          </Button>
          {!canAfford && (
            <Link href="/wallet" className="w-full mt-2">
              <Button variant="outline" size="sm" className="w-full gap-1.5">
                <Coins className="w-3.5 h-3.5" /> Not enough coins — Buy more
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const id = parseInt(lessonId || "0", 10);
  const { toast } = useToast();

  const { data: lesson, isLoading } = useGetLesson(id, {
    query: { enabled: !!id, queryKey: getGetLessonQueryKey(id) }
  });

  const markComplete = useMarkLessonComplete();
  const runCodeMutation = useRunCode();

  const [code, setCode] = useState("");
  const [originalCode, setOriginalCode] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [marked, setMarked] = useState(false);
  const markedRef = useRef(false);

  useEffect(() => {
    if (lesson && !code) {
      setCode(lesson.codeExample || "");
      setOriginalCode(lesson.codeExample || "");
    }
  }, [lesson]);

  useEffect(() => {
    return () => {
      if (id && !markedRef.current) {
        markedRef.current = true;
        markComplete.mutate({ data: { lessonId: id } }, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetUserProgressQueryKey() });
          }
        });
      }
    };
  }, [id]);

  const handleRun = () => {
    if (!lesson) return;
    runCodeMutation.mutate(
      { data: { language: lesson.language as any, code } },
      {
        onSuccess: (res) => setOutput(res.error ? `Error:\n${res.error}` : res.output),
        onError: (err: any) => setOutput(`Execution failed: ${err.message || "Unknown error"}`),
      }
    );
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({ title: "Copied!", description: "Code copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const handleReset = useCallback(() => {
    setCode(originalCode);
    setOutput("");
    toast({ title: "Reset", description: "Code reset to original example." });
  }, [originalCode]);

  const handleMarkComplete = () => {
    if (marked) return;
    markedRef.current = true;
    setMarked(true);
    markComplete.mutate({ data: { lessonId: id } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetUserProgressQueryKey() });
        toast({ title: "Lesson Complete! 🎉", description: `+${lesson?.xpReward} XP earned.` });
      }
    });
  };

  if (isLoading || !lesson) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if ((lesson as any).locked) {
    return (
      <div className="relative h-full">
        <PremiumLessonLock lesson={lesson} courseId={courseId} onUnlocked={() => {}} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      {/* Top bar */}
      <div className="px-3 py-2 border-b border-border flex items-center justify-between bg-card flex-shrink-0">
        <Link href={`/learn/${courseId}`}>
          <Button variant="ghost" size="sm" className="text-muted-foreground gap-1.5 h-8 px-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-primary px-2 py-0.5 bg-primary/10 rounded-full">{lesson.xpReward} XP</span>
          <Button
            size="sm"
            variant={marked ? "outline" : "default"}
            className={`h-7 text-xs gap-1.5 px-3 ${marked ? "text-green-500 border-green-500/30" : ""}`}
            onClick={handleMarkComplete}
            disabled={marked || markComplete.isPending}
          >
            {marked
              ? <><Check className="w-3 h-3" /> Done</>
              : <><ChevronRight className="w-3 h-3" /> Complete</>}
          </Button>
        </div>
      </div>

      {/* Mobile tabs: Content / Code */}
      <Tabs defaultValue="lesson" className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-full rounded-none border-b border-border h-10 bg-card flex-shrink-0">
          <TabsTrigger value="lesson" className="flex-1 gap-2 text-xs rounded-none">
            <BookOpen className="w-3.5 h-3.5" /> Lesson
          </TabsTrigger>
          <TabsTrigger value="code" className="flex-1 gap-2 text-xs rounded-none">
            <Code2 className="w-3.5 h-3.5" /> Code
          </TabsTrigger>
        </TabsList>

        {/* Lesson content */}
        <TabsContent value="lesson" className="flex-1 overflow-y-auto mt-0 data-[state=inactive]:hidden">
          <div className="p-4 pb-8">
            <h1 className="text-xl font-bold font-mono text-foreground mb-4">{lesson.title}</h1>
            <div className="text-foreground/80 whitespace-pre-wrap leading-relaxed text-sm space-y-3">
              {lesson.content}
            </div>
          </div>
        </TabsContent>

        {/* Code editor */}
        <TabsContent value="code" className="flex-1 flex flex-col min-h-0 mt-0 data-[state=inactive]:hidden">
          {/* Editor toolbar */}
          <div className="px-3 py-1.5 border-b border-border bg-[#1e1e1e] flex items-center gap-1 flex-shrink-0">
            <span className="px-2 py-0.5 text-xs font-mono bg-[#333] text-gray-300 rounded uppercase mr-1">{lesson.language}</span>
            <Button size="sm" variant="ghost" aria-label={copied ? "Copied" : "Copy code"} className="h-7 px-2 text-xs text-gray-400 hover:text-white hover:bg-[#333]" onClick={handleCopy}>
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </Button>
            <Button size="sm" variant="ghost" aria-label="Reset to original" className="h-7 px-2 text-xs text-gray-400 hover:text-white hover:bg-[#333]" onClick={handleReset}>
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
            <div className="flex-1" />
            <Button
              size="sm"
              onClick={handleRun}
              disabled={runCodeMutation.isPending}
              className="h-7 px-3 bg-green-600 hover:bg-green-700 text-white text-xs"
            >
              {runCodeMutation.isPending
                ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                : <Play className="w-3.5 h-3.5 mr-1 fill-current" />}
              Run
            </Button>
          </div>

          {/* Monaco editor */}
          <div className="flex-1 min-h-0">
            <MonacoEditor
              language={lesson.language === "c" ? "c" : lesson.language}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                padding: { top: 10, bottom: 10 },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                lineNumbers: "on",
                folding: false,
                tabSize: 2,
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
                autoClosingBrackets: "always",
                autoClosingQuotes: "always",
              }}
            />
          </div>

          {/* Output */}
          <div className="h-36 border-t border-[#333] bg-[#0d0d0d] flex flex-col flex-shrink-0">
            <div className="px-3 py-1.5 border-b border-[#333] text-xs font-mono text-gray-500 flex justify-between items-center">
              <span>Output</span>
              <div className="flex items-center gap-2">
                {runCodeMutation.isPending && <span className="text-yellow-400 animate-pulse text-xs">Running...</span>}
                {output && !runCodeMutation.isPending && (
                  <button onClick={() => setOutput("")} className="text-gray-600 hover:text-gray-400 text-xs">Clear</button>
                )}
              </div>
            </div>
            <div className="flex-1 p-3 overflow-y-auto font-mono text-xs text-gray-300 whitespace-pre-wrap">
              {output || <span className="text-gray-600">Run your code to see output here.</span>}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
