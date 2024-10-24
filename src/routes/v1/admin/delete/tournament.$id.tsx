import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/admin/delete/tournament/$id')({
  component: () => Comp, 
})

function Comp() {
  const { id } = Route.useParams();

  return(
    <p>Delete {id}?</p>
  )
}
