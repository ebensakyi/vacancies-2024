import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data = {
      policyId: Number(res.data.policy),
      name: res.data.name,
    };
    const response = await prisma.job.create({ data });

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function GET(request: Request) {
  try {
    // const res = await request.json();
    // let update = res.data.update
    // let publish = res.data.publish

    // let id = Number(res.data.id)
    // let details = res.data.detail
    // let policyId = Number(res.data.policy)
    // let name = res.data.name

    // if (update) {
    //   const data = {
    //     policyId: policyId,
    //     name: name
    //   };
    //   const response = await prisma.job.update({ data, where: { id: id } });
    //   return NextResponse.json(response, { status: 200 });
    // }

    // const job = await prisma.job.findFirst({  where: { id: id } });
    // let pub = job?.published || 0

    // const response = await prisma.job.update({ data: { published: Math.abs(pub-1)  }, where: { id: id } });

    const currentRecruitment = await prisma.currentRecruitment.findFirst({
      where: { deleted: 0 },
    });

    // const applicationSummary = await prisma.application.findMany({
    //   where: { submitted: 1, currentRecruitmentId: currentRecruitment.id },
    //   include: {
    //     J,
    //   },
    // });

    // const jobSummary = await prisma.application.groupBy({
    //   by: 'jobId',
    //   _count: {
    //     jobId: true,
    //   },
    //   include: {
    //     // Specify the related model you want to include
    //     Job: true, // For example, if you want to include the Application model
    //   },
    // })


    const jobSummary = await prisma.job.findMany({
      include: {
        _count: {
          select: { Application: true },
        },
      },
    })


    

    // const jobSummary = await prisma.job.findMany({
    //   select: {
    //     id: true,
    //     name: true,
    //     Application: {
    //       // Count the number of related applications
    //       count: {
    //         id: true
    //       }
    //     }
    //   },
    //   include: {
    //     Application: true // Include the Application model to count the number of applications
    //   }
    // });

    const totalApplications = await prisma.application.count({
      //where: { submitted: 1 },
    });

    const totalApplicationsSubmitted = await prisma.application.count({
      where: { submitted: 1 },
    });
    const totalMaleApplicants = await prisma.application.count({
      where: {
        submitted: 1,
        User: {
          Personal: {
            sexId: 1,
          },
        },
      },
    });
    const totalFemaleApplicants = await prisma.application.count({
      where: {
        submitted: 1,
        User: {
          Personal: {
            sexId: 2,
          },
        },
      },
    });
    return NextResponse.json({
      response: {
        jobSummary,
        totalApplicationsSubmitted,
        totalApplications,
        totalMaleApplicants,
        totalFemaleApplicants,
      },
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(request: Request) {
  try {
    const res = await request.json();

    const response = await prisma.job.update({
      where: { id: Number(res.id) },
      data: { deleted: 1 },
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
