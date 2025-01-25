import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { TournamentSchema } from "schemas";
import { z } from "zod";

export const columns: ColumnDef<z.infer<typeof TournamentSchema>, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const tournament = row.original;
      const date = tournament.date;
      if(!date) {
        return <p>No date provided</p>
      }
      const formatted_date = format(date, "yyyy-mm-dd");
      return(
        <p>{formatted_date}</p>
      )
    },
  },
  {
    accessorKey: "resultUrl",
    header: "Results",
    cell: ({ row }) => {
      const tournament = row.original;
      const result = tournament.resultUrl;
      if(!result) {
        return <p>No result provided</p>;
      }
      return(
        <div className="flex">
          <a className="text-blue-500 hover:cursor-pointer" href={result}>Result</a>
        </div>
      )
    },
  },
  {
    accessorKey: "contractUrl",
    header: "Contract",
    cell: ({ row }) => {
      const tournament = row.original;
      const contract = tournament.contractUrl;
      if(!contract) {
        return <p>No contract provided</p>;
      }
      return(
        <div className="flex">
          <a className="text-blue-500 hover:cursor-pointer" href={contract}>Contract</a>
        </div>
      )
    },
  },
  {
    accessorKey: "participants",
    header: "Participants",
    cell: ({ row }) => {
      const tournament = row.original;
      const participants = tournament.participants;
      return (
        <div className="flex flex-col">
          {participants?.map((participant) => {
            return <p>{participant.name}</p>;
          })}
        </div>
      );
    },
  },
];
