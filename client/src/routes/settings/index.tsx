import { SettingsPage } from '@/components/app/settings-page'
import { AuthMiddleware } from '@/lib/auth-middleware'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/')({
  component: () => {
    return(
      <AuthMiddleware> 
        <SettingsPage /> 
      </AuthMiddleware>
    )
  }});
