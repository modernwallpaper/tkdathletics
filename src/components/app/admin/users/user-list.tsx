import { getAllUsers } from "@/hooks/getAllUsers";
import { UserTable } from "./user-table/data-table";
import { columns } from "./user-table/columns";
import { z } from "zod";
import { UserSchema } from "../../../../../schemas";

export const UserList = () => {
  const data = getAllUsers();
  const { loading, error, users } = data;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!users) {
    return <p>No users found</p>;
  } else {
    return <UserTable<z.infer<typeof UserSchema>, unknown> columns={columns} data={users} />;
  }
};

