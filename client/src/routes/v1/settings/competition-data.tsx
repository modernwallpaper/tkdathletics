import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/settings/competition-data')({
  component: () => <div>Hello /v1/settings/competition-data!</div>
})