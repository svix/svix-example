import { getClientUser, postWithAuth } from "@/auth";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AppPortal = dynamic(
  {
    loader: () => import("svix-react").then((mod) => mod.AppPortal),
  },
  {
    ssr: false,
  }
);

import "svix-react/style.css";

export default function WebhooksDashboard() {
  const [appPortal, setAppPortal] = useState<string>();
  const username = getClientUser();

  async function getAppPortalUrl() {
    const res = await postWithAuth(username, "/api/provider/app-portal", {});

    setAppPortal(res.url);
  }

  useEffect(() => {
    getAppPortalUrl();
  }, []);

  return <AppPortal fullSize url={appPortal} />;
}
