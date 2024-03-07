import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;
    let { searchParams } = new URL(request.url);

    let id: any = searchParams.get("id")?.toString();

    const fullApplication = await prisma.application.findFirst({
      where: { userId: userId,deleted:0 },
      orderBy: { id: "desc" },
      include: {
        User: {
          include: {
            Personal: {
              include: {
                Sex: true,
                MaritalStatus: true,
              },
            },
            Employment: true,
            GradesObtained: true,
            SchoolAttended: {
              include: {
                EducationLevel: true,
              },
            },
            Publication: true,
            Reference: true,
            Certificate: true,
            Essay: true,
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
        Job: true,
      },
    });
    const positions = await prisma.application.findMany({
      where: {
        userId: userId,
        deleted: 0,
      },
      include: {Job:true}
    });

    let response = { fullApplication, positions };

    return NextResponse.json({ response });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(request: Request) {
  try {
    return NextResponse.json({});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
