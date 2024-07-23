import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <main className='h-full w-full'>
      <Outlet />
    </main>
  ),
})

