import app from "./server/app";

Bun.serve({
  port: 4000,
  fetch: app.fetch,
});

console.log("[i] Server running on http://localhost:4000");
