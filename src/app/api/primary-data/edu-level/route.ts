import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";


export async function POST(request: Request) {
  try {
    const res = await request.json();
    const data = {
      name: res.data.name,
    };
    const response = await prisma.educationLevel.create({ data });


    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}


export async function GET(request: Request) {
  try {
    //  const res = await request.json();
    const response = await prisma.educationLevel.findMany({
      where: { deleted: 0 }, orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({response});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}