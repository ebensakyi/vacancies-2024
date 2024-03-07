import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: Request) {
  try {
    const res = await request.json();

    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const response = await prisma.application.findMany({
      where: { userId: userId, id: Number(res.data.id) },
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
      },
    });

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
