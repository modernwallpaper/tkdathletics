import { logout } from "@/slices/auth.slice";
import { Button } from "../ui/button"
import { useLogoutMutation } from "@/slices/user.api.slice";   
import { useRouter } from "@tanstack/react-router";

import { useDispatch } from "react-redux"

export const LogoutButton = () => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch  = useDispatch();
  const router = useRouter(); 

  const onClick = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      router.navigate({ to: '/login' })
    } catch (error) {
      console.log(error); 
    }
  }

  return(
    <Button onClick={onClick}>
      Logout
    </Button>
  )
}
