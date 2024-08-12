import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/settings/')({
  component: () => <p>Settings page</p> 
})
