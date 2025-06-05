import {
  getClientUser,
  getExampleEventTypes,
  getUsecaseFromUsername,
  postWithAuth,
} from "@/auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function LoadingButton(props: { loading: boolean; value: string; onClick: () => void }) {
  return (
    <Button disabled={props.loading} onClick={props.loading ? undefined : props.onClick}>
      {props.loading ? "Loading..." : props.value}
    </Button>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const username = getClientUser();
  const [eventType1, eventType2] = getExampleEventTypes(getUsecaseFromUsername(username));

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
    <>
      <h1 className="text-3xl font-bold underline">Send Example Webhooks</h1>
      <div
        className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 max-w-xl mb-4"
        role="alert"
      >
        <p>
          This dashboard is an example application <q>Main Page</q>. Normally customers
          would be able to do something useful, in this example they just have buttons
          that fake creating actions in order to trigger webhooks.
        </p>
        <p>
          These buttons use the{" "}
          <a
            href="https://api.svix.com/docs#tag/Message/operation/v1.message.create"
            className="font-bold"
          >
            message sending API
          </a>{" "}
          behind the scenes to send webhooks to the{" "}
          <a href="https://docs.svix.com/quickstart" className="font-bold">
            consumer application
          </a>{" "}
          when created on signup.
        </p>
      </div>
      <div className="flex space-x-4">
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
    </>
  );
}
