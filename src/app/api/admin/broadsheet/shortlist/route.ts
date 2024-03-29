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

