import { Router } from "express";
import vm from "vm";
import { execSync } from "child_process";

const router = Router();

router.post("/run", async (req, res) => {
  const { language, code } = req.body as { language: string; code: string };

  if (!language || !code) {
    res.status(400).json({ error: "language and code are required" });
    return;
  }

  const start = Date.now();

  try {
    if (language === "javascript") {
      const logs: string[] = [];
      const sandbox = {
        console: {
          log: (...args: unknown[]) => logs.push(args.map(String).join(" ")),
          error: (...args: unknown[]) => logs.push("[error] " + args.map(String).join(" ")),
          warn: (...args: unknown[]) => logs.push("[warn] " + args.map(String).join(" ")),
        },
        Math,
        JSON,
        Array,
        Object,
        String,
        Number,
        Boolean,
        parseInt,
        parseFloat,
        isNaN,
        isFinite,
        setTimeout: undefined,
        setInterval: undefined,
        fetch: undefined,
        require: undefined,
        process: undefined,
        global: undefined,
      };
      vm.runInNewContext(code, sandbox, { timeout: 5000 });
      const output = logs.join("\n") || "(no output)";
      res.json({ output, error: null, runtime: Date.now() - start });
      return;
    }

    if (language === "python") {
      try {
        const safeCode = code.replace(/'/g, "'\\''");
        const output = execSync(`python3 -c '${safeCode}'`, {
          timeout: 5000,
          encoding: "utf8",
          maxBuffer: 1024 * 64,
        });
        res.json({ output: output || "(no output)", error: null, runtime: Date.now() - start });
      } catch (e: unknown) {
        const err = e as { stderr?: string; stdout?: string };
        res.json({ output: err.stdout || "", error: err.stderr || "Execution error", runtime: Date.now() - start });
      }
      return;
    }

    if (language === "html" || language === "css") {
      res.json({
        output: `Preview rendered below. Note: HTML/CSS execution displays in the browser — copy your code into the editor and use the preview panel.`,
        error: null,
        runtime: Date.now() - start,
      });
      return;
    }

    // Java and C
    res.json({
      output: `[${language.toUpperCase()} execution]\nYour code was received. Server-side compilation for ${language} requires a runtime environment.\n\nExample output would appear here after compilation and execution.`,
      error: null,
      runtime: Date.now() - start,
    });
  } catch (e: unknown) {
    const err = e as Error;
    res.json({ output: "", error: err.message || "Execution error", runtime: Date.now() - start });
  }
});

export default router;
