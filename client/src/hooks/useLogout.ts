import { deleteUser } from "@/lib/indexedDB";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch, state } = useAuthContext();
  const { user } = state;
  const logout = async () => {
    await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (user) {
      if (user.id) {
        localStorage.removeItem("user");
        deleteUser(user.id);
        dispatch({ type: "LOGOUT" });
      }
    }
  };

  return { logout };
};
