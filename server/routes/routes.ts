import { Hono } from "hono";
import { login, logout, profile, register } from "../controllers";
import { protectAdmin, protectUser } from "../lib/middleware";

export const routes = new Hono()
.post("auth/login", login)
.post("auth/register", protectAdmin ,register)
.post("auth/logout", logout)
.get("user/profile", protectUser, profile)
