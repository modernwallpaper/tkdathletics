import { saveUser } from "@/lib/indexedDB";
import { UpdateUserSchema } from "../../schemas";
import { useState } from "react";
import * as z from "zod";
import { useConnection } from "./useConnectionContext";

export const useUpdateUserAsUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { isOnline } = useConnection();

  const update = async (
    values: z.infer<typeof UpdateUserSchema>,
    id: string,
  ) => {
    console.log(id);
    if (isOnline) {
      setLoading(true);
      setLoading(true);
      const req = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values }),
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
    } else {
      if (values) {
        console.log("Saving user to local db, as user is currently offline");
        await saveUser({ ...values });
      }
    }
  };

  return { loading, error, update };
};
