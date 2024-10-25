import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const useDeleteUserAsAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const deleteUser = async (id: string) => {
    setLoading(true);
    const req = await fetch("/api/user/admin/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });

    const data = await req.json();

    if (data.success) {
      setLoading(false);
      sessionStorage.setItem("toastMessage", data.success);
      await router.navigate({ to: "/v1/admin" });
      window.location.reload();
    }

    if (data.error) {
      setLoading(false);
      sessionStorage.setItem("toastMessage", data.error);
      window.location.reload();
    }
  };

  return { deleteUser, loading };
};
