import { Hono } from "hono";
import { login, logout, profile, register } from "../controllers";

export const routes = new Hono()
.post("auth/login", login)
.post("auth/register", register)
.post("auth/logout", logout)
.get("user/profile", profile)
