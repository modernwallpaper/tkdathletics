import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/admin/update/tournament/$id')({
  component: () => <div>Hello /v1/admin/update/tournament/$id!</div>
})