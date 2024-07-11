import {
  getClientUser,
  getExampleEventTypes,
  getUsecaseFromUsername,
  postWithAuth,
} from "@/auth";
import { useState } from "react";

function LoadingButton(props: { loading: boolean; value: string; onClick: () => void }) {
  return (
    <button
      className="
bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer
      "
      disabled={props.loading}
      onClick={props.loading ? undefined : props.onClick}
    >
      {props.loading ? "Loading..." : props.value}
    </button>
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
      <h1 className="text-3xl font-bold underline">This is an example app</h1>
      <div
        className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 max-w-xl mb-4"
        role="alert"
      >
        <p>
          This dashboard is an example application <q>Main Page</q>. This whole "app"
          won't actually be used. Instead the Webhooks Portal tab will just be embedded in
          the SIMAH application where SIMAH would want partners to set their webhooks.
        </p>
        <p>
          While this is an example for partners, the same applies to SIMAH when SIMAH is
          the receiver.
        </p>
        <p>
          These buttons are just examples for fake activity. They use the{" "}
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
          when created for the partner.
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
