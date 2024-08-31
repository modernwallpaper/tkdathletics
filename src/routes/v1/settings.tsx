import { SettingsPage } from '@/components/app/settings/page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/settings')({
  component: () => <SettingsPage /> 
})
