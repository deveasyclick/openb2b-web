import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarNavItems } from "./sidebarNavigationData";
import { NavLink, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import NavUser from "./NavUser";
import Icon from "@/components/icons";

// TODO: replace with real user data type
interface DashboardSidebarProps {
  readonly user: Record<string, string>;
}
export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const location = useLocation();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-5">
        <Logo imageAlt="OpenB2B logo" text="" />
      </SidebarHeader>
      <SidebarContent
        className={cn(
          "py-0 h-full scrollbar-thin scrollbar-thumb-secondary border-r border-border bg-gray-50 dark:bg-gray-900"
        )}
      >
        <SidebarMenu className="space-y-1">
          {sidebarNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  className={cn(
                    isActive && "bg-primary-500 text-white shadow-md"
                  )}
                >
                  <NavLink to={item.href}>
                    <Icon name={item.iconName} className="shrink-0" />
                    {item.label}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
