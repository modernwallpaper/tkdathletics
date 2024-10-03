import { useAuthContext } from "@/hooks/useAuthContext";
import { useConnection } from "@/hooks/useConnectionContext"
import { useUpdateUserAsUser } from "@/hooks/useUpdateUserAsUser";
import { loadUser, saveUser } from "@/lib/indexedDB";
import { useEffect, useState } from "react";

export const CheckForUpdate = ({ children }: { children: React.ReactNode }) => {
  const { state } = useAuthContext();
  const { user } = state;
  const { isOnline } = useConnection();
  const { update } = useUpdateUserAsUser();
  const [localTimestamp, setLocalTimestamp] = useState("");
  const [apiTimestamp, setApiTimestamp] = useState("");

  useEffect(() => {
    const getTimestamps = async () => {
      if(user && isOnline) {
        try {
          const req = await fetch("/api/user/profile", { method: "GET" });
          const res = await req.json();
          if(res.timestamp) {
            setApiTimestamp(res.timestamp);
          }

          if(user.id) {
            const localRes = await loadUser(user.id);
            if(localRes?.timestamp) {
              setLocalTimestamp(localRes.timestamp);
            }
          }
        } catch (error) {
          console.error("Error fetching timestamps: ", error);
        }
      } else {
        console.warn(isOnline ? "No user found" : "User is offline");
      }
    };

    if(user && isOnline) {
      getTimestamps();
    }
  }, [user, isOnline]); // Dependencies for the useEffect
  
  useEffect(() => {
    const checkForUpdate = async () => {
      if(user && localTimestamp && apiTimestamp) {
        console.info("Checking for user update...");

        const d_local = new Date(localTimestamp).getTime();
        console.info("Local timestamp: ", d_local);

        const d_api  = new Date(apiTimestamp).getTime();
        console.info("API timestamp: ", d_api);

        if(d_local === d_api) {
          console.info("No update required");
        }

        if(d_local > d_api) {
          if(user.id) {
            const localUser = await loadUser(user.id);
            if(localUser) {
              await update(localUser, user.id);
              console.info("User updated successfully: local -> api");
            }
          }
        } else if(d_api > d_local) {
          if(user.id) {
            const req = await fetch("/api/user/profile", { method: "GET" });
            const onlineUser = await req.json();
            if(onlineUser) {
              await saveUser(onlineUser);
              console.info("User updated successfully: api -> local");
            }
          }
        }

      } else {
        console.warn("No timestamps received or no user found");
      }
    };

    if(localTimestamp && apiTimestamp && user) {
      checkForUpdate();
    }
  }, [localTimestamp, apiTimestamp, user]);

  return <>{children}</>;
}
