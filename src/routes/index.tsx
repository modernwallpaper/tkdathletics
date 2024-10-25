import { useAuthContext } from "@/hooks/useAuthContext";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: () => {
    const { state } = useAuthContext();
    const { user } = state;
    const router = useRouter();

    useEffect(() => {
      if (user) {
        router.navigate({ to: "/v1/settings/account" });
      }
    }, [user, router]);

    return (
      <div>
        <a href="/login">Login</a>
      </div>
    );
  },
});
