import { getClientUser, postWithAuth } from "@/auth";
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

export default function Agent() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const username = getClientUser();

  async function click() {
    setLoading(true);
    const ret = await postWithAuth(username, "/api/provider/agent-token", {});
    setToken(ret.bridgeToken);
    setLoading(false);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Direct Agent Access</h1>
      <div
        className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 max-w-xl mb-4"
        role="alert"
      >
        <p>
          This view is shown as access to partners, but the same can be applied for access
          for SIMAH. You just get this token, and set up bridge. The only thing that
          changes is which "application" you get the token for.
        </p>
      </div>
      {token ? (
        <div>
          <p>
            Set the SVIX_SUBSCRIPTION_TOKEN environment variable to the following:
            <br />
            <code style={{ overflowWrap: "anywhere" }}>{token}</code>
          </p>
          <p>
            Bridge config example:
            <pre>
              <code>
                {`
# The bridge config
receivers:
  - name: "poller"
    input:
      type: "svix-events"
      # Set to the value of 'bridgeToken' from the token response
      subscription_token: $SVIX_SUBSCRIPTION_TOKEN
    transformation: |
      function handler(input) {
        return { "payload": {...input, "eventType": input.eventType.toUpperCase() } }
      }
    output:
      type: "rabbitmq"
      uri: "amqp://guest:guest@localhost:5672/%2f"
      exchange: ""
      routing_key: "local"
`}
              </code>
            </pre>
          </p>
        </div>
      ) : (
        <LoadingButton loading={loading} value="Get agent token" onClick={click} />
      )}
    </>
  );
}
