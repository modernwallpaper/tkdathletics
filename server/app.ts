import { Hono } from "hono";
import { logger } from "hono/logger";
import { routes } from "./routes/routes";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use('*', logger());

const apiRoutes = app.route("/api/", routes);

app.get('*', serveStatic({ root: './dist/' }));

export default app;
export type ApiRoutes = typeof apiRoutes;
