import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteUserAsAdmin } from "@/hooks/useDeleteUserAsAdmin";

export const DeleteUser = ({ id }: { id?: string }) => {
  const { deleteUser } = useDeleteUserAsAdmin();

  const onClick = async () => {
    if(id) {
      await deleteUser(id);
    }
  } 

  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete {id}?</AlertDialogTitle>
        <AlertDialogDescription>
          This action can not be undone. This will permanenntly remove the user
          from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </div>
  );
};
