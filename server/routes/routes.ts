import { Hono } from "hono";
import { createTorunament, deleteTournament, deleteUserAsAdmin, getAll, getAllTournaments, login, logout, profile, register, saveSubscription, sendPushNotification, updateUserAsAdmin, updateUserAsUser, uploadTournamentFile } from "../controllers";
import { protectAdmin, protectUser } from "../lib/middleware";

// Setup routes
export const routes = new Hono()
.post("auth/login", login)
.post("auth/register", protectAdmin, register)
.post("auth/logout", logout)
.get("user/profile", protectUser, profile)
.put("user/profile", protectUser, updateUserAsUser)
.put("user/admin/update", protectAdmin, updateUserAsAdmin)
.get("user/getall", protectAdmin, getAll)
.post("/user/admin/delete", protectAdmin, deleteUserAsAdmin)
.get("tournament/getall", protectAdmin, getAllTournaments)
.post("tournament/create", protectAdmin, createTorunament)
.post("tournament/file/upload", protectAdmin, uploadTournamentFile)
.post("tournament/delete", protectAdmin, deleteTournament)
.post("/save-subscription", protectUser, saveSubscription)
.post("/send-notification", protectUser, sendPushNotification)
