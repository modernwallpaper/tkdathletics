import { AdminMiddleware } from "@/lib/auth-middleware";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/admin/")({
  component: () => {
    return (
      <AdminMiddleware>
        <p>Admin only page</p>
      </AdminMiddleware>
    );
  },
});
