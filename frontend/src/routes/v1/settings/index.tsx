import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/hooks/useAuthContext'
import { useLogout } from '@/hooks/useLogout';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/settings/')({
  component: () => <Comp />
})

const Comp = () => {
  const { state } = useAuthContext();
  const { user } = state;
  const { logout } = useLogout();
  
  const onLogout = async () => {
    await logout();
  }

  return(
    <>
      <p>{JSON.stringify(user)}</p>
      <Button onClick={onLogout}>Logout</Button>
    </>
  )
}
