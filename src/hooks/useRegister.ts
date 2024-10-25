import { useRouter } from "@tanstack/react-router";
import { CreateUserSchema } from "../../schemas";
import { useState } from "react";
import * as z from "zod"

export const useRegister = () => {
  const[error, setError] = useState(null);
  const[loading, isLoading] = useState(false);
  const[success, setSuccess] = useState("");
  const router = useRouter();

  const register = async(values: z.infer<typeof CreateUserSchema>) => {
    isLoading(true);
    setError(null);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if(data.error) {
      setSuccess("");
      sessionStorage.setItem("toastMessage", data.error);
      setError(data.error);
      window.location.reload();
    }

    if(data.success) {
      isLoading(false);
      sessionStorage.setItem("toastMessage", data.success);
      await router.navigate({ to: "/v1/admin" });
      window.location.reload();
    }
  }
  return { register, loading, error, success };
}
