import { NotificationsPage } from "@/components/app/settings/notifications";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/settings/notifications/")({
  component: () => <NotificationsPage />,
});
