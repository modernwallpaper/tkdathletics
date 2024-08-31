import { AccontPage } from '@/components/app/settings/account'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/settings/account/')({
  component: () => <AccontPage /> 
})
