import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/competitions/")({
  component: () => <div>Hello /v1/competitions/!</div>,
});
