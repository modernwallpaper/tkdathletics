import { Button } from "@/components/ui/button";
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteTournament } from "@/hooks/useDeleteTournament";

export const DeleteTournament = ({ id }: { id?: string }) => {
  const { loading, DeleteTournament } = useDeleteTournament();

  const onClick = async () => {
    if (id) {
      await DeleteTournament(id);
    }
  };

  return (
    <div>
      <CardHeader>
        <CardTitle>Delete {id}?</CardTitle>
        <CardDescription>
          This action can not be undone. This will permanenntly remove the user
          from our servers.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant={"secondary"} asChild>
          <a href="/v1/admin/">Cancel</a>
        </Button>
        <Button onClick={onClick} disabled={loading}>
          Continue
        </Button>
      </CardFooter>
    </div>
  );
};
