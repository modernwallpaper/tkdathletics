import { saveUser } from "@/lib/indexedDB";
import { UpdateUserAsUserSchema } from "@/schemas";
import * as z from "zod";

const saveUserToDb = async (user: z.infer<typeof UpdateUserAsUserSchema>) => { 
  if(navigator.onLine) {
    const req = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Header-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const res = await req.json();

    if(res.success) {
      if(res.user) {
        await saveUser(res.user);
        sessionStorage.setItem("toastMessage", res.success);
        window.location.reload();
      }
    }
  } else {
    sessionStorage.setItem("toastMessage", "User saved successfully");
    saveUser(user);
  }
};

const saveUserAsAdminToDb = async (user: z.infer<typeof UpdateUserAsUserSchema>) => { 
  if(navigator.onLine) {
    const req = await fetch("/api/user/profile/admin", {
      method: "PUT",
      headers: { "Header-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const res = await req.json();

    if(res.success) {
      if(res.user) {
        await saveUserAsAdminToDb(res.user);
        sessionStorage.setItem("toastMessage", res.success);
        window.location.reload();
      }
    }
  } else {
    await saveUserAsAdminToDb(user);
    sessionStorage.setItem("toastMessage", "User saved successfully");
  }
};

const updateUserAsUserToDb = async (user: z.infer<typeof UpdateUserAsUserSchema>) => {
  if(navigator.onLine) {

  }
}

export { saveUserToDb, saveUserAsAdminToDb };
