import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "wouter";
import { useGetLesson, useMarkLessonComplete, useRunCode, getGetLessonQueryKey } from "@workspace/api-client-react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Play, CheckCircle2 } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { getGetUserProgressQueryKey } from "@workspace/api-client-react";

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const id = parseInt(lessonId || "0", 10);
  
  const { data: lesson, isLoading } = useGetLesson(id, {
    query: { enabled: !!id, queryKey: getGetLessonQueryKey(id) }
  });

  const markComplete = useMarkLessonComplete();
  const runCodeMutation = useRunCode();
  
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  
  const markedRef = useRef(false);

  useEffect(() => {
    if (lesson && !code) {
      setCode(lesson.codeExample || "");
    }
  }, [lesson]);

  useEffect(() => {
    return () => {
      // Mark complete on exit if we have lesson id
      if (id && !markedRef.current) {
        markedRef.current = true;
        markComplete.mutate({ data: { lessonId: id } }, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetUserProgressQueryKey() });
          }
        });
      }
    };
  }, [id, markComplete]);

  const handleRun = () => {
    if (!lesson) return;
    runCodeMutation.mutate({
      data: {
        language: lesson.language as any,
        code
      }
    }, {
      onSuccess: (res) => {
        setOutput(res.error ? `Error:\n${res.error}` : res.output);
      },
      onError: (err: any) => {
        setOutput(`Execution failed: ${err.message || "Unknown error"}`);
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

  return (
    <div className="flex h-full flex-col lg:flex-row overflow-hidden bg-background">
      {/* Content panel */}
      <div className="flex-1 lg:w-1/2 flex flex-col border-r border-border overflow-y-auto">
        <div className="p-4 border-b border-border flex items-center justify-between bg-card sticky top-0 z-10">
          <Link href={`/learn/${courseId}`}>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="text-sm font-mono text-primary px-3 py-1 bg-primary/10 rounded-full">
            {lesson.xpReward} XP
          </div>
        </div>
        <div className="p-8 prose prose-invert prose-slate max-w-none">
          <h1 className="text-3xl font-bold font-mono text-foreground">{lesson.title}</h1>
          <div className="text-muted-foreground whitespace-pre-wrap mt-6 leading-relaxed text-lg">
            {lesson.content}
          </div>
        </div>
      </div>

      {/* Editor panel */}
      <div className="flex-1 lg:w-1/2 flex flex-col h-[50vh] lg:h-full bg-[#1e1e1e]">
        <div className="p-2 border-b border-border/50 bg-[#1e1e1e] flex justify-between items-center">
          <span className="px-3 text-xs font-mono text-muted-foreground uppercase">{lesson.language}</span>
          <Button 
            size="sm" 
            onClick={handleRun}
            disabled={runCodeMutation.isPending}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {runCodeMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
            Run Code
          </Button>
        </div>
        
        <div className="flex-1 min-h-0">
          <MonacoEditor
            language={lesson.language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "JetBrains Mono, monospace",
              padding: { top: 16 },
              scrollBeyondLastLine: false,
            }}
          />
        </div>
        
        <div className="h-1/3 border-t border-border/50 bg-[#0d0d0d] flex flex-col">
          <div className="px-4 py-2 border-b border-border/50 text-xs font-mono text-muted-foreground flex justify-between">
            <span>Terminal Output</span>
            {runCodeMutation.isPending && <span className="text-yellow-500 animate-pulse">Running...</span>}
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm text-gray-300 whitespace-pre-wrap">
            {output || <span className="text-gray-600">No output yet. Click 'Run Code' to execute.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
