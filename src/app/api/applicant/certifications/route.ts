import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { educationLevel } from "../../../../../prisma/seeds/education-level";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;

    let data = {
      userId: userId,
      from: res.data.from,
      certificateObtained: res.data.certificateObtained,
      to: res.data.to,
      institution: res.data.institution,
      educationLevelId: Number(res.data.educationLevel),
    };
    const response = await prisma.certificate.create({
      data,
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
    const userId = session?.user?.id;

    const response = await prisma.certificate.findMany({
      where: { userId },
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
    const userId = session?.user?.id;
    const res = await request.json();

    

    const response = await prisma.certificate.delete({
      where: { userId, id: res },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
