import { CompDataPage } from "@/components/app/settings/comp-data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/settings/competition-data/")({
  component: () => <CompDataPage />,
});
