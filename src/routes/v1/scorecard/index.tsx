import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/scorecard/")({
  component: () => <div>Hello /v1/scorecard/!</div>,
});
