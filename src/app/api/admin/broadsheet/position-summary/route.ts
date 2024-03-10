import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    //       const response = await prisma.job.findMany({
    //         include: {
    //           _count: {
    //             select: { Application: true },
    //           },
    //         //   Application: {
    //         //     select: {
    //         //       shortlisted: true
    //         //     }
    //         //   }
    //         },
    //       })
    //   console.log(response);

    const jobApplication = await prisma.job.findMany({
      include: {
        Application: {
          select: {
            id: true,
            shortlisted: true,
          },
        },
      },
    });

    const response = jobApplication.map((job) => {
      const totalApplications = job.Application.length;
      const shortlistedApplications = job.Application.filter(
        (app) => (app.shortlisted == 1)
      ).length;
      const rejectedApplications = job.Application.filter(
        (app) => (app.shortlisted == 0)
      ).length;
      const unworkedApplications = job.Application.filter(
        (app) => (app.shortlisted == -1)
      ).length;

      return {
        id:job.id,
        jobName: job.name,
        totalApplications,
        shortlistedApplications,
        rejectedApplications,
        unworkedApplications,
      };
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
