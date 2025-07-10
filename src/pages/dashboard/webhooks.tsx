import { getClientUser, postWithAuth } from "@/auth";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "@/pages/_app";

import "svix-react/style.css";
import { SiteHeader } from "@/components/site-header";
import { AppPortal } from "svix-react";
import Head from "next/head";

function getURLWithCustomizations(url: string) {
  const urlObj = new URL(url);
  urlObj.searchParams.set("noGutters", "true");
  return urlObj.toString();
}

const Page: NextPageWithLayout = () => {
  const [appPortal, setAppPortal] = useState<string>();
  const username = getClientUser();

  async function getAppPortalUrl() {
    const res = await postWithAuth(username, "/api/provider/app-portal", {});
    const url = getURLWithCustomizations(res.url);
    setAppPortal(url);
  }

  useEffect(() => {
    getAppPortalUrl();
  }, []);

  return (
    <>
      <Head>
        <title>Webhooks | Acme Inc.</title>
      </Head>
      <div className="flex flex-1 flex-col">
        <SiteHeader title="Webhooks" />
        <div className="p-6">
          <AppPortal fullSize url={appPortal} />
        </div>
      </div>
    </>
  );
};

Page.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
