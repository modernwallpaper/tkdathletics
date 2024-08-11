import { ColumnDef } from "@tanstack/react-table";

type User = {
  id: string;
  email: string;
  password: string;
  name?: string;
  surenname?: string;
  username?: string;
  birthday?: string;
  img?: string;
  kup?:
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine"
  | "ten";
  weight_class?: string;
  gender?: "MALE" | "FEMALE";
  ag?: "Senior" | "Youth_A" | "Youth_B" | "Youth_C" | "Youth_D";
  pg?: "KADETS" | "LK1" | "LK2";
  authority: "ADMIN" | "USER"; 
};

export const columns: ColumnDef<User, unknown>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "authority",
    header: "Authority",
  },
  {
    accessorKey: "surenname",
    header: "Surename",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "birthday",
    header: "Birthday",
  },
  {
    accessorKey: "img",
    header: "Img",
  },
  {
    accessorKey: "kup",
    header: "Kup",
  },
  {
    accessorKey: "weight_class",
    header: "Weight class",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "ag",
    header: "Age group",
  },
  {
    accessorKey: "pg",
    header: "Performance group",
  },
];
