import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
import PersonalInfo from "@/src/components/applicant/PersonalInfo";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);
    let applicationId: any = searchParams.get("id")?.toString();

    const response = await prisma.application.findFirst({
      where: {
        id: Number(applicationId),
      },
      include: {
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
            RejectReason: true,
          },
        },
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
