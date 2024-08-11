import { Navbar } from "@/components/app/navbar";
import { NotFound } from "@/components/router/not-found";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/v1")({
  component: () => (
    <AuthMiddleware>
      <main className="w-full h-full flex flex-col gap-y-2 fixed">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="md:pr-28 md:pl-28 md:pt-5">
          <Outlet />  
        </div>
      </main>
    </AuthMiddleware>
  ),
  notFoundComponent: () => <NotFound />
});
