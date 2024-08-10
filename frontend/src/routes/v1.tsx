import { AuthMiddleware } from "@/middleware/auth.middleware";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/v1")({
  component: () => (
    <AuthMiddleware>
      <Outlet />
    </AuthMiddleware>
  ),
});
