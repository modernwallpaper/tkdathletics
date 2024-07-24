import type { Context } from "hono";
import { LoginSchema, UserSchema } from "../schemas";
import { getUserByEmail, getUserById } from "../lib/user";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { db } from "../lib/db";
import { getCookie } from "hono/cookie";

const login = async (c: Context) => {
  const data = await c.req.json();
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return c.json({ error: "Invalid fields" }, 400);
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email)
    return c.json({ error: "User not found" }, 404);

  if (existingUser.failed_logins > 6) {
    return c.json({ error: "User blocked" }, 401);
  }

  const passwordsMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordsMatch) {
    const failedLogins = existingUser.failed_logins;
    await db.user.update({
      where: { email },
      data: { failed_logins: failedLogins + 1 },
    });
  }

  if (existingUser && passwordsMatch) {
    const secret = process.env.JWT_SECRET;

    if (!secret)
      c.json({
        error:
          "No jwt secret was found. Please contact the system administrators",
      });

    // @ts-ignore
    const token = jwt.sign({ userId: existingUser.id }, secret, {
      expiresIn: "30d",
    });

    const response = new Response(
      JSON.stringify({
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          timestamp: existingUser.timestamp,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `jwt=${token}; HttpOnly; Path=/; Max-Age=${30 * 24 * 60 * 60}`,
        },
      },
    );
    return response;
  } else {
    return c.json({ error: "User not found" }, 404);
  }
};

const register = async (c: Context) => {
  const user = await c.req.json();
  const validatedFields = UserSchema.safeParse(user);

  if (!validatedFields.success) return c.json({ error: "Invalid fields" }, 400);

  let {
    name,
    email,
    password,
    username,
    surename,
    authority,
    birthday,
    img,
    kup,
    weight_class,
    gender,
    ag,
    pg,
  } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) return c.json({ error: "Email already in use" }, 400);

  const hashedPassword = await bcrypt.hash(password, 12);

  if (img === undefined) img = "";

  try {
    await db.user
      .create({
        data: {
          name: name,
          username: username,
          email: email,
          password: hashedPassword,
          surename: surename,
          authority: authority,
          birthday: birthday,
          img: img,
          kup: kup,
          weight_class: weight_class,
          gender: gender,
          ag: ag,
          pg: pg,
          failed_logins: 0,
          timestamp: new Date(),
        },
      })
      .catch((Error) => {
        console.log(Error);
      });

    return c.json({ success: "User created successfully" });
  } catch (err) {
    return c.json({ error: err });
  }
};

const logout = async () => {
  const response = new Response(
    JSON.stringify({
      success: "User logged out successfully",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `jwt=; HttpOnly; Max-Age=${new Date(0)}`,
      },
    },
  );
  return response;
};

const profile = async (c: Context) => {
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

        return c.json(user, 200);
      }
    } catch (error) {
      c.json({ error: error }, 500);
    }
  } else {
    return c.json({ error: "Unauthorized" }, 401);
  }
};

export { login, register, logout, profile };
