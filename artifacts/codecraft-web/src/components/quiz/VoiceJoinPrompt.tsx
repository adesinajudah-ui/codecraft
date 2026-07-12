import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

interface VoiceJoinPromptProps {
  open: boolean;
  onJoin: () => void;
  onDismiss: () => void;
}

/** "Host has started the voice chat. Join?" prompt shown to non-host participants. */
export function VoiceJoinPrompt({ open, onJoin, onDismiss }: VoiceJoinPromptProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onDismiss()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
            <Mic className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Host has started the voice chat</DialogTitle>
          <DialogDescription className="text-center">
            Join to talk with everyone live, or keep playing without voice — you can join at any point during the
            competition.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button className="w-full gap-2" onClick={onJoin}>
            <Mic className="w-4 h-4" />
            Join Voice Chat
          </Button>
          <Button variant="outline" className="w-full" onClick={onDismiss}>
            Continue Without Voice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
