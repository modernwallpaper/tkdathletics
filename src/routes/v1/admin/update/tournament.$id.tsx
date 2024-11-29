import { UpdateTournamentForm } from "@/components/app/admin/tournaments/update-tournament-form";
import { getAllTournaments } from "@/hooks/getAllTournamennts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/v1/admin/update/tournament/$id")({
  component: Comp, 
});

function Comp() {
  const { id } = Route.useParams()
  
  const { loading, error, tournaments } = getAllTournaments();

  if(loading) {
    return <p>Loading...</p>;
  }

  if(error) {
    return <p>Error: {error}</p>;
  }

  const tournamentToUpdate = tournaments?.find((tournament) => tournament.id === id);

  if(!tournamentToUpdate) {
    return <p>No tournament found with ID {id}</p>;
  }

  return(
    <UpdateTournamentForm tournament={tournamentToUpdate} />
  )
}
