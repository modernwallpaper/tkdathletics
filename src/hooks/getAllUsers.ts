import { useState, useEffect } from "react";
import { z } from "zod";
import { UserSchema } from "../../schemas";

export function getAllUsers() {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<z.infer<typeof UserSchema>[] | undefined>(
    undefined,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user/getall", {
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
          setUsers(data);
          setLoading(false);
        }
      } catch (error) {
        setError(JSON.stringify(error));
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (users === undefined) {
    return { loading, error };
  } else {
    return { loading, users, error };
  }
}
