import { Hono } from "hono";
import { getAll, login, logout, profile, register, updateUserAsUser } from "../controllers";
import { protectAdmin, protectUser } from "../lib/middleware";

export const routes = new Hono()
.post("auth/login", login)
.post("auth/register", register)
.post("auth/logout", logout)
.get("user/profile", protectUser, profile)
.put("user/profile", protectUser, updateUserAsUser)
.get("user/getall", protectAdmin, getAll)
