import app from "./server/app";

Bun.serve({
  port: 4000,
  fetch: app.fetch,
});

console.log("[i] Node env: ", process.env.NODE_ENV);
console.log("[i] Server running on http://localhost:4000");
