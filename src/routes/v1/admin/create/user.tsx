import { CreateUserForm } from '@/components/app/admin/users/create-user-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/admin/create/user')({
  component: () => <div className='flex w-full h-full items-center justify-center'><CreateUserForm /></div>  
})
