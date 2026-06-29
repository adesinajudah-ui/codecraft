import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, Link } from "wouter";
import { useGetLesson, useMarkLessonComplete, useRunCode, getGetLessonQueryKey } from "@workspace/api-client-react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Play, Copy, Download, RotateCcw, Maximize2, Minimize2, CheckCircle2, Check, ChevronRight } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { getGetUserProgressQueryKey } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

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
  const [fullscreen, setFullscreen] = useState(false);
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

  const handleDownload = useCallback(() => {
    const ext: Record<string, string> = { javascript: "js", python: "py", html: "html", css: "css", java: "java", c: "c" };
    const filename = `lesson-${id}.${ext[lesson?.language || ""] || "txt"}`;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded!", description: `Saved as ${filename}` });
  }, [code, lesson, id]);

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

  const editorPanel = (
    <div className={`flex flex-col bg-[#1e1e1e] ${fullscreen ? "fixed inset-0 z-50" : "flex-1 lg:w-1/2 h-[55vh] lg:h-full"}`}>
      {/* Editor toolbar */}
      <div className="px-3 py-1.5 border-b border-[#333] flex items-center gap-1 flex-wrap">
        <span className="px-2 py-0.5 text-xs font-mono bg-[#333] text-gray-300 rounded uppercase mr-2">{lesson.language}</span>
        <div className="flex items-center gap-1 flex-1 flex-wrap">
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-gray-400 hover:text-white hover:bg-[#333]" onClick={handleCopy}>
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="ml-1 hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </Button>
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-gray-400 hover:text-white hover:bg-[#333]" onClick={handleReset}>
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="ml-1 hidden sm:inline">Reset</span>
          </Button>
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-gray-400 hover:text-white hover:bg-[#333]" onClick={handleDownload}>
            <Download className="w-3.5 h-3.5" />
            <span className="ml-1 hidden sm:inline">Download</span>
          </Button>
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-gray-400 hover:text-white hover:bg-[#333]" onClick={() => setFullscreen(f => !f)}>
            {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </Button>
        </div>
        <Button
          size="sm"
          onClick={handleRun}
          disabled={runCodeMutation.isPending}
          className="h-7 px-3 bg-green-600 hover:bg-green-700 text-white text-xs"
        >
          {runCodeMutation.isPending ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Play className="w-3.5 h-3.5 mr-1 fill-current" />}
          Run
        </Button>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
          language={lesson.language === "c" ? "c" : lesson.language}
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            padding: { top: 12, bottom: 12 },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            lineNumbers: "on",
            folding: true,
            tabSize: 2,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            autoClosingBrackets: "always",
            autoClosingQuotes: "always",
            formatOnPaste: true,
          }}
        />
      </div>

      {/* Output panel */}
      <div className="h-[35%] min-h-[100px] border-t border-[#333] bg-[#0d0d0d] flex flex-col">
        <div className="px-4 py-1.5 border-b border-[#333] text-xs font-mono text-gray-500 flex justify-between items-center">
          <span>Output</span>
          <div className="flex items-center gap-3">
            {runCodeMutation.isPending && <span className="text-yellow-400 animate-pulse">● Running...</span>}
            {output && !runCodeMutation.isPending && (
              <button onClick={() => setOutput("")} className="text-gray-600 hover:text-gray-400 text-xs">Clear</button>
            )}
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm text-gray-300 whitespace-pre-wrap">
          {output || <span className="text-gray-600">Run your code to see output here.</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col lg:flex-row overflow-hidden bg-background">
      {/* Content panel */}
      {!fullscreen && (
        <div className="flex-1 lg:w-1/2 flex flex-col border-r border-border overflow-y-auto">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-card sticky top-0 z-10">
            <Link href={`/learn/${courseId}`}>
              <Button variant="ghost" size="sm" className="text-muted-foreground gap-2 h-8">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-primary px-2 py-1 bg-primary/10 rounded-full">{lesson.xpReward} XP</span>
              <Button
                size="sm"
                variant={marked ? "outline" : "default"}
                className={`h-8 text-xs gap-2 ${marked ? "text-green-500 border-green-500/30" : ""}`}
                onClick={handleMarkComplete}
                disabled={marked || markComplete.isPending}
              >
                {marked ? <><Check className="w-3.5 h-3.5" /> Done</> : <><ChevronRight className="w-3.5 h-3.5" /> Mark Complete</>}
              </Button>
            </div>
          </div>
          <div className="p-6 md:p-8 max-w-none">
            <h1 className="text-2xl md:text-3xl font-bold font-mono text-foreground mb-6">{lesson.title}</h1>
            <div className="text-foreground/80 whitespace-pre-wrap leading-relaxed text-base space-y-4">
              {lesson.content}
            </div>
          </div>
        </div>
      )}

      {editorPanel}
    </div>
  );
}
