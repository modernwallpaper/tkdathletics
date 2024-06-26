import { deleteUserAsAdmin } from "@/actions/user"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useTransition } from "react"


export const DeleteFighterForm = ({ id, name }: { id: string, name: string }) => {
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()
 
  const router = useRouter()

  const onClick = () => {
    startTransition(() => {
      deleteUserAsAdmin(id).then((data) => {
        router.refresh()
        if(data.error) toast({ description: data.error, variant: "destructive" })
        toast({ description: data.success })
      })
    })
  }

  return(
    <AlertDialog>
      <AlertDialogTrigger asChild><Button variant={"ghost"}>Delete user</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the account &quot;{name}&quot;
            and remove its data from the server
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={onClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
