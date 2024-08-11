import { Button } from '@/components/ui/button';
import { useRegister } from '@/hooks/useRegister';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/register/')({
  component: () => <Comp />
})

const Comp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, error, loading } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 w-96 m-5'>
        <h3>Register</h3> 
        <div className='flex flex-col'>
          <label>Name</label>
          <input onChange={(e) => setName(e.target.value)} value={name} />
        </div>

        <div className='flex flex-col'>
          <label>Email</label>
          <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>

        <div className='flex flex-col'>
          <label>Password</label>
          <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>

        <Button type='submit' disabled={loading}>
          Register
        </Button>
      </form>
      {JSON.stringify(error)}
    </div>
  )
}
