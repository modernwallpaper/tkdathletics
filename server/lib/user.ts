import { db } from "./db";

// Gets the user by email
export const getUserByEmail = async (email: string | undefined) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    return null;
  }
};

// Gets the user by id
export const getUserById = async (id: string | undefined) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    return null;
  }
};
