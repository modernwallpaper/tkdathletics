import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/events/")({
  component: () => <div>Hello /v1/events/!</div>,
});
