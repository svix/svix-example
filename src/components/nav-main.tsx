import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Webhook, Code } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
  currentPath,
}: {
  items: {
    title: string;
    url: string;
    icon?: typeof Webhook;
  }[];
  currentPath?: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = currentPath === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} asChild isActive={isActive}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
        <SidebarMenu>
          <HighlightedSidebarMenuButton
            href="/dashboard/webhooks"
            currentPath={currentPath}
            icon={<Webhook />}
            title="Webhooks"
          />
          {/* <HighlightedSidebarMenuButton
            href="/dashboard/advanced/svix-react-example"
            currentPath={currentPath}
            icon={<Code />}
            title="Webhooks (custom)"
          /> */}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function HighlightedSidebarMenuButton({
  href,
  currentPath,
  icon,
  title,
}: {
  href: string;
  currentPath?: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <SidebarMenuItem className="flex items-center gap-2">
      <SidebarMenuButton
        tooltip={title}
        className={cn(
          "border border-[#333380]/50 bg-[#333380]/30 text-indigo-100 hover:bg-[#333380]/50 hover:text-white active:bg-[#333380] active:text-white",
          currentPath === href &&
            "bg-[#333380] text-white hover:bg-[#333380] hover:text-white active:bg-[#333380] active:text-white"
        )}
        asChild
      >
        <Link href={href}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
