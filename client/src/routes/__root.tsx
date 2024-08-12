import { NotFound } from "@/components/router/not-found";
import { Toaster } from "@/components/ui/toaster";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Outlet />
        <Toaster />
      </>
    );
  },
  notFoundComponent: () => <NotFound />,
});
