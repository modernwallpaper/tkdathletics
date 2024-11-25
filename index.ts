import chalk from "chalk";
import app from "./server/app";

Bun.serve({
  port: 4000,
  fetch: app.fetch,
});

console.log(`${chalk.cyan(`${chalk.blue("[i]")} Node env: ${chalk.reset.dim(`${process.env.NODE_ENV}`)}`)}`);
console.log(`${chalk.cyan(`${chalk.blue("[i]")} Server running on ${chalk.reset.dim("http://localhost:4000/")}`)}`);
