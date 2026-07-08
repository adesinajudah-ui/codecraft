import { useState } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useRunCode } from "@workspace/api-client-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Play, Loader2, Terminal, Code2, MonitorPlay } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DEFAULT_CODE: Record<string, string> = {
  javascript: 'console.log("Hello, CodeCraft!");',
  python: 'print("Hello, CodeCraft!")',
  html: '<h1>Hello, CodeCraft!</h1>',
  css: 'body { color: #38bdf8; }',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CodeCraft!");\n    }\n}',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, CodeCraft!\\n");\n    return 0;\n}'
};

export default function Editor() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [output, setOutput] = useState("");
  const runCode = useRunCode();

  const handleLanguageChange = (val: string) => {
    setLanguage(val);
    setCode(DEFAULT_CODE[val] || "");
    setOutput("");
  };

  const handleRun = () => {
    runCode.mutate(
      { data: { language: language as any, code } },
      {
        onSuccess: (res) => setOutput(res.error ? `Error:\n${res.error}` : res.output),
        onError: (err: any) => setOutput(`Execution failed: ${err.message || "Unknown error"}`),
      }
    );
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Toolbar */}
      <div className="px-3 py-2 border-b border-border bg-card flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-2 flex-1">
          <Terminal className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="font-mono font-bold text-sm">Playground</span>
          <div className="w-36">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={handleRun}
          disabled={runCode.isPending}
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white h-8 gap-1.5"
        >
          {runCode.isPending
            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : <Play className="w-3.5 h-3.5" />}
          Run
        </Button>
      </div>

      {/* Mobile: tabs for editor/output */}
      <Tabs defaultValue="editor" className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-full rounded-none border-b border-border h-9 bg-[#1e1e1e] flex-shrink-0">
          <TabsTrigger value="editor" className="flex-1 gap-1.5 text-xs rounded-none text-gray-400 data-[state=active]:text-white data-[state=active]:bg-[#333]">
            <Code2 className="w-3.5 h-3.5" /> Editor
          </TabsTrigger>
          <TabsTrigger value="output" className="flex-1 gap-1.5 text-xs rounded-none text-gray-400 data-[state=active]:text-white data-[state=active]:bg-[#333]">
            <MonitorPlay className="w-3.5 h-3.5" /> Output
            {output && <span className="w-1.5 h-1.5 rounded-full bg-green-400 ml-1" />}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="flex-1 min-h-0 mt-0 data-[state=inactive]:hidden">
          <MonacoEditor
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: "JetBrains Mono, monospace",
              padding: { top: 14, bottom: 14 },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              lineNumbers: "on",
              folding: false,
              tabSize: 2,
            }}
          />
        </TabsContent>

        <TabsContent value="output" className="flex-1 min-h-0 mt-0 bg-[#0d0d0d] flex flex-col data-[state=inactive]:hidden">
          <div className="px-4 py-2 bg-[#1e1e1e] border-b border-[#333] text-xs font-mono text-gray-400 flex justify-between items-center flex-shrink-0">
            <span>Terminal Output</span>
            {output && (
              <button onClick={() => setOutput("")} className="text-gray-600 hover:text-gray-400 text-xs">Clear</button>
            )}
            {runCode.isPending && <span className="text-yellow-400 animate-pulse">Running...</span>}
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm text-gray-300 whitespace-pre-wrap">
            {output || <span className="text-gray-600">Run your code to see output here.</span>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
