import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";


export async function POST(request: Request) {
  try {
    const res = await request.json();
    const data = {
      name: res.data.grade,
      interpretation: Number(res.data.interpretation),
      examTypeId: Number(res.data.examType),
    };
    const grade = await prisma.grade.create({ data });


    return NextResponse.json({ grade });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}


export async function GET(request: Request) {
  try {
    //  const res = await request.json();

    const response = await prisma.grade.findMany({
      include: { ExamType: true },
    });

    console.log(response);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}