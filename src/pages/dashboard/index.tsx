import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  getClientUser,
  getExampleEventTypes,
  getUsecaseFromUsername,
  postWithAuth,
} from "@/auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SvixProvider, useMessages } from "svix-react";
import "svix-react/style.css";

function LoadingButton(props: { loading: boolean; value: string; onClick: () => void }) {
  return (
    <Button disabled={props.loading} onClick={props.loading ? undefined : props.onClick}>
      {props.loading ? "Loading..." : props.value}
    </Button>
  );
}

const AppPortal = dynamic(
  {
    loader: () => import("svix-react").then((mod) => mod.AppPortal),
  },
  { ssr: false }
);

function CustomPortal() {
  const [token, setToken] = useState<string>();
  const username = getClientUser();

  useEffect(() => {
    async function fetchToken() {
      const res = await postWithAuth(username, "/api/provider/app-portal", {});
      setToken(res.token);
    }
    fetchToken();
  }, [username]);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <SvixProvider appId={username} token={token}>
      <InboundMessages />
    </SvixProvider>
  );
}

function InboundMessages() {
  const { data: messages, loading } = useMessages();
  if (loading || !messages) {
    return <div>Loading messages...</div>;
  }
  if (messages.length === 0) {
    return <div className="text-center text-sm text-muted-foreground">No messages</div>;
  }
  return (
    <ul className="space-y-4">
      {messages.map((m) => (
        <li key={m.id} className="rounded border p-4">
          <p className="font-medium">{m.eventType}</p>
          <p className="text-sm text-muted-foreground">@{m.id}</p>
          <p className="text-sm">
            <time dateTime={m.timestamp.toISOString()}>{m.timestamp.toISOString()}</time>
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const username = getClientUser();
  const [eventType1, eventType2] = getExampleEventTypes(getUsecaseFromUsername(username));
  const [appPortal, setAppPortal] = useState<string>();

  useEffect(() => {
    async function fetchPortal() {
      const res = await postWithAuth(username, "/api/provider/app-portal", {});
      setAppPortal(res.url);
    }
    fetchPortal();
  }, [username]);

  async function webhook1() {
    setLoading(true);
    await postWithAuth(username, "/api/provider/fake-server-action", {
      type: eventType1,
    });
    setLoading(false);
  }

  async function webhook2() {
    setLoading(true);
    await postWithAuth(username, "/api/provider/fake-server-action", {
      type: eventType2,
    });
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Example Dashboard</h1>
      <Tabs defaultValue="send">
        <TabsList>
          <TabsTrigger value="send">Send Webhooks</TabsTrigger>
          <TabsTrigger value="portal">Webhooks Portal</TabsTrigger>
          <TabsTrigger value="custom">Custom Webhooks Portal</TabsTrigger>
        </TabsList>
        <TabsContent value="send">
          <p className="text-sm text-muted-foreground mb-4">
            Use these buttons to trigger example webhook events.
          </p>
          <div className="flex gap-4">
            <LoadingButton
              loading={loading}
              value={`Trigger "${eventType1}"`}
              onClick={webhook1}
            />
            <LoadingButton
              loading={loading}
              value={`Trigger "${eventType2}"`}
              onClick={webhook2}
            />
          </div>
        </TabsContent>
        <TabsContent value="portal" className="mt-4">
          <AppPortal fullSize url={appPortal} />
        </TabsContent>
        <TabsContent value="custom" className="mt-4">
          <CustomPortal />
        </TabsContent>
      </Tabs>
    </div>
  );
}
