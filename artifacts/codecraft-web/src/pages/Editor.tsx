import { useState } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useRunCode } from "@workspace/api-client-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Play, Loader2, Terminal } from "lucide-react";

const DEFAULT_CODE = {
  javascript: 'console.log("Hello, CodeCraft!");',
  python: 'print("Hello, CodeCraft!")',
  html: '<h1>Hello, CodeCraft!</h1>',
  css: 'body { color: #38bdf8; }',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CodeCraft!");\n    }\n}',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, CodeCraft!\\n");\n    return 0;\n}'
};

export default function Editor() {
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [output, setOutput] = useState("");

  const runCode = useRunCode();

  const handleLanguageChange = (val: string) => {
    setLanguage(val);
    setCode((DEFAULT_CODE as any)[val] || "");
    setOutput("");
  };

  const handleRun = () => {
    runCode.mutate({
      data: {
        language: language as any,
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

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e]">
      <div className="p-3 border-b border-border/20 bg-background flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <Terminal className="w-5 h-5 text-primary" />
          <span className="font-mono font-bold">Playground</span>
          <div className="w-48">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="bg-[#1e1e1e] border-border/30 text-white">
                <SelectValue placeholder="Language" />
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
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {runCode.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
          Run Code
        </Button>
      </div>

      <div className="flex-1 min-h-0 flex flex-col md:flex-row">
        <div className="flex-1 border-r border-border/20 md:h-full h-[50vh]">
          <MonacoEditor
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 15,
              fontFamily: "JetBrains Mono, monospace",
              padding: { top: 16 },
            }}
          />
        </div>
        
        <div className="flex-1 md:w-1/3 bg-[#0d0d0d] flex flex-col md:h-full h-[30vh]">
          <div className="px-4 py-2 bg-[#1e1e1e] border-b border-border/20 text-xs font-mono text-muted-foreground">
            Terminal Output
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm text-gray-300 whitespace-pre-wrap">
            {output || <span className="text-gray-600">Output will appear here...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
