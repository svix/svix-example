import { getClientUser, postWithAuth } from "@/auth";
import { useEffect, useState } from "react";
import { SvixProvider, useMessages } from "svix-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { NextPageWithLayout } from "@/pages/_app";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import WebhookDialog from "@/components/webhook-dialog";
import Head from "next/head";

const EmptyState = () => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-muted p-3">
          <svg
            className="h-6 w-6 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold">No messages</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get started by sending a few messages.
        </p>
        <WebhookDialog trigger={<Button className="mt-6">Send message</Button>} />
      </CardContent>
    </Card>
  );
};

const InboundMessages = () => {
  const { data: messages, loading } = useMessages();
  if (loading || !messages) {
    return <div>Loading messages...</div>;
  }

  if (messages.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {messages.map((m, index) => (
        <div key={m.id}>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-muted p-2">
              <img
                className="h-6 w-6"
                src="https://img.icons8.com/external-sbts2018-outline-color-sbts2018/58/null/external-subscribe-basic-ui-elements-2.2-sbts2018-outline-color-sbts2018.png"
                alt=""
              />
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-medium">{m.eventType}</p>
              <p className="text-sm text-muted-foreground">{"@" + m.id}</p>
              <p className="text-sm text-muted-foreground">
                <time dateTime={m.timestamp.toISOString()}>
                  {new Date(m.timestamp).toLocaleString()}
                </time>
              </p>
            </div>
          </div>
          {index < messages.length - 1 && (
            <div className="my-5 border-t border-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
};

const Page: NextPageWithLayout = () => {
  const [token, setToken] = useState<string>();

  const username = getClientUser();

  async function getToken() {
    const res = await postWithAuth(username, "/api/provider/app-portal", {});
    setToken(res.token);
  }

  useEffect(() => {
    getToken();
  }, []);

  if (!username) {
    return (
      <div className="flex flex-1 flex-col">
        <SiteHeader title="Custom Webhooks Portal" />
        <div className="p-6">
          <div>App Id not configured</div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex flex-1 flex-col">
        <SiteHeader title="Custom Webhooks Portal" />
        <div className="p-6">
          <div>Token not set</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader title="Custom Webhooks Portal" />

      <div className="p-6 space-y-6">
        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertTitle>About this example</AlertTitle>
          <AlertDescription>
            This page shows an example custom webhooks portal created with the{" "}
            <a
              href="https://www.npmjs.com/package/svix-react"
              className="font-medium underline underline-offset-4"
            >
              Svix React.js library
            </a>
            .<br />
            This gives you the ability to build custom workflows and designs not possible
            with the commonly used{" "}
            <a
              href="https://docs.svix.com/app-portal"
              className="font-medium underline underline-offset-4"
            >
              embeddable application portal
            </a>
            .
          </AlertDescription>
        </Alert>

        <SvixProvider
          appId={username}
          token={token}
          options={{ serverUrl: process.env.NEXT_PUBLIC_SVIX_SERVER_URL }}
        >
          <div className="flex flex-col gap-8">
            <InboundMessages />
          </div>
        </SvixProvider>
      </div>
    </div>
  );
};

Page.getLayout = (page: React.ReactNode) => {
  return (
    <>
      <DashboardLayout>
        <Head>
          <title>Custom Webhooks Portal | Acme Inc.</title>
        </Head>
        {page}
      </DashboardLayout>
    </>
  );
};

export default Page;
