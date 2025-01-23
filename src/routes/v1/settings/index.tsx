import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/settings/")({
  component: () => {
    const router = useRouter();
    router.navigate({ to: "/v1/settings/account" });
  },
});
