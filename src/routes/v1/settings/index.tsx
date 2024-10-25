import { PageHeader } from "@/components/app/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/settings/")({
  component: () => <PageHeader label="Settings" />,
});
