import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const currentShortlistingData = {
      recruitmentId: Number(res.data.currentShortlisting),
      createdBy: userId,
    };
    const currentRecruitmentData = {
      recruitmentId: Number(res.data.currentRecruitment),
      createdBy: userId,
    };

    await prisma.currentRecruitment.deleteMany({});
    await prisma.currentShortlisting.deleteMany({});

    await prisma.$transaction([
      prisma.currentRecruitment.create({ data: currentRecruitmentData }),
      prisma.currentShortlisting.create({ data: currentShortlistingData }),
    ]);

    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function GET(request: Request) {
  try {
    //  const res = await request.json();
    const currentRecruitment = await prisma.currentRecruitment.findFirst({
      where: { deleted: 0 },
      include: { Recruitment: true },
    });
    const currentShortlisting = await prisma.currentShortlisting.findFirst({
      where: { deleted: 0 },
      include: { Recruitment: true },
    });

    let response = {currentRecruitment, currentShortlisting};
    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}

export async function DELETE(request: Request) {
  try {
    const res = await request.json();
    const response = await prisma.policy.update({
      where: { id: Number(res?.id) },
      data: { deleted: 1 },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
