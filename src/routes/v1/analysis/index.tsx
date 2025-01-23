import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/analysis/")({
  component: () => <div>Hello /v1/analysis/!</div>,
});
