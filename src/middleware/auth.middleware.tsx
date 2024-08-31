import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
  
  // Get the user from the auth context
  const { state } = useAuthContext();
  const { user } = state;

  const router = useRouter();

  // Check if the user is logged in
  useEffect(() => {
    if (user === null) {
      router.navigate({ to: "/login" });
    }
  }, [user, router]);

  return <>{children}</>;
};
