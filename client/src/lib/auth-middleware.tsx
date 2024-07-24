import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { FormError } from "@/components/app/form-error";
import { authority } from "@prisma/client";

const UserMiddleware = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      router.navigate({ to: '/login' });
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner if preferred
  }

  return <div>{children}</div>;
};

const AdminMiddleware = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      router.navigate({ to: '/login' });
    } else if (user.authority !== authority.ADMIN) {
      // This will be rendered if the user is not an admin
    }
  }, [user, router]);

  if (!user) {
    return null; 
  }

  if (user.authority !== authority.ADMIN) {
    return <FormError message="You are not allowed to view this content" />;
  }

  return <div>{children}</div>;
};

export { UserMiddleware, AdminMiddleware };

