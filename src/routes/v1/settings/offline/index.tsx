import { Offline } from '@/components/app/settings/offline'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/settings/offline/')({
    component: () => <Offline />,
})
