import { getAllTournaments } from "@/hooks/getAllTournamennts"
import { PageHeader } from "../page-header"
import { DataTable } from "./events-table/data-table";
import { columns } from "./events-table/columns";

export const EventsPage = () => {
  const { loading, tournaments, error } = getAllTournaments();

  if(error) {
    return <p>{error}</p>
  }

  if(loading) {
    return <p>Loading...</p>
  }

  if(!tournaments) {
    return (
      <>
        <PageHeader label="Events"/>
        <div className="mt-2 h-[70vh] w-full flex-col gap-y-2 border rounded-md">
          <p className="flex h-full w-full items-center justify-center">No events found {':'}{'('}</p>
        </div>
      </>
    ) 
  }

  if(tournaments.length === 0) {
    return (
      <>
        <PageHeader label="Events"/>
        <div className="mt-2 h-[70vh] w-full flex-col gap-y-2 border rounded-md">
          <p className="flex h-full w-full items-center justify-center">No events found {':'}{'('}</p>
        </div>
      </>
    ) 
  }

  console.log("tournaments: ", tournaments.map((tournament) => tournament))

  return(
    <>
      <PageHeader label="Events"/>
      <div className="p-2"/>
      <DataTable columns={columns} data={tournaments} />
    </>
  )
}
