import { Hono } from "hono";
import { logger } from "hono/logger";
import { routes } from "./routes/routes";
import { serveStatic } from "hono/bun";
import { getUserByEmail } from "./lib/user";
import { db } from "./lib/db";
import bcrypt from "bcryptjs"

const initUser = async () => {
  const adminUser = await getUserByEmail("admin@website.com");
  if (!adminUser) {
    console.log("Creating new server admin");
    const hashedPassword = await bcrypt.hash("123456", 12);
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
    console.log("New server admin created successfully");
  } else {
    console.log("Server admin already created");
  }
}

initUser();

const app = new Hono();

app.use('*', logger());

const apiRoutes = app.route("/api/", routes);

app.get('*', serveStatic({ root: './dist/' }));

export default app;
export type ApiRoutes = typeof apiRoutes;
