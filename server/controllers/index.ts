import type { Context } from "hono"
import { LoginSchema, UserSchema } from "../schemas";
import { getUserByEmail, getUserById } from "../lib/user";
import bcrypt from "bcryptjs"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { db } from "../lib/db";
import { getCookie } from "hono/cookie";

const login = async (c: Context) => {
  const data = await c.req.json();
  const validatedFields = LoginSchema.safeParse(data);

  if(!validatedFields.success) {
    return c.json({ "error": "Invalid fields" }, 400);
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if(!existingUser || !existingUser.email) return c.json({ "error": "User not found" }, 404);
  
  const passwordsMatch = await bcrypt.compare(password, existingUser.password);

  if(existingUser && passwordsMatch) {
    const secret = process.env.JWT_SECRET;

    if(!secret) c.json({ "error": "No jwt secret was found. Please contact the system administrators" });

    const token = jwt.sign({ userId: existingUser.id }, secret, { expiresIn: "30d" });

    const fighter = await db.figherData.findUnique({ where: { id: existingUser.id } });

    const response = new Response(
      JSON.stringify({
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          timestamp: existingUser.timestamp
        },
        fighter,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `jwt=${token}; HttpOnly; Path=/; Max-Age=${30 * 24 * 60 * 60}`
        }
      }
    );
    return response;

  } else {
    return c.json({ "error": "User not found" }, 404);
  }
}

const register = async(c: Context) => {
  const user = await c.req.json();
  const validatedFields = UserSchema.safeParse(user);
  
  if(!validatedFields.success) return c.json({ "error": "Invalid fields" }, 400);
  
  const { name, email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if(existingUser) return c.json({ "error": "Email already in use" }, 400);

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        timestamp: new Date(),
      },
    });

    const fighter = await db.figherData.create({
      data: {
        id: user.id, 
        weight: "",
        weight_class: "T68",
        kup: "K1",
        gender: "MALE",
        age_group: "SENIOR",
        performance_class: "ONE",
        date_of_birth: new Date(0)
      },
    });

    const secret = process.env.JWT_SECRET;

    if(!secret) c.json({ "error": "No jwt secret was found. Please contact the system administrators" });

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "30d" });

    const response = new Response(
      JSON.stringify({ user, fighter }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `jwt=${token}; HttpOnly; Path=/; Max-Age=${30 * 24 * 60 * 60}`
        }
      }
    );
    return response;

  } catch (err) {
    return c.json({ "error": err });
  }
}

const logout = async() => {
  const response = new Response(
    JSON.stringify({
      "success": "User logged out successfully"
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `jwt=; HttpOnly; Max-Age=${new Date(0)}`
      }
    }
  );
  return response;
}

const profile = async (c: Context) => {
  let token;
  token = getCookie(c, 'jwt');

  if(token) {
    try {
      const secret = process.env.JWT_SECRET;
      if(!secret) return c.json({ "error": "No jwt secret was found. Please contact the system administrators" }, 500);
      
      const decoded = jwt.verify(token, secret);

      if(typeof decoded !== "string" && (decoded as JwtPayload).userId) {
        const user = await getUserById((decoded as JwtPayload).userId);
        if(!user) return c.json({ "error": "Was not able to fetch user" }, 500);
        
        const fighter = await db.figherData.findUnique({ where: { id: user.id } }) 
          
        return c.json({ user, fighter }, 200);
      }
    } catch (error) {
      c.json({ "error": error }, 500);
    }
  } else {
    return c.json({ "error": "Unauthorized" }, 401);
  }
}

export { login, register, logout, profile };
