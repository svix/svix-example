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

export default function Sending() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const username = getClientUser();

  async function click() {
    setLoading(true);
    const ret = await postWithAuth(username, "/api/provider/partner-token", {});
    setToken(ret.token);
    setLoading(false);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Giving Partners Sending Access</h1>
      <div
        className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 max-w-xl mb-4"
        role="alert"
      >
        <p>
          Normally you would provide them with access during the onboarding process rather
          than just giving them the token in the UI. This is done as an example.
        </p>
      </div>
      {token ? (
        <div>
          Token is:
          <br />
          <code>{token}</code>
        </div>
      ) : (
        <LoadingButton
          loading={loading}
          value="Get partner sending token"
          onClick={click}
        />
      )}
    </>
  );
}
