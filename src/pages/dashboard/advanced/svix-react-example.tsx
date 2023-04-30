import { hardcodedUsername, postWithAuth } from "@/auth";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SvixProvider = dynamic(
  {
    loader: () => import("svix-react").then((mod) => mod.SvixProvider),
  },
  {
    ssr: false,
  }
);

const SvixReactExample = dynamic(
  {
    loader: () =>
      import("@/components/advanced/SvixReactExample").then(
        (mod) => mod.SvixReactExample
      ),
  },
  {
    ssr: false,
  }
);

export default function SvixReactExampleDashboard() {
  const [token, setToken] = useState<string>();

  const appId = hardcodedUsername;

  async function getToken() {
    const res = await postWithAuth(appId, "/api/provider/app-portal", {});

    setToken(res.token);
  }

  useEffect(() => {
    getToken();
  }, []);

  if (!appId) {
    return <div>App Id not configured</div>;
  }

  if (!token) {
    return <div>Token not set</div>;
  }

  return (
    <SvixProvider appId={appId} token={token}>
      <SvixReactExample />
    </SvixProvider>
  );
}
