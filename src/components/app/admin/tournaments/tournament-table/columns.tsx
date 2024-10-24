import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { TournamentSchema } from "schemas";
import { z } from "zod"

export const columns: ColumnDef<z.infer<typeof TournamentSchema>, unknown>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "resultId",
    header: "Result id",
  },
  {
    accessorKey: "contractId",
    header: "Contract id",
  },
  {
    accessorKey: "participants",
    header: "Participants",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tournament = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Separator className="mb-1" />
            <ul>
              <li>
                <Button asChild variant={"dropdown"} size={"sm"} className="w-full">
                  <a href={`/v1/admin/update/tournament/${tournament.id}`}>
                    Update
                  </a>
                </Button>
              </li>
              <li>
                <Button variant={"dropdown"} size={"sm"} className="w-full" asChild>
                  <a href={`/v1/admin/delete/tournament/${tournament.id}`}>Delete</a>
                </Button>
              </li>
            </ul>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]
