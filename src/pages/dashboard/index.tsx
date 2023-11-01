import { getClientUser, postWithAuth } from "@/auth";
import { useState } from "react";

function LoadingButton(props: { loading: boolean; value: string; onClick: () => void }) {
  return (
    <button
      className="
bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer w-48
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

  async function invoiceCreated() {
    setLoading(true);
    await postWithAuth(username, "/api/provider/fake-server-action", {
      type: "invoice.created",
    });
    setLoading(false);
  }

  async function invoiceDeleted() {
    setLoading(true);
    await postWithAuth(username, "/api/provider/fake-server-action", {
      type: "invoice.deleted",
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
          that fake creating invoices in order to trigger webhooks.
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
          value="Create the invoice"
          onClick={invoiceCreated}
        />
        <LoadingButton
          loading={loading}
          value="Delete the invoice"
          onClick={invoiceDeleted}
        />
      </div>
    </>
  );
}
