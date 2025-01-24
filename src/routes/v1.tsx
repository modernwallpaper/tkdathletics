import { CheckForUpdate } from "@/components/app/check-update-user";
import { Navbar } from "@/components/app/navbar";
import { NotFound } from "@/components/router/not-found";
import { useToast } from "@/components/ui/use-toast";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/v1")({
  component: () => {
    const { toast } = useToast();
    const toastMessage = sessionStorage.getItem("toastMessage");
    if (toastMessage) {
      toast({ description: toastMessage });
      sessionStorage.removeItem("toastMessage");
    }

    return (
      <AuthMiddleware>
        <CheckForUpdate>
          <main className="relative flex min-h-screen flex-col bg-background">
            <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <Navbar />
            </header>
            <div className="flex-1 lg:pr-20 lg:pl-20 pt-5">
              <Outlet />
            </div>
          </main>
        </CheckForUpdate>
      </AuthMiddleware>
    );
  },
  notFoundComponent: () => <NotFound />,
});
