import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data = {
      name: res.data.name,
    };
    const examType = await prisma.examTypeNew.create({ data });

    return NextResponse.json({examType});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}


export async function GET(request: Request) {
  try {
    //  const res = await request.json();
    const examType = await prisma.examTypeNew.findMany();


    return NextResponse.json({examType});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}