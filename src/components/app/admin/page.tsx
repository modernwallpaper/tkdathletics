import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "../page-header";
import { UserList } from "./users/user-list";
import { Separator } from "@/components/ui/separator";
import { TournamentList } from "./tournaments/tournament-list";

export const AdminPage = () => {
  return (
    <div className="container relative">
      <PageHeader label="Admin" />
      <div className="mt-2"/>
      <Tabs defaultValue="users">
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
        </TabsList>
        <Separator className="my-2" />
        <TabsContent value="users">
          <UserList />
        </TabsContent>
        <TabsContent value="tournaments">
          <TournamentList />
        </TabsContent>
      </Tabs>
    </div>
  );
};
