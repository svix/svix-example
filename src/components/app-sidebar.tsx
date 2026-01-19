import * as React from "react";
import { useRouter } from "next/router";
import { BarChart, LayoutDashboard, Users, Zap, Anvil } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import WebhookDialog from "@/components/webhook-dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart,
    },
    {
      title: "Team",
      url: "#",
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="/dashboard">
                <Anvil />
                <span className="text-base font-semibold">Anvil Technologies</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} currentPath={currentPath} />
      </SidebarContent>
      <SidebarFooter>
        <WebhookDialog
          trigger={
            <SidebarMenuButton className="active:bg-yellow-600 border-1 border-yellow-200 bg-yellow-50 active:text-white hover:bg-yellow-50 hover:text-yellow-600">
              <Zap className="!size-5 text-yellow-500" />
              <span>Send Webhook</span>
            </SidebarMenuButton>
          }
        />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
