import { AdminPage } from '@/components/app/admin/page'
import { AdminMiddleware } from '@/middleware/admin.middleware'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/admin/')({
  component: () => {
    return(
      <AdminMiddleware>
        <AdminPage />
      </AdminMiddleware>
    )
  }
})
