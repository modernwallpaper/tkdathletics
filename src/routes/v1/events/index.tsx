import { EventsPage } from "@/components/app/events/events";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/events/")({
  component: () => <EventsPage />,
});
