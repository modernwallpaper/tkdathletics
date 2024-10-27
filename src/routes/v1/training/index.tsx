import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/training/')({
  component: () => <div>Hello /v1/training/!</div>,
})
