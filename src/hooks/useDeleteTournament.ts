import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const useDeleteTournament = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const DeleteTournament = async (id: string) => {
    setLoading(true);
    setSuccess("");
    setError("");

    const res = await fetch("/api/tournament/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });

    const data = await res.json();

    if (data.success) {
      setSuccess(data.success);
      setLoading(false);
      sessionStorage.setItem("toastMessage", data.success);
      await router.navigate({ to: "/v1/admin" });
      window.location.reload();
    }

    if (data.error) {
      setError(data.error);
      setLoading(false);
    }
  };

  return { loading, error, success, DeleteTournament };
};
