import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "./components/sidebar";

/**
 * Dashboard Layout Component
 *
 * Provides a consistent layout for all dashboard pages with:
 * - Header with user menu
 * - Sidebar navigation
 * - Main content area that renders child routes via Outlet
 */

// TODO: replace with real user data type
const user = {
  firstName: "Sam",
  lastName: "Adama",
  email: "sam@example.com",
  avatar: "https://i.pravatar.cc/150?img=3",
  role: "admin",
};
export default function DashboardLayout() {
  return (
    <SidebarProvider>
      {/* Full height flex container */}
      <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900 antialiased">
        {/* Sidebar */}
        <Sidebar user={user} />

        {/* Content area */}
        <main className="flex flex-col flex-1 min-w-0">
          <SidebarTrigger className="mb-4" />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
