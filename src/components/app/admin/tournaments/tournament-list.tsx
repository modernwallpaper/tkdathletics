import { getAllTournaments } from "@/hooks/getAllTournamennts"
import { DataTable } from "./tournament-table/data-table";
import { columns } from "./tournament-table/columns";
import { z } from "zod"
import { TournamentSchema } from "schemas";

export const TournamentList = () => {
  const { loading, error, tournaments } = getAllTournaments();

  if(loading) return <p>Loading...</p>;

  if(error) return <p>{error}</p>;

  return(
    <DataTable<z.infer<typeof TournamentSchema>, unknown> columns={columns} data={tournaments || []}/>
  )
}
