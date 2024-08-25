import { useAuthContext } from "@/hooks/useAuthContext";
import { useConnection } from "@/hooks/useConnectionContext"
import { useUpdateUserAsUser } from "@/hooks/useUpdateUserAsUser";
import { loadUser, saveUser } from "@/lib/indexedDB";
import { useEffect, useState } from "react";

export const CheckForUpdate = async ({ children }: { children: React.ReactNode }) => {
  const { state } = useAuthContext();
  const { user } = state;
  const { isOnline } = useConnection();
  const { update } = useUpdateUserAsUser();
  const [localTimestamp, setLocalTimestamp] = useState("");
  const [apiTimestamp, setApiTimestamp] = useState("");
  
  useEffect(() => {
    if(user) {
      const checkForUpdate = async () => {
        if(localTimestamp && apiTimestamp) {
          if(new Date(localTimestamp) > new Date(apiTimestamp)) {
            if(user.id) {
              const localUser = await loadUser(user.id)
              if(localUser) {
                await update(localUser, user.id)
              }
            }
          } else if(new Date(apiTimestamp) > new Date(localTimestamp)) {
            if(user.id) {
              const req = await fetch("/api/user/profile", { method: "GET" });
              const onlineUser = await req.json();

              if(onlineUser) {
                await saveUser(onlineUser);
              }
            }
          }
        }
      }

      if(localTimestamp && apiTimestamp && user) {
        checkForUpdate();
      }
    }
  }, [localTimestamp, apiTimestamp, user])

  if(user) {
    if(isOnline) {
      const getApiTimestamp = async () => {
        try {
          const req = await fetch("/api/user/profile", { method: "GET" });
          const res = await req.json();

          if(res.timestamp) {
            setApiTimestamp(res.timestamp);
          }
        } catch (error) {
          console.error("Failed to make api request to get user profile: ", user.id);
        }
      }

      const getLocalTimestamp = async () => {
        if(user.id) {
          try {
            const res = await loadUser(user.id);
            if(res?.timestamp) {
              setLocalTimestamp(res.timestamp);
            }
          } catch (error) {
            console.error("Error to make request to local db to get user profile: ", user.id);
          }
        }
      }

      await getApiTimestamp();
      await getLocalTimestamp();
    }
  }

  return <>{children}</>
} 
