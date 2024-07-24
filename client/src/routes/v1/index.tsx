import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/")({
  component: () => {
    return (
      <p>Home</p>
    );
  },
});
