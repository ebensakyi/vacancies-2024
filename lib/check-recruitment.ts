import { prisma } from "@/prisma/db";

export const getCurrentRecruitment = async () => {
  try {
    let cr = await prisma.currentRecruitment.findFirst({
      where: { deleted: 0 },
      include: {
        Recruitment: true,
      },
      // orderBy: {
      //   title: "desc",
      // },
    });

    return Number(cr?.Recruitment?.id) || undefined;
  } catch (error) {
    console.log("getCurrentRecruitment=> ", error);
  }
};

export const getCurrentShortlisting = async () => {
  try {
    let cr = await prisma.currentShortlisting.findFirst({
      where: { deleted: 0 },
      include: {
        Recruitment: true,
      },
      // orderBy: {
      //   title: "desc",
      // },
    });
console.log(cr);
    return Number(cr?.Recruitment?.id) || undefined;
  } catch (error) {
    console.log(error);
  }
};
