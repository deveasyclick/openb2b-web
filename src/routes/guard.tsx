import { Navigate, Outlet } from "react-router";
// src/components/RequireRole.tsx
import { useAuth, useUser } from "@clerk/react-router";
import { PageLoader } from "@/components/loaders";

type Role = "admin" | "viewer" | "sales" | "distributor";

interface RequireRoleProps {
  allowedRoles?: Role[];
}

export default function RouteGuard({ allowedRoles }: RequireRoleProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useAuth();

  // Clerk or backend is loading
  if (!isLoaded) return <PageLoader />;

  // Not signed in
  if (!isSignedIn) return <Navigate to="/signin" replace />;

  // Role
  const role = user!.publicMetadata?.role as Role | undefined;

  // Onboarding check only for admins
  const orgId = user!.externalId as string | undefined;

  if (role === "admin" && !orgId) {
    return <Navigate to="/onboarding" replace />;
  }

  // Optional allowedRoles check
  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    signOut({ redirectUrl: "/signin" });
    return <PageLoader />;
  }

  // All checks passed → render nested routes
  return <Outlet />;
}
