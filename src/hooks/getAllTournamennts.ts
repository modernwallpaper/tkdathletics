import { useEffect, useState } from "react";
import { TournamentSchema } from "schemas";
import { z } from "zod";

export function getAllTournaments() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tournaments, setTournaments] = useState<
    z.infer<typeof TournamentSchema>[] | undefined
  >(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/tournament/getall", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (data.error) {
          setError(JSON.stringify(data.error));
          setLoading(false);
        } else {
          setTournaments(data);
          setLoading(false);
        }
      } catch (error) {
        setError(JSON.stringify(error));
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (tournaments === undefined) {
    return { loading, error };
  } else {
    return { loading, tournaments, error };
  }
}
