import { UserList } from "@/components/adminpage/user-list";
import { AdminMiddleware } from "@/lib/auth-middleware";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/admin/")({
  component: () => {
    return (
      <AdminMiddleware>
        <div className="space-y-4">
          <UserList />
        </div>
      </AdminMiddleware>
    );
  },
});
