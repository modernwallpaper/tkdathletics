import { db } from "./db";

// Gets the tournament by id
export const getTournamentById = async (id: string | undefined) => {
  try {
    const tournament = await db.tournament.findUnique({ where: { id } });
    return tournament;
  } catch (error) {
    return null;
  }
};
