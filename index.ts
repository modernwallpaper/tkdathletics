import chalk from "chalk";
import app from "./server/app";
import { getClientIP } from "./server/lib/client";

Bun.serve({
  port: 4000,
  async fetch(req) {
    const ip = getClientIP(req);

    const modifiedRequest = new Request(req, {
      headers: { ...Object.fromEntries(req.headers), "x-client-ip": ip || "" },
    });

    return app.fetch(modifiedRequest);
  },
});

console.log(`${chalk.cyan(`${chalk.blue("[i]")} Node env: ${chalk.reset.dim(`${process.env.NODE_ENV}`)}`)}`);
console.log(`${chalk.cyan(`${chalk.blue("[i]")} Server running on ${chalk.reset.dim("http://localhost:4000/")}`)}`);
