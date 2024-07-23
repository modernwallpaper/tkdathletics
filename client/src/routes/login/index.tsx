import { LoginForm } from '@/components/auth/login-form'
import { AuthLayout } from '@/components/layouts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/')({
  component: () => <AuthLayout><LoginForm /></AuthLayout>, 
})
