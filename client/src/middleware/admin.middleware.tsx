import { useAuthContext } from "@/hooks/useAuthContext";

export const AdminMiddleware = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { state } = useAuthContext();
  const { user } = state;

  if (user) {
    if (user.authority === "ADMIN") {
      return <>{children}</>;
    } else {
      return <>YOU ARE NOT ALLOWED TO VIEW THIS CONTENT</>;
    }
  }
};
