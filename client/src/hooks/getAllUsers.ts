import { useState, useEffect } from "react";

type User = {
  id: string;
  email: string;
  password: string;
  name?: string;
  surenname?: string;
  username?: string;
  birthday?: string;
  img?: string;
  kup?:
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine"
  | "ten";
  weight_class?: string;
  gender?: "MALE" | "FEMALE";
  ag?: "Senior" | "Youth_A" | "Youth_B" | "Youth_C" | "Youth_D";
  pg?: "KADETS" | "LK1" | "LK2";
  authority: "USER" | "ADMIN";
  timestamp: string;
};

export function getAllUsers() {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
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

  if(users === undefined) {
    return { loading, error }
  } else {
    return { loading, users, error };
  }
};
