import { useState } from "react"
import { UpdateTournamentSchema } from "schemas";
import { z } from "zod";

export const useUpdateTournament = () => {
  const [loadingTournamentUpdate, setLoading] = useState<boolean>(false);
  const [errorTournamentUpdate, setError] = useState<string>("");
  const [successTournamentUpdate, setSuccess] = useState<string>("");

  const update = async (values: z.infer<typeof UpdateTournamentSchema>) => {
    setLoading(true);
    setError("");
    setSuccess("");
    const req = await fetch("/api/tournament/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const res = await req.json();
    if(res.success) {
      setSuccess("Update request was successfull");
      sessionStorage.setItem("toastMessage", res.success);
      setError("");
      window.location.reload();
      setLoading(false);
    }

    if(!res.ok) {
      if(res.error) {
        setError("Invalid values");
        sessionStorage.setItem("toastMessage", res.error);
        setSuccess("")
        window.location.reload();
        setLoading(false);
      }
    }
  }

  return { loadingTournamentUpdate, errorTournamentUpdate, successTournamentUpdate, update };
}
