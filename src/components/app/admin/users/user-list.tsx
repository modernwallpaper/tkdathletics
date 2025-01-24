import { getAllUsers } from "@/hooks/getAllUsers";
import { UserTable } from "./user-table/data-table";
import { columns } from "./user-table/columns";
import { z } from "zod";
import { UserSchema } from "../../../../../schemas";

export const UserList = () => {
  const data = getAllUsers();
  const { loading, error, users } = data;

  if (error) {
    return <p>{error}</p>;
  }

  if (!users) {
    return <p></p>;
  } else if (loading) {
    return <p></p>;
  } else {
    return (
      <UserTable<z.infer<typeof UserSchema>, unknown>
        columns={columns}
        data={users}
      />
    );
  }
};
