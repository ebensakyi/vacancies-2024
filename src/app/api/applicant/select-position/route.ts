import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;


    let currentRecruitment = await prisma.currentRecruitment.findFirst({});

    let data = {
      userId: Number(userId),
      jobId: Number(res?.data?.jobId),
      currentRecruitmentId: Number(currentRecruitment?.id),
    };

    let response = await prisma.application.create({
      data,
      include: {
        Job: true,
      },
    });

    return NextResponse.json({ response });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function GET(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    let userId = session?.user?.id;

    const application = await prisma.application.findMany({
      where: {
        userId: userId,
        deleted: 0,
      },
      select: {
        jobId: true,
      },
    });

    let response = application.map((m:any) => m.jobId);

    return NextResponse.json({ response });
  } catch (error) {
    console.log("=====errrr ", error);
  }
}

export async function DELETE(request: Request) {
  try {
    const res = await request.json();

    const session: any = await getServerSession(authOptions);

    let userId = session?.user?.id;

    let application = await prisma.application.findFirst({
      where: {
        userId: Number(userId),
        jobId: Number(res?.jobId),
      },
    });

    let response = await prisma.application.delete({
      where: {
        id: application?.id,
        jobId: Number(res?.jobId),
      },
      include: {
        Job: true,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log("DELETE=====errrr ", error);
  }
}
