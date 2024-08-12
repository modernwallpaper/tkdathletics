import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/settings/notifications')({
  component: () => <div>Hello /v1/settings/notifications!</div>
})