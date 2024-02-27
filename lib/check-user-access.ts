import { prisma } from "@/prisma/db";


export const getUserAccesss = async (userId: any) => {
  try {
    // let cookies = cookie.parse(req.headers.cookie || "");
    // let token = cookies.token;

    // let user = await verifyToken(token);
    // console.log("User: ", user);

   // const admin = await prisma.admin.findMany({ where: { userId: userId } });
    const accessibleJobs = await prisma.accessibleJob.findMany({
      where: { userId: userId },
    });
    let access = await accessibleJobs.map((aj: { jobId: any; }) => aj.jobId);
    // //console.log("access ", { access });
    // const accessToken = jwt.sign({ access }, process.env.TOKEN_SECRET);
    // // console.log("accessToken ", accessToken);


    return access;
  } catch (error) {
    console.log("getUserAccesss>>>>>>>>>>", error);
  }
};
