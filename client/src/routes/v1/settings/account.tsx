import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/settings/account')({
  component: () => <div>Hello /v1/settings/account!</div>
})