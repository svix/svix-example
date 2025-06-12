import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  getClientUser,
  getExampleEventTypes,
  getUsecaseFromUsername,
  postWithAuth,
} from "@/auth";
import { useState } from "react";
import type { ReactNode } from "react";

interface WebhookDialogProps {
  trigger: ReactNode;
}

export default function WebhookDialog({ trigger }: WebhookDialogProps) {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const username = getClientUser();
  const [eventType1, eventType2] = getExampleEventTypes(getUsecaseFromUsername(username));

  async function webhook1() {
    setLoading1(true);
    await postWithAuth(username, "/api/provider/fake-server-action", {
      type: eventType1,
    });
    setLoading1(false);
  }

  async function webhook2() {
    setLoading2(true);
    await postWithAuth(username, "/api/provider/fake-server-action", {
      type: eventType2,
    });
    setLoading2(false);
  }

  const LoadingSpinner = () => (
    <span className="flex items-center gap-2">
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      Loading...
    </span>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Send Example Webhooks
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            This dashboard is an example application. Normally customers would be able to
            do something useful, in this example they just have buttons that fake creating
            actions in order to trigger webhooks.
            <br />
            <br />
            These buttons use the{" "}
            <a
              href="https://api.svix.com/docs#tag/Message/operation/v1.message.create"
              className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              message sending API
            </a>{" "}
            behind the scenes to send webhooks to the{" "}
            <a
              href="https://docs.svix.com/quickstart"
              className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              consumer application
            </a>{" "}
            when created on signup.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-6">
          <Button variant="default" size="lg" disabled={loading1} onClick={webhook1}>
            {loading1 ? (
              <LoadingSpinner />
            ) : (
              <span className="flex items-center">
                Trigger
                <span className="font-mono ml-2">{eventType1}</span>
              </span>
            )}
          </Button>
          <Button variant="default" size="lg" disabled={loading2} onClick={webhook2}>
            {loading2 ? (
              <LoadingSpinner />
            ) : (
              <span className="flex items-center">
                Trigger
                <span className="font-mono ml-2">{eventType2}</span>
              </span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
