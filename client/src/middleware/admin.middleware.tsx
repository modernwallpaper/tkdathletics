import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "@tanstack/react-router";

export const AdminMiddleware = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { state } = useAuthContext();
  const { user } = state;
  const router = useRouter();

  if (!user) {
    router.navigate({ to: "/login" });
  } else if (user.authority === "ADMIN") {
    return <>{children}</>;
  } else {
    return <>YOU ARE NOT ALLOWED TO VIEW THIS CONTENT</>;
  }
};
