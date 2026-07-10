import { useEffect, useRef } from "react";

type Handlers = {
  onMessageNew?: (data: unknown) => void;
  onMessageDeleted?: (data: { messageId: number }) => void;
  onReactionUpdated?: (data: { messageId: number; reactions: unknown[] }) => void;
  onTyping?: (data: { userId: string }) => void;
  onPresence?: (data: { userId: string; online: boolean }) => void;
  onMemberJoined?: (data: { userId: string }) => void;
  onMemberLeft?: (data: { userId: string }) => void;
  onMemberUpdated?: (data: { userId: string; role: string }) => void;
  onGroupUpdated?: () => void;
  onGroupDeleted?: () => void;
};

/** Subscribes to real-time study group events over SSE (mirrors the quiz-session SSE pattern). */
export function useStudyGroupEvents(groupId: number | null, handlers: Handlers) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    if (!groupId) return;

    const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
    const url = `${basePath}/api/study-groups/${groupId}/events`;
    const es = new EventSource(url);

    const bind = (event: string, cb?: (data: any) => void) => {
      if (!cb) return;
      es.addEventListener(event, (e: MessageEvent) => {
        try {
          cb(JSON.parse(e.data));
        } catch {
          cb(undefined);
        }
      });
    };

    bind("message_new", (d) => handlersRef.current.onMessageNew?.(d));
    bind("message_deleted", (d) => handlersRef.current.onMessageDeleted?.(d));
    bind("reaction_updated", (d) => handlersRef.current.onReactionUpdated?.(d));
    bind("typing", (d) => handlersRef.current.onTyping?.(d));
    bind("presence", (d) => handlersRef.current.onPresence?.(d));
    bind("member_joined", (d) => handlersRef.current.onMemberJoined?.(d));
    bind("member_left", (d) => handlersRef.current.onMemberLeft?.(d));
    bind("member_updated", (d) => handlersRef.current.onMemberUpdated?.(d));
    bind("group_updated", () => handlersRef.current.onGroupUpdated?.());
    bind("group_deleted", () => handlersRef.current.onGroupDeleted?.());

    es.onerror = () => {
      // EventSource auto-reconnects
    };

    return () => es.close();
  }, [groupId]);
}

export async function sendTypingPing(groupId: number) {
  const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  try {
    await fetch(`${basePath}/api/study-groups/${groupId}/typing`, { method: "POST", credentials: "include" });
  } catch {
    // best-effort
  }
}
