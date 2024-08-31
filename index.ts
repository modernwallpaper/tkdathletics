import app from "./server/app";

Bun.serve({
  port: 4000,
  fetch: app.fetch,
});

console.log("Server running on http://localhost:4000");
