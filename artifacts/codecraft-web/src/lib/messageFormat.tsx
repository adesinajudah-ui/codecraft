import { Fragment } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Part =
  | { type: "text"; value: string }
  | { type: "code"; value: string; language: string }
  | { type: "inline-code"; value: string }
  | { type: "mention"; value: string };

const CODE_BLOCK_RE = /```(\w*)\n?([\s\S]*?)```/g;
const INLINE_CODE_RE = /`([^`\n]+)`/g;
const MENTION_RE = /@([a-zA-Z0-9_]{3,24})/g;

function splitInline(text: string): Part[] {
  const parts: Part[] = [];
  let lastIndex = 0;
  const combined = new RegExp(`${INLINE_CODE_RE.source}|${MENTION_RE.source}`, "g");
  let match: RegExpExecArray | null;
  while ((match = combined.exec(text))) {
    if (match.index > lastIndex) parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    if (match[1] !== undefined) {
      parts.push({ type: "inline-code", value: match[1] });
    } else if (match[2] !== undefined) {
      parts.push({ type: "mention", value: match[2] });
    }
    lastIndex = combined.lastIndex;
  }
  if (lastIndex < text.length) parts.push({ type: "text", value: text.slice(lastIndex) });
  return parts;
}

export function parseMessageParts(content: string): Part[] {
  const parts: Part[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(CODE_BLOCK_RE.source, "g");
  while ((match = re.exec(content))) {
    if (match.index > lastIndex) parts.push(...splitInline(content.slice(lastIndex, match.index)));
    parts.push({ type: "code", value: match[2] ?? "", language: match[1] || "text" });
    lastIndex = re.lastIndex;
  }
  if (lastIndex < content.length) parts.push(...splitInline(content.slice(lastIndex)));
  return parts;
}

export function MessageContent({ content, isMentioned }: { content: string; isMentioned?: (username: string) => boolean }) {
  const parts = parseMessageParts(content);
  return (
    <span className="whitespace-pre-wrap break-words text-sm leading-relaxed">
      {parts.map((part, i) => {
        if (part.type === "code") {
          return (
            <span key={i} className="block my-1.5 rounded-md overflow-hidden border border-border/60 text-xs">
              <SyntaxHighlighter
                language={part.language}
                style={oneDark}
                customStyle={{ margin: 0, padding: "8px 10px", fontSize: "12px", background: "hsl(var(--muted))" }}
                wrapLongLines
              >
                {part.value.replace(/\n$/, "")}
              </SyntaxHighlighter>
            </span>
          );
        }
        if (part.type === "inline-code") {
          return (
            <code key={i} className="px-1 py-0.5 rounded bg-muted text-primary font-mono text-[0.85em]">
              {part.value}
            </code>
          );
        }
        if (part.type === "mention") {
          const active = isMentioned ? isMentioned(part.value) : true;
          return (
            <span
              key={i}
              className={active ? "font-semibold text-primary bg-primary/10 rounded px-1" : "font-semibold text-primary/80"}
            >
              @{part.value}
            </span>
          );
        }
        return <Fragment key={i}>{part.value}</Fragment>;
      })}
    </span>
  );
}

export function extractMentions(content: string): string[] {
  const mentions = new Set<string>();
  let match: RegExpExecArray | null;
  const re = new RegExp(MENTION_RE.source, "g");
  while ((match = re.exec(content))) mentions.add(match[1]);
  return [...mentions];
}
