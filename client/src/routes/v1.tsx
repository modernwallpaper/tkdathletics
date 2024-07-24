import { Navbar } from "@/components/app/navbar";
import { UserMiddleware } from "@/lib/auth-middleware";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/v1")({
  component: () => {
    return (
      <UserMiddleware>
        <div className="relative w-full h-full flex flex-col gap-y-3">
          <div>
            <Navbar />
          </div>
          <div className="p-2 md:pt-2 md:pr-28 md:pl-28">
            <Outlet />
          </div>
        </div>
      </UserMiddleware>
    );
  },
});
