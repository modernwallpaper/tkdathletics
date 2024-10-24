import { UpdateUserForm } from '@/components/app/admin/users/update-user-form';
import { getAllUsers } from '@/hooks/getAllUsers';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/admin/update/user/$id')({
  component: Comp, 
})

function Comp() {
  const { id } = Route.useParams();

  const { loading, error, users } = getAllUsers();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const userToUpdate = users?.find(user => user.id === id);

  if (!userToUpdate) {
    return <div>No user found with ID {id}</div>;
  }

  return (
    <div className='flex w-full h-full items-center justify-center'>
      <UpdateUserForm user={userToUpdate} />
    </div>
  );
};
