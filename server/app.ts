import { Hono } from "hono";
import { logger } from "hono/logger";
import { routes } from "./routes/routes";
import { serveStatic } from "hono/bun";
import { getUserByEmail } from "./lib/user";
import { db } from "./lib/db";
import bcrypt from "bcryptjs"
import webPush from "web-push"


// Create a server admin if it doesnt exist
const initUser = async () => {
  const adminUser = await getUserByEmail("admin@website.com");
  if (!adminUser) {
    console.log("[!] Creating new server admin");
    const hashedPassword = await bcrypt.hash(JSON.stringify(process.env.ADMIN_PWD), 12);
    await db.user.create({
      data: {
        name: "admin",
        surname: "admin",
        email: "admin@website.com",
        password: hashedPassword,
        authority: "ADMIN",
        failed_logins: 0,
        birthday: new Date(),
        img: "",
        kup: null,
        weight_class: null,
        gender: null,
        ag: null,
        pg: null,
        timestamp: new Date()
      },
    });
    console.log("[+] New server admin created successfully");
  } else {
    console.log("[!] Server admin already created");
  }
}
initUser();

// API KEYS for push notifications
if(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  const apiKeys = {
    vapidPublicKey: process.env.VAPID_PUBLIC_KEY,
    vapidPrivateKey: process.env.VAPID_PRIVATE_KEY, 
  }
  
  webPush.setVapidDetails(
    "mailto:test@test.com",
    apiKeys.vapidPublicKey,
    apiKeys.vapidPrivateKey,
  )
} else {
  console.log("Please generate a pair of VAPID keys and place them into your .env file");
}


// App logic
const app = new Hono();

// Logging
app.use('*', logger());

// Setup routes
const apiRoutes = app.route("/api/", routes);
app.get('*', serveStatic({ root: './dist/' }));


export default app;
export type ApiRoutes = typeof apiRoutes;
