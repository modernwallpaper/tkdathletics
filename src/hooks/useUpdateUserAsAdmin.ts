import { saveUser } from "@/lib/indexedDB";
import { UpdateUserSchema } from "../../schemas";
import { useState } from "react";
import * as z from "zod";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "@tanstack/react-router";

export function useUpdateUserAsAdmin() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { state } = useAuthContext();
  const { user } = state;
  const router = useRouter();

  const update = async (data: z.infer<typeof UpdateUserSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);

    const req = await fetch("/api/user/admin/update", {
      method: "PUT",
      headers: { "Content-Type": "application-json" },
      body: JSON.stringify(data),
    });

    const res = await req.json();

    setLoading(false);

    if (res.error) {
      setSuccess("");
      sessionStorage.setItem("toastMessage", res.error);
      setError(res.error);
      window.location.reload();
    }

    if (res.success) {
     if (data.id) {
        if (data.id === user?.id) {
          console.log("Starting local user update: ", data.id);
          console.log("Id matches");
          await saveUser({ ...res.user });
          setError("");
          localStorage.setItem("user", JSON.stringify(res.user));
          sessionStorage.setItem("toastMessage", res.success);
          setSuccess(res.success);
          await router.navigate({ to: "/v1/admin" })
          window.location.reload();
        } else {
          setError("");
          sessionStorage.setItem("toastMessage", res.success);
          setSuccess(res.success);
          await router.navigate({ to: "/v1/admin" })
          window.location.reload();
        }
      }
    }
  };

  return { error, success, loading, update };
}
