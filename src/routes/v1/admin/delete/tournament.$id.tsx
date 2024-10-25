import { DeleteTournament } from "@/components/app/admin/tournaments/delete-tournament";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/admin/delete/tournament/$id")({
  component: () => {
    const { id } = Route.useParams();

    return (
      <div className="flex items-center justify-center w-full h-full">
        <DeleteTournament id={id} />
      </div>
    );
  },
});
