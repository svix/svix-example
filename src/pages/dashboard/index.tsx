import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { DataTable } from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import { SiteHeader } from "@/components/site-header";
import { InfoIcon } from "lucide-react";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { NextPageWithLayout } from "@/pages/_app";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <SiteHeader title="Dashboard" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-6">
              <Alert variant="info">
                <AlertTitle className="flex items-center">
                  <InfoIcon className="mr-2 h-4 w-4" /> About this dashboard
                </AlertTitle>
                <AlertDescription>
                  This dashboard is an example application. Normally, customers would use
                  it to manage all aspects of your application, including <b>webhooks</b>.
                  <br />
                  Click on the{" "}
                  <Link href="/dashboard/webhooks" className="underline">
                    Webhooks
                  </Link>{" "}
                  tab to see how the Svix consumer application portal can look like in
                  your application.
                </AlertDescription>
              </Alert>
            </div>
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable />
          </div>
        </div>
      </div>
    </>
  );
};

Page.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
