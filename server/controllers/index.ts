import type { Context } from "hono";
import {
  DeleteUserSchema,
  GetCompetitionShema,
  GetTournamentSchema,
  LoginSchema,
  UpdateUserSchema,
  CreateUserSchema,
  CreateTournamentSchemaBackend,
  UpdateTournamentSchemaBackend,
} from "../../schemas";
import { getUserByEmail, getUserById } from "../lib/user";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { db } from "../lib/db";
import { getCookie } from "hono/cookie";
import webPush from "web-push";
import path from "path";
import fs from "fs-extra";
import mime from "mime";
import { getTournamentById } from "../lib/tournament";

// Function, to remove a disered field from the user array in a api response
function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[],
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

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

  if (existingUser.failed_logins !== null) {
    if (existingUser.failed_logins > 6) {
      return c.json({ error: "User blocked" }, 401);
    }
  }

  if (existingUser.password && existingUser.failed_logins !== null) {
    // Check if passwords match
    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );

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
            surname: existingUser.surname,
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
  }
};

/**
 * @desc POST /api/auth/register
 * @access ADMIN
 */
const register = async (c: Context) => {
  const user = await c.req.json();
  const validatedFields = CreateUserSchema.safeParse(user);

  if (!validatedFields.success) return c.json({ error: "Invalid fields" }, 400);

  let { name, email, password, authority } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) return c.json({ error: "Email already in use" }, 400);

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await db.user
      .create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          authority: authority,
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
 * @desc GET /api/user/profile
 * @access PRIVATE
 */
const profile = async (c: Context) => {
  let token: string | undefined;
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

        return c.json(user ? exclude(user, ["password"]) : null, 200);
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
  const validatedFields = UpdateUserSchema.safeParse(data);
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
      surname,
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
    if (surname) udata.surname = surname;
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

      return c.json(
        {
          success: "User updated successfully",
          user: updatedUser ? exclude(updatedUser, ["password"]) : null,
        },
        200,
      );
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
  console.log(req);
  const validatedFields = UpdateUserSchema.safeParse(req);

  if (!validatedFields.success)
    return c.json({ error: "Innvalid fields" }, 400);

  const {
    name,
    surname,
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
  if (surname) udata.surname = surname;
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
    if (existingUser) {
      const uuser = await db.user.update({
        where: { id: validatedFields.data.id },
        data: { authority: existingUser?.authority, ...udata },
      });
      return c.json({ success: "User updated successfully", user: uuser }, 200);
    }
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

  if (!validatedFields.success) return c.json({ error: "Id required" }, 400);

  const { id } = validatedFields.data;

  const existingUser = await getUserById(id);

  if (!existingUser)
    return c.json({ error: "The id provided doesent exist on any user" });

  try {
    await db.user.delete({ where: { id } });
    return c.json({ success: "User deleted successfully" });
  } catch (error) {
    return c.json({ error: JSON.stringify(error) });
  }
};

const getCompetitionsForUser = async (c: Context) => {
  const req = await c.req.json();

  const validatedFields = GetCompetitionShema.safeParse(req);

  if (!validatedFields.success) return c.json({ error: "Id required" }, 400);

  const { id } = validatedFields.data;

  const existingCompetitions = await db.competition.findMany({
    where: { userId: id },
  });

  if (!existingCompetitions)
    return c.json(
      { error: "No competitions found for the provided user" },
      404,
    );

  return c.json(JSON.stringify(existingCompetitions), 200);
};

const getTournamentsForUser = async (c: Context) => {
  const req = await c.req.json();

  const validatedFields = GetTournamentSchema.safeParse(req);

  if (!validatedFields.success) return c.json({ error: "Id required" }, 400);

  const userId = validatedFields.data.id;

  try {
    const tournaments = await db.tournament.findMany({
      where: {
        participants: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        participants: true,
        competitions: true,
      },
    });

    return c.json({ tournaments }, 200);
  } catch (error) {
    return c.json({ error: "Unable to fetch tournaments" }, 500);
  }
};


const saveSubscription = async (c: Context) => {
  const { subscription, userId } = await c.req.json();

  const existingUser = await getUserById(userId);

  if (!existingUser) return c.json({ error: "No user found" }, 404);

  await db.user.update({
    where: { id: existingUser.id },
    data: { pushSubscription: JSON.stringify(subscription) },
  });

  return c.json({ success: "Subscription saved successfully" });
};

const sendPushNotification = async (c: Context) => {
  const { userId } = await c.req.json();

  console.log("userId", userId);

  const existingUser = await getUserById(userId);

  if (!existingUser) return c.json({ error: "No user found" }, 404);

  const pushSubscription = existingUser.pushSubscription;

  console.log("pushSubscription", pushSubscription);

  if (pushSubscription) {
    console.log("pushSubscription", pushSubscription);

    const subscription = JSON.parse(pushSubscription);

    webPush.sendNotification(subscription, "Hello test");

    return c.json({ success: "Message sent to push service" });
  } else {
    return c.json({ error: "user is not subscribed to push service" });
  }
};

/**
 * @desc GET /api/tournament/getall
 * @access PRIVATE
 */
const getAllTournaments = async (c: Context) => {
  const tournaments = await db.tournament.findMany({
    include: {
      participants: true,
      contract: true,
      result: true,
    },
  });

  const sanitizedTournaments = tournaments.map((tournament) => ({
    ...tournament,
    participants: tournament.participants.map(({ password, ...participant }) => participant),
  }));

  return c.json(sanitizedTournaments, 200);
};

const deleteTournament = async (c: Context) => {
  const data = await c.req.json();
  if (data.id) {
    const tournament = await db.tournament.findUnique({ 
      where: { id: data.id },
      include: {
        contract: true,
        result: true,
      }
    });

    if(!tournament) {
      return c.json({ error: "No tournament found for given id" }, 404);
    }


    if(tournament.result?.url) {
      const result_path = path.resolve("."+tournament?.result?.url);
      console.log("path to delete: ", result_path);
      if(fs.existsSync(result_path)) {
        console.log("path exists, deleting: ", result_path);
        fs.removeSync(result_path);
      } else {
        console.log("Result file path is not available for tournament with id: ", tournament.id);
      }
    }

    if(tournament.contract?.url) {
      const contract_path = path.resolve("."+tournament?.contract?.url);
      console.log("path to delete: ", contract_path);
      if(fs.existsSync(contract_path)) {
        console.log("path exists, deleting: ", contract_path);
        fs.removeSync(contract_path);
      } else {
        console.log("Contract file path is not available for tournament with id: ", tournament.id);
      }
    }

    await db.tournament.delete({ where: { id: data.id } });
    return c.json({ success: "Tournament deleted successfully" });
  } else if (!data.id) {
    return c.json({ error: "No id provided" }, 401);
  }
};

const createTorunament = async (c: Context) => {
  const data = await c.req.json();
  if (data.date) {
    data.date = new Date(data.date);
  }

  const validatedFields = CreateTournamentSchemaBackend.safeParse(data);

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return c.json({ error: "Invalid fields" }, 400);
  }

  const { name, date, location, result, contract, participants } =
    validatedFields.data;

  const tournament = await db.tournament.create({
    data: {
      name,
      location,
      date,
      participants: {
        connect: participants?.map((id) => ({ id })),
      },
      contract: contract
        ? {
            connect: { id: contract.id },
          }
        : undefined,
      result: result
        ? {
            connect: { id: result.id },
          }
        : undefined,
      timestamp: new Date(),
    },
  });

  return c.json({ tournament, success: "Tournament created successfully" }, 201);
};

const updateTournament = async (c: Context) => {
  const data = await c.req.json();
  if(data.date) {
    data.date = new Date(data.date);
  }
  const validatedFields = UpdateTournamentSchemaBackend.safeParse(data);
  if(!validatedFields.success) {
    console.error(validatedFields.error);
    return c.json({ error: "Invalid fields" }, 400);
  }

  const {
    name,
    location,
    date,
    result,
    contract,
    participants,
  } = validatedFields.data;

  const udata: Partial<typeof validatedFields.data> = {};

  if (name) udata.name = name;
  if (location) udata.location = location;
  if (date) udata.date = date;
  if (result) udata.result = result;
  if (contract) udata.contract = contract;
  if (participants) udata.participants = participants;

  if (Object.keys(udata).length === 0) {
    return c.json({ error: "No fields for update provided" });
  }

  const existingTournament = await getTournamentById(validatedFields.data.id); 

  try {
    if (existingTournament) {
      const utournament = await db.tournament.update({
        where: { id: validatedFields.data.id },
        data: { 
          name: udata.name,
          location: udata.location,
          date: udata.date,
          participants: udata.participants
            ? {
                connect: udata.participants.map((participant) => ({ id: participant.id })),
              }
            : undefined,
          result: udata.result
            ? {
                connect: { id: udata.result.id }
              }
            : undefined,
          contract: udata.contract
            ? {
                connect: { id: udata.contract.id }
              }
            : undefined,
        },
      });
      return c.json({ success: "Tournament updated successfully", tournament: utournament }, 200);
    }
  } catch (err) {
    return c.json({ error: err }, 500);
  }
}

const uploadTournamentFile = async (c: Context) => {
  const uploadDir = path.resolve("./uploads/");
  const uploadDirExists = fs.existsSync(uploadDir);

  console.log("Upload dir: ", uploadDir);

  if (!uploadDirExists) {
    console.error("Upload dir doesent exist");
  }

  const formData = await c.req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return c.json({ error: "No file uploaded" }, 400);
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const initFile = await db.file.create({
    data: {
      url: `/uploads/${file.name}`,
      filename: file.name,
      mimeType: file.type,
      size: file.size,
    },
  });
  console.log(initFile);

  const { id, filename, mimeType, size } = initFile;

  const extension = mime.getExtension(file.type);
  const fileURL = path.join(
    uploadDir,
    `${id}${extension ? `.${extension}` : ""}`,
  );

  const savedFile = await db.file.update({
    where: { id },
    data: {
      url: path.join("/uploads/", `${id}${extension ? `.${extension}` : ""}`),
      filename,
      mimeType,
      size,
    },
  });

  console.log(savedFile);

  fs.writeFileSync(fileURL, buffer);

  return c.json({ success: "File uploaded successfully", id }, 200);
};

export {
  login,
  register,
  logout,
  profile,
  getAll,
  updateUserAsUser,
  updateUserAsAdmin,
  deleteUserAsAdmin,
  saveSubscription,
  sendPushNotification,
  getCompetitionsForUser,
  getTournamentsForUser,
  getAllTournaments,
  createTorunament,
  uploadTournamentFile,
  deleteTournament,
  updateTournament,
};
