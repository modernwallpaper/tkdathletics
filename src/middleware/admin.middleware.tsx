import { useAuthContext } from "@/hooks/useAuthContext";

export const AdminMiddleware = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Get the user from the auth context
  const { state } = useAuthContext();
  const { user } = state;

  // Check if the user is an admin
  if (user) {
    if (user.authority === "ADMIN") {
      return <>{children}</>;
    } else {
      return <>YOU ARE NOT ALLOWED TO VIEW THIS CONTENT</>;
    }
  }
};
