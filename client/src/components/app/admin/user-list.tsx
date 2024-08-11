import { getAllUsers } from "@/hooks/getAllUsers";
import { UserTable } from "./user-table/data-table";
import { columns } from "./user-table/columns";

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
    return <UserTable<User, unknown> columns={columns} data={users} />;
  }
};

