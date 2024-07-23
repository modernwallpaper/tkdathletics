import { RootState } from "@/store";
import { useRouter } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth);
  if(!user) router.navigate({ to: '/login' });

  return (
    <div>
      {children}
    </div>
  )
}
