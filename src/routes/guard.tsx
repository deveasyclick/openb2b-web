import { Navigate, Outlet } from "react-router";
// src/components/RequireRole.tsx
import { useUser } from "@clerk/react-router";

type Role = "admin" | "viewer" | "sales" | "distributor";

interface RequireRoleProps {
  allowedRoles?: Role[];
}

export default function RouteGuard({ allowedRoles }: RequireRoleProps) {
  const { isLoaded, isSignedIn, user } = useUser();

  // While Clerk is loading
  if (!isLoaded) return <div>Loading...</div>;

  // If not signed in, redirect to login
  if (!isSignedIn) return <Navigate to="/signin" replace />;

  // Retrieve role from Clerk's custom claims
  const role = user?.publicMetadata?.role as Role | undefined;

  // If no role or not in allowed list, deny access
  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Otherwise, allow access
  return <Outlet />;
}
