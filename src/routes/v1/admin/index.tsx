import { AdminPage } from "@/components/app/admin/page";
import { AdminMiddleware } from "@/middleware/admin.middleware";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/admin/")({
  component: () => {
    return (
      <AdminMiddleware>
        <AdminPage />
        <p>TODO: Implement, that when a tournament gets deleted, not only all the corrseponding files get deleted, but also the database entries for the files, because as of now, the entrys dont get deleted, and so, there exist many entries for files, that link to a nonexistend file-url </p>
      </AdminMiddleware>
    );
  },
});
