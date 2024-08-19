import { saveUser } from "@/lib/indexedDB";
import { UpdateUserAsUserSchema } from "@/schemas";
import { useState } from "react";
import * as z from "zod";

export const useUpdateUserAsUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = async (
    values: z.infer<typeof UpdateUserAsUserSchema>,
    id: string,
  ) => {
    setLoading(true);
    const req = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...values }),
    });

    const res = await req.json();

    setLoading(false);

    if (res.success) {
      if (res.user) {
        await saveUser(res.user);
        sessionStorage.setItem("toastMessage", res.success);
        setError("");
        window.location.reload();
      }
    }

    if (res.error) {
      setError(res.error);
    }
  };

  return { loading, error, update };
};