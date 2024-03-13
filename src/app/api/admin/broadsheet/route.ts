import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);
    // let applicationId: any = searchParams.get("id")?.toString();

    
    const curPage = Number(searchParams.get("page")) || 1;
    const perPage = 1;
    const skip = Math.max(0, (curPage - 1) * perPage);

    const response = await prisma.application.findMany({
      where: {
        deleted: 0,
        submitted: 1,
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

      skip: skip,
      take: perPage,
    });

    const count = await prisma.application.count({
      where: {
        deleted: 0,
        submitted: 1,
      },
    });

    return NextResponse.json({
      response,
      curPage: curPage,
      maxPage: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
