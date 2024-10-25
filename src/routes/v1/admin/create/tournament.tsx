import { CreateTournametForm } from "@/components/app/admin/tournaments/create-tournament";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/admin/create/tournament")({
  component: () => (
    <div className="flex w-full h-full items-center justify-center">
      <CreateTournametForm />
    </div>
  ),
});
