import { Hono } from "hono";
import { logger } from "hono/logger";
import { routes } from "./routes/routes";
import { serveStatic } from "hono/bun";
import { getUserByEmail } from "./lib/user";
import { db } from "./lib/db";
import bcrypt from "bcryptjs"
import webPush from "web-push"

const initUser = async () => {
  const adminUser = await getUserByEmail("admin@website.com");
  if (!adminUser) {
    console.log("[!] Creating new server admin");
    const hashedPassword = await bcrypt.hash(JSON.stringify(process.env.ADMIN_PWD), 12);
    await db.user.create({
      data: {
        name: "admin",
        username: "admin",
        surename: "admin",
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

const apiKeys = {
  vapidPublicKey: "BHQFgVk9ZVQSU6vw_eN7Snoxs3cA3StKs8Z3bbCOM4dPRuO5VTtagGiYEzykJty3pok-ySG8CXAnZPLtMN9Dsjo",
  vapidPrivateKey: "dtgizdnHe7E_GaIjxNJApIAk7VvVUi1zxzPWQ9c7FTI"
}

webPush.setVapidDetails(
  "mailto:test@test.com",
  apiKeys.vapidPublicKey,
  apiKeys.vapidPrivateKey,
)

const app = new Hono();

app.use('*', logger());

const apiRoutes = app.route("/api/", routes);

app.get('*', serveStatic({ root: './dist/' }));

export default app;
export type ApiRoutes = typeof apiRoutes;
