import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;

    let applicationId = Number(res.data.appId);
    let rejectReason = res.data.rejectReason;
    let rejected = res.data.rejected;
    let shortlisted = res.data.shortlisted;

    let shortlistStatus = Number(shortlisted) == 1 ? 1 : 0;

    const data = {
      shortlisted: shortlistStatus,
      shortlistedById: userId,
    };
    const response = await prisma.application.update({
      where: { id: applicationId },
      data: data,
    });

    if (shortlistStatus == 0) {
      //delete all existing
      let existingRejectReason = await prisma.rejectReason.findMany({
        where: { applicationId: applicationId },
      });

      await existingRejectReason.map(async (reason: any) => {
        await prisma.rejectReason.delete({ where: { id: reason.id } });
      });

      //create new
      const modifiedArray = await rejectReason?.map((item: any) => ({
        applicationId: applicationId,
        reasonId: item,
        createdBy: userId,
      }));

      await prisma.rejectReason.createMany({ data: modifiedArray });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    
    // let applicationId: any = searchParams.get("id")?.toString();

    const response = await prisma.application.findMany({
      where: {
        deleted: 0,
        submitted: 1,
        shortlisted: 0,
        //id: Number(applicationId),
      },
      include: {
        RejectReason: true,
        Job: true,
        User: {
          include: {
            Personal: {
              include: {
                Sex: true,
                MaritalStatus: true,
              },
            },
            Essay: true,
            Employment: true,
            GradesObtained: {
              include: {
                IndexNumber: {
                  include: { ExamType: true },
                },
              },
            },
            SchoolAttended: {
              include: {
                EducationLevel: true,
              },
            },
            Reference: true,
            Publication: true,
            Certificate: true,
            Bonded: {
              include: {
                YesNo: true,
              },
            },
            Confirmation: {
              include: {
                YesNo: true,
              },
            },
          },
        },
      },
    });

    console.log(response);
    

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
