import {prisma} from "../prisma/db";

export const logActivity = async (userId: number, activity: string) => {
  try {
    let data = {
      activity,
      userId,
    };
    const ul = await prisma.userLogs.create({ data });
    return;
  } catch (error) {
    console.log(error);
  }
};
