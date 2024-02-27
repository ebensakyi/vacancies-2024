import { prisma } from "@/prisma/db";
import {
  getCurrentRecruitment,
  getCurrentShortlisting,
} from "./check-recruitment";

export const checkApplication = async (res:any, userId:any, userType:any) => {
  try {
     let recruitmentType = 1//await getCurrentRecruitment();
  console.log("recruitmentType",);

  let count = await prisma.personal.count({
    where: { userId },
  });

  // let rt = await prisma.recruitment.findFirst({});

  if (count != 0) {
    //Application already started
    let isSubmitted = await prisma.application.count({
      where: { userId, submitted: 1, currentRecruitmentId: recruitmentType },
    });
    if (isSubmitted == 0) {
      //Application started but not submitted
      return res.status(200).json({
        statusCode: 1,
        data: { userType, submitted: false, recruitmentType },
        message: "Logged in",
      });
    } else {
      console.log("isSubmitted2", isSubmitted);

      //Application submitted
      return res.status(200).json({
        statusCode: 1,
        data: { userType, submitted: true, recruitmentType },
        message: "Logged in",
      });
    }
  } else {
    //Application not started
    return res.status(200).json({
      statusCode: 1,
      data: { userType, submitted: false, recruitmentType },
      message: "Logged in",
    });
  }
  } catch (error) {
    console.log(error);
  }
 
};

export const isSubmitted = async (userId: any) => {
  let recruitmentType =1// await getCurrentRecruitment();

  let count = await prisma.application.count({
    where: { userId, submitted: 1, currentRecruitmentId: recruitmentType },
  });

  if (count != 0) return true;
  return false;
};
