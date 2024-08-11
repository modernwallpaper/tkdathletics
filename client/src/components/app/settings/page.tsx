import { useAuthContext } from "@/hooks/useAuthContext";
import { PageHeader } from "../page-header"
import { useLogout } from "@/hooks/useLogout";
import { Button } from "@/components/ui/button";

export const SettingsPage = () => {
  const { state } = useAuthContext();
  const { user } = state;
  const { logout } = useLogout();
  
  const onLogout = async () => {
    await logout();
  }
  return(
    <div>
      <PageHeader label="Settings"/>
      <p>{JSON.stringify(user)}</p>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  )
}
