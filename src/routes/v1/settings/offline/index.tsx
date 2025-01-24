import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/settings/offline/')({
  component: () => <div>Hello /v1/settings/offline/!</div>,
})
