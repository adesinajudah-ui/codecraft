import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, PhoneOff, Users, ChevronDown, ChevronUp, UserX, Radio } from "lucide-react";
import type { VoicePeer, VoiceChatStatus } from "@/hooks/useVoiceChat";

function formatTimer(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function initials(name: string): string {
  return name.trim().slice(0, 2).toUpperCase() || "?";
}

interface VoicePanelProps {
  status: VoiceChatStatus;
  peers: VoicePeer[];
  selfDisplayName: string;
  selfMuted: boolean;
  selfSpeaking: boolean;
  isHost: boolean;
  elapsedSeconds: number;
  onToggleMute: () => void;
  onLeave: () => void;
  onKick: (userId: string) => void;
}

/**
 * Floating voice-call HUD — pinned to a corner so it never covers the quiz
 * question/options. Collapsible down to just the mic/leave/timer row.
 */
export function VoicePanel({
  status,
  peers,
  selfDisplayName,
  selfMuted,
  selfSpeaking,
  isHost,
  elapsedSeconds,
  onToggleMute,
  onLeave,
  onKick,
}: VoicePanelProps) {
  const [expanded, setExpanded] = useState(true);
  const totalConnected = peers.length + 1;

  return (
    <div className="fixed bottom-4 right-4 z-40 w-72 rounded-2xl border border-border bg-card/95 backdrop-blur shadow-xl overflow-hidden">
      {/* Header row — always visible */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-secondary/50">
        <div className="flex items-center gap-2 min-w-0">
          <Radio className="w-4 h-4 text-green-400 shrink-0" />
          <span className="text-sm font-semibold truncate">Voice Chat</span>
          <Badge variant="secondary" className="text-[10px] gap-1 shrink-0">
            <Users className="w-3 h-3" />
            {totalConnected}
          </Badge>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-muted-foreground">{formatTimer(elapsedSeconds)}</span>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="text-muted-foreground hover:text-foreground"
            aria-label={expanded ? "Collapse voice panel" : "Expand voice panel"}
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="p-3 space-y-3">
          {status === "connecting" || status === "requesting-mic" ? (
            <p className="text-xs text-muted-foreground text-center py-2">Connecting to voice chat…</p>
          ) : (
            <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
              {/* Self row */}
              <div className="flex items-center justify-between bg-secondary/40 rounded-lg px-2 py-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold bg-primary/20 text-primary shrink-0 ${
                      selfSpeaking ? "ring-2 ring-green-400" : ""
                    }`}
                  >
                    {initials(selfDisplayName)}
                  </div>
                  <span className="text-sm truncate">{selfDisplayName}</span>
                  <span className="text-[10px] text-muted-foreground">(you)</span>
                </div>
                {selfMuted && <MicOff className="w-3.5 h-3.5 text-red-400 shrink-0" />}
              </div>

              {peers.map((p) => (
                <div key={p.userId} className="flex items-center justify-between bg-secondary/40 rounded-lg px-2 py-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold bg-muted text-foreground shrink-0 ${
                        p.speaking ? "ring-2 ring-green-400" : ""
                      }`}
                    >
                      {initials(p.displayName)}
                    </div>
                    <span className="text-sm truncate">{p.displayName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {p.muted && <MicOff className="w-3.5 h-3.5 text-red-400" />}
                    {isHost && (
                      <button
                        type="button"
                        onClick={() => onKick(p.userId)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label={`Remove ${p.displayName} from voice chat`}
                        title="Remove from voice chat"
                      >
                        <UserX className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant={selfMuted ? "destructive" : "secondary"}
              className="flex-1 gap-1.5"
              onClick={onToggleMute}
            >
              {selfMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {selfMuted ? "Unmute" : "Mute"}
            </Button>
            <Button type="button" size="sm" variant="outline" className="gap-1.5 text-destructive hover:text-destructive" onClick={onLeave}>
              <PhoneOff className="w-4 h-4" />
              Leave
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
