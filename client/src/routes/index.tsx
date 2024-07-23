import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index, 
});

function Index() {
  return(
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold drop-shadow-md tracking-tight">Tkdathletics</h1>
        <p>A web service for athletes to analyse their competitions and training routines</p>
        <div>
          <LoginButton>
            <Button size={"lg"}>
              Login
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>  
  )
}
