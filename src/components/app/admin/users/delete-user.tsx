import { Button } from "@/components/ui/button";
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteUserAsAdmin } from "@/hooks/useDeleteUserAsAdmin";

export const DeleteUser = ({ id }: { id?: string }) => {
  const { deleteUser, loading } = useDeleteUserAsAdmin();

  const onClick = async () => {
    if (id) {
      await deleteUser(id);
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
        <Button disabled={loading} variant={"secondary"} asChild>
          <a href="/v1/admin/">Cancel</a>
        </Button>
        <Button disabled={loading} onClick={onClick}>
          Continue
        </Button>
      </CardFooter>
    </div>
  );
};
