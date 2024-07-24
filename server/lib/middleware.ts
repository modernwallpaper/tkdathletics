import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Context, Next } from "hono";
import { getUserById } from "./user";
import { getCookie } from "hono/cookie";
import { authority } from "@prisma/client";

const protectUser = async (c: Context, next: Next) => {
  let token;
  token = getCookie(c, "jwt");

  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret)
        return c.json(
          {
            error:
              "No jwt secret was found. Please contact the system administrators",
          },
          500,
        );

      const decoded = jwt.verify(token, secret);

      if (typeof decoded !== "string" && (decoded as JwtPayload).userId) {
        const user = await getUserById((decoded as JwtPayload).userId);
        if (!user) return c.json({ error: "Was not able to fetch user" }, 500);

        return next();
      }
    } catch (error) {
      c.json({ error: error }, 500);
    }
  } else {
    return c.json({ error: "Unauthorized" }, 401);
  }
};

const protectAdmin = async (c: Context, next: Next) => {
  let token;
  token = getCookie(c, "jwt");

  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret)
        return c.json(
          {
            error:
              "No jwt secret was found. Please contact the system administrators",
          },
          500,
        );

      const decoded = jwt.verify(token, secret);

      if (typeof decoded !== "string" && (decoded as JwtPayload).userId) {
        const user = await getUserById((decoded as JwtPayload).userId);
        if (!user) return c.json({ error: "Was not able to fetch user" }, 500);
        
        if(user.authority === authority.USER) return c.json({ error: "Unauthorized" });

        return next();
      }
    } catch (error) {
      c.json({ error: error }, 500);
    }
  } else {
    return c.json({ error: "Unauthorized" }, 401);
  }
};

export { protectUser, protectAdmin }
