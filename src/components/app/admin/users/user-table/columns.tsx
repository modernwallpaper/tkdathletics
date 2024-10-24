import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteUser } from "../delete-user";
import { z } from "zod";
import { UserSchema } from "../../../../../../schemas";

export const columns: ColumnDef<z.infer<typeof UserSchema>, unknown>[] = [
  {
    accessorKey: "id",
    header: "Id",
    id: "Id",
  },
  {
    accessorKey: "email",
    header: "Email",
    id: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
    id: "Name",
  },
  {
    accessorKey: "authority",
    header: "Authority",
    id: "Authority",
  },
  {
    accessorKey: "surename",
    header: "Surename",
    id: "Surename",
  },
  {
    accessorKey: "username",
    header: "Username",
    id: "Username",
  },
  {
    accessorKey: "birthday",
    header: "Birthday",
    id: "Birthday",
  },
  {
    accessorKey: "img",
    header: "Img",
    id: "Img",
  },
  {
    accessorKey: "kup",
    header: "Kup",
    id: "Kup",
  },
  {
    accessorKey: "weight_class",
    header: "Weight class",
    id: "Weight class",
  },
  {
    accessorKey: "gender",
    header: "Gender",
    id: "Gender",
  },
  {
    accessorKey: "ag",
    header: "Age group",
    id: "Age group",
  },
  {
    accessorKey: "pg",
    header: "Performance group",
    id: "Performance group",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
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
                  <a href={`/v1/admin/update/user/${user.id}`}>
                    Update
                  </a>
                </Button>
              </li>
              <li>
                <Button asChild variant={"dropdown"} size={"sm"} className="w-full">
                  <a href={`/v1/admin/delete/user/${user.id}`}>Delete</a>
                </Button>
              </li>
            </ul>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
