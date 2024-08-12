import { Hono } from "hono";
import { deleteUserAsAdmin, getAll, login, logout, profile, register, updateUserAsAdmin, updateUserAsUser } from "../controllers";
import { protectAdmin, protectUser } from "../lib/middleware";

export const routes = new Hono()
.post("auth/login", login)
.post("auth/register", protectAdmin, register)
.post("auth/logout", logout)
.get("user/profile", protectUser, profile)
.put("user/profile", protectUser, updateUserAsUser)
.put("user/admin/update", protectAdmin, updateUserAsAdmin)
.get("user/getall", protectAdmin, getAll)
.post("/user/admin/delete", protectAdmin, deleteUserAsAdmin)
