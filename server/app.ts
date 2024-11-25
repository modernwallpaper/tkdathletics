import { Hono } from "hono";
import { logger } from "hono/logger";
import { routes } from "./routes/routes";
import { serveStatic, getConnInfo } from "hono/bun";
import { getUserByEmail } from "./lib/user";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";
import webPush from "web-push";
import path from "path";
import fs from "fs";
import mime from "mime";
import chalk from "chalk";
import { secureHeaders } from "hono/secure-headers"

// Create a server admin if it doesnt exist
const initUser = async () => {
  const adminUser = await getUserByEmail("admin@website.com");
  if (!adminUser) {
    console.log("[!] Creating new server admin");
    const hashedPassword = await bcrypt.hash(
      JSON.stringify(process.env.ADMIN_PWD),
      12,
    );
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
        timestamp: new Date(),
      },
    });
    console.log(`${chalk.cyan(`${chalk.blue("[+]")} New server admin created successfully`)}`);
  } else {
    console.log(`${chalk.cyan(`${chalk.blue("[i]")} Server admin already created`)}`);
  }
};
initUser();

// API KEYS for push notifications
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  const apiKeys = {
    vapidPublicKey: process.env.VAPID_PUBLIC_KEY,
    vapidPrivateKey: process.env.VAPID_PRIVATE_KEY,
  };

  webPush.setVapidDetails(
    "mailto:test@test.com",
    apiKeys.vapidPublicKey,
    apiKeys.vapidPrivateKey,
  );
} else {
  console.log(
    `${chalk.cyan(`${chalk.blue("[!]")}Please generate a pair of VAPID keys and place them into your .env file`)}}`,
  );
}

// App logic
const app = new Hono();

// Logging
if(import.meta.env.NODE_ENV === "development") {
  app.use("*", logger());
} else if(import.meta.env.NODE_ENV === "production") {
  app.use("*", async (c, next) => {
    const info = getConnInfo(c);
    
    await next();

    console.log(`
      ${chalk.cyan("-----------------------------------------------------------------------------")}
      ${chalk.cyan("-----------------------------------------------------------------------------")}
      ${chalk.dim(`${new Date()}`)}
      ${chalk.green(`${chalk.bold("Request")}`)} 
      ${chalk.cyan(`| ${chalk.white(`${c.req.method}`)} -> ${c.req.url}`)}
      ${chalk.cyan(`| ${chalk.white(`${c.req.method}`)} <- ${c.req.url} ${chalk.yellow(`${c.res.status}`)}`)}
      
      ${chalk.green(`${chalk.bold("Request Info")}`)} 
      ${chalk.cyan(`|> ${chalk.white("Ip")}: ${info.remote.address} ${chalk.dim(`${info.remote.addressType}`)}`)} 
      ${chalk.cyan(`|> ${chalk.white("Port")}: ${info.remote.port}`)}
      ${chalk.cyan("-----------------------------------------------------------------------------")}
      ${chalk.cyan("-----------------------------------------------------------------------------")}
    `);
  });
} else {
  app.use("*", async (c, next) => {
    const info = getConnInfo(c);
    
    await next();

    console.log(`
      ${chalk.cyan("-----------------------------------------------------------------------------")}
      ${chalk.cyan("-----------------------------------------------------------------------------")}
      ${chalk.dim(`${new Date()}`)}
      ${chalk.green(`${chalk.bold("Request")}`)} 
      ${chalk.cyan(`| ${chalk.white(`${c.req.method}`)} -> ${c.req.url}`)}
      ${chalk.cyan(`| ${chalk.white(`${c.req.method}`)} <- ${c.req.url} ${chalk.yellow(`${c.res.status}`)}`)}
      
      ${chalk.green(`${chalk.bold("Request Info")}`)} 
      ${chalk.cyan(`|> ${chalk.white("Ip")}: ${info.remote.address} ${chalk.dim(`${info.remote.addressType}`)}`)} 
      ${chalk.cyan(`|> ${chalk.white("Port")}: ${info.remote.port}`)}
      ${chalk.cyan("-----------------------------------------------------------------------------")}
      ${chalk.cyan("-----------------------------------------------------------------------------")}
    `);
  });
}

// Secure headers
app.use(secureHeaders())

// Setup routes
app.route("/api/", routes);

const uploadPath = path.resolve("./uploads/");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

app.get("/uploads/:filename", async (c) => {
  const filename = c.req.param("filename");

  if (!filename) {
    return c.text("Filename is required", 400);
  }

  const filePath = path.join(uploadPath, filename);

  try {
    const data = fs.readFileSync(filePath);

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(data));
        controller.close();
      },
    });

    const mimeType = mime.getType(filename) || "application/octet-stream";
    return c.body(stream, 200, { "Content-Type": mimeType });
  } catch (err) {
    return c.text("File not found", 404);
  }
});

app.get("*", serveStatic({ root: "./dist/" }));

export default app;
