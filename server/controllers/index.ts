import type { Context } from "hono";
import { DeleteUserSchema, LoginSchema, UpdateUserAsUserSchema, UserSchema } from "../schemas";
import { getUserByEmail, getUserById } from "../lib/user";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { db } from "../lib/db";
import { getCookie } from "hono/cookie";
import webPush from "web-push"

/**
 * @desc POST /api/auth/login
 * @access PUBLIC
 */
const login = async (c: Context) => {
  // Get data & validate
  const data = await c.req.json();
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return c.json({ error: "Invalid fields" }, 400);
  }

  // Destructure fields
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  // Check for user
  if (!existingUser || !existingUser.email)
    return c.json({ error: "User not found" }, 404);

  if (existingUser.failed_logins > 6) {
    return c.json({ error: "User blocked" }, 401);
  }

  // Check if passwords match
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
          surename: existingUser.surename,
          username: existingUser.username,
          birthday: existingUser.birthday,
          img: existingUser.img,
          kup: existingUser.kup,
          weight_class: existingUser.weight_class,
          ag: existingUser.ag,
          pg: existingUser.pg,
          gender: existingUser.gender,
          failed_logins: existingUser.failed_logins,
          authority: existingUser.authority,
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

/**
 * @desc POST /api/auth/register
 * @access ADMIN
 */
const register = async (c: Context) => {
  const user = await c.req.json();
  const validatedFields = UserSchema.safeParse(user);

  if (!validatedFields.success) return c.json({ error: "Invalid fields" }, 400);

  let {
    name,
    email,
    password,
    //username,
    //surename,
    authority,
    //birthday,
    //img,
    //kup,
    //weight_class,
    //gender,
    //ag,
    //pg,
  } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) return c.json({ error: "Email already in use" }, 400);

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await db.user
      .create({
        data: {
          name: name,
          //username: username,
          email: email,
          password: hashedPassword,
          //surename: surename,
          authority: authority,
          //birthday: birthday,
          //img: img,
          //kup: kup,
          //weight_class: weight_class,
          //gender: gender,
          //ag: ag,
          //pg: pg,
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

/**
 * @desc POST /api/auth/logout
 * @access PUBLIC
 */
const logout = async () => {
  const response = new Response(
    JSON.stringify({
      success: "User logged out successfully",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `jwt=; HttpOnly; Path=/;Max-Age=${new Date(0)}`,
      },
    },
  );

  return response;
};

/**
 * @desc GET /api/user/logout
 * @access PRIVATE
 */
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

/**
 * @desc GET /api/user/getall
 * @access ADMIN
 */
const getAll = async (c: Context) => {
  const users = await db.user.findMany();
  if (!users) return c.json({ error: "No users found" }, 404);
  return c.json(users, 200);
};

/**
 * @desc PUT /api/user/profile
 * @access PRIVATE
 */
const updateUserAsUser = async (c: Context) => {
  let token = getCookie(c, "jwt");

  const data = await c.req.json();
  const validatedFields = UpdateUserAsUserSchema.safeParse(data);
  if (!validatedFields.success) return c.json({ error: "Invalid fields" });

  let authorized = false;

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
        if (user.id === validatedFields.data.id) {
          authorized = true;
        } else {
          return c.json(
            { error: "You can't change/update other users' profiles" },
            401,
          );
        }
      }
    } catch (error) {
      return c.json({ error: error }, 500);
    }
  } else {
    return c.json({ error: "Unauthorized" }, 401);
  }

  if (authorized) {
    const {
      name,
      username,
      surename,
      weight_class,
      kup,
      birthday,
      email,
      password,
      ag,
      pg,
      gender,
      img,
    } = validatedFields.data;

    const udata: Partial<typeof validatedFields.data> = {};

    if (name) udata.name = name;
    if (username) udata.username = username;
    if (surename) udata.surename = surename;
    if (weight_class) udata.weight_class = weight_class;
    if (kup) udata.kup = kup;
    if (birthday) udata.birthday = birthday;
    if (email) udata.email = email;
    if (password) udata.password = await bcrypt.hash(password, 12);
    if (ag) udata.ag = ag;
    if (pg) udata.pg = pg;
    if (gender) udata.gender = gender;
    if (img) udata.img = img;

    if (Object.keys(udata).length === 0) {
      return c.json({ error: "No fields for update provided" });
    }

    try {
      const updatedUser = await db.user.update({
        where: { id: validatedFields.data.id },
        data: { ...udata, timestamp: new Date() },
      });

      return c.json({ success: "User updated successfully", user: updatedUser }, 200);
    } catch (err) {
      return c.json({ error: err }, 500);
    }
  }
};

/**
 * @desc PUT /api/user/admin/update
 * @access PRIVATE
 */
const updateUserAsAdmin = async (c: Context) => {
  const req = await c.req.json();
  const validatedFields = UpdateUserAsUserSchema.safeParse(req);

  if(!validatedFields.success) return c.json({ error: "Innvalid fields" }, 400)

  const {
    name,
    username,
    surename,
    weight_class,
    kup,
    birthday,
    email,
    password,
    ag,
    pg,
    gender,
    img,
  } = validatedFields.data;

  const udata: Partial<typeof validatedFields.data> = {};

  if (name) udata.name = name;
  if (username) udata.username = username;
  if (surename) udata.surename = surename;
  if (weight_class) udata.weight_class = weight_class;
  if (kup) udata.kup = kup;
  if (birthday) udata.birthday = birthday;
  if (email) udata.email = email;
  if (password) udata.password = await bcrypt.hash(password, 12);
  if (ag) udata.ag = ag;
  if (pg) udata.pg = pg;
  if (gender) udata.gender = gender;
  if (img) udata.img = img;

  if (Object.keys(udata).length === 0) {
    return c.json({ error: "No fields for update provided" });
  }

  const existingUser = await getUserById(validatedFields.data.id);

  try {
    const uuser = await db.user.update({
      where: { id: validatedFields.data.id },
      data: { authority: existingUser?.authority, ...udata },
    });

    return c.json({ success: "User updated successfully", user: uuser }, 200);
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

/**
 * @desc POST /api/user/admin/delete
 * @access PRIVATE
 */
const deleteUserAsAdmin = async (c: Context) => {
  const req = await c.req.json();
  
  const validatedFields = DeleteUserSchema.safeParse(req); 

  if(!validatedFields.success) return c.json({ error: "Id required" }, 400);

  const { id } = validatedFields.data;

  const existingUser = await getUserById(id);
  
  if(!existingUser) return c.json({ error: "The id provided doesent exist on any user" });

  try {
    await db.user.delete({ where: { id } })
    return c.json({ success: "User deleted successfully" });
  } catch (error) {
    return c.json({ error: JSON.stringify(error) });
  }
}



const saveSubscription = async (c: Context) => {
  const { subscription, userId } = await c.req.json();
 
  const existingUser = await getUserById(userId);
  
  if(!existingUser) return c.json({ error: "No user found" }, 404);

  await db.user.update({ where: { id: existingUser.id }, data: { pushSubscription: JSON.stringify(subscription) } })

  return c.json({ success: "Subscription saved successfully" });
}

const sendPushNotification = async (c: Context) => {
  const { userId } = await c.req.json();
  
  console.log("userId", userId);

  const existingUser = await getUserById(userId);

  if(!existingUser) return c.json({ error: "No user found" }, 404);

  const pushSubscription = existingUser.pushSubscription;

  console.log("pushSubscription", pushSubscription);

  if(pushSubscription) {

    console.log("pushSubscription", pushSubscription);

    const subscription = JSON.parse(pushSubscription);

    webPush.sendNotification(subscription, "Hello test");

    return c.json({ "success": "Message sent to push service" });
  } else {
    return c.json({ "error": "user is not subscribed to push service" });
  }
}

export { login, register, logout, profile, getAll, updateUserAsUser, updateUserAsAdmin, deleteUserAsAdmin, saveSubscription, sendPushNotification };
