import { TournamentSchema } from "schemas";
import { z } from "zod";

export const UpdateTournamentForm = ({
  tournament,
}: {
  tournament: z.infer<typeof TournamentSchema>,
}) => {
  return <p>Tournament: {JSON.stringify(tournament)}</p>;
};
