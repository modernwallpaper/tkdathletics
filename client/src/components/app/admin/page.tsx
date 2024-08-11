import { PageHeader } from "../page-header";
import { UserList } from "./user-list";

export const AdminPage = () => {
  return (
    <div>
      <PageHeader label="Admin"/>
      <UserList />
    </div>
  );
};
