import { PageHeader } from "../page-header";
import { UserList } from "./user-list";

export const AdminPage = () => {
  return (
    <div className="container relative py-6 lg:py-8">
      <PageHeader label="Admin"/>
      <UserList />
    </div>
  );
};
