import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    console.log(res);
    

    const data = {
      name: res.data.name,
      examTypeId: Number(res.data.examType),
      subjectTypeId: Number(res.data.subjectType),
    };
    const subject = await prisma.subject.create({ data });

    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}


export async function GET(request: Request) {
  try {
    const response = await prisma.subject.findMany({
      where: { deleted: 0 },
      include: {
        SubjectType: true,
        ExamType: true
      }, orderBy: {
        name: "asc"
      }
    });


    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}