import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;

    let data = {
      userId: userId,
      institutionName: res.data.schoolName,
      educationLevelId: Number(res.data.educationLevel),
      institutionStart: res.data.startYear,
      institutionEnd: res.data.endYear,
    };
    const response = await prisma.schoolAttended.create({
      data,
      include: {
        EducationLevel: true,
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

    const response = await prisma.schoolAttended.findMany({
      where: { userId: userId },
      include: { EducationLevel: true },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}

export async function DELETE(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    let userId = session?.user?.id;
    const res = await request.json();

    const response = await prisma.schoolAttended.delete({
      where: { id: res, userId },
      include: { EducationLevel: true },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
