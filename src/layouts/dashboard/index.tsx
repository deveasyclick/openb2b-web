import { Outlet, useNavigate } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "./components/sidebar";
import { useFetchMe } from "@/queries/user";
import { useAuth } from "@clerk/react-router";
import { useEffect } from "react";

export default function DashboardLayout() {
  const { data: user, isLoading, isError } = useFetchMe();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  // Handle auth errors or missing user
  useEffect(() => {
    if (isError || !user) {
      signOut({ redirectUrl: "/signin" });
    }
  }, [isError, user, signOut]);

  // Redirect to onboarding if needed
  useEffect(() => {
    if (user && (!user.orgId || !user.org?.onboardedAt)) {
      navigate("/onboarding", { replace: true });
    }
  }, [user, navigate]);

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return null; // nothing to render until user is loaded or redirect happens
  }

  return (
    <SidebarProvider>
      {/* Full height flex container */}
      <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900 antialiased">
        {/* Sidebar */}
        <Sidebar user={user!} />

        {/* Content area */}
        <main className="flex flex-col flex-1 min-w-0">
          <SidebarTrigger className="mb-4" />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
