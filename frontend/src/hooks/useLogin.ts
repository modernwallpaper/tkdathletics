import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { saveUser } from "@/lib/indexedDB";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.error) {
        setError(JSON.stringify(data.error));
        setLoading(false);
        return false;
      }

      if (data.user === undefined) {
        setLoading(false);
        return false;
      }

      if (data.user) {
        saveUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: "LOGIN", payload: data.user });
        setLoading(false);
        return true;
      }
    } catch (error) {
      setError(JSON.stringify(error));
      setLoading(false);
      return false;
    }
  };

  return { login, error, loading };
};
;
