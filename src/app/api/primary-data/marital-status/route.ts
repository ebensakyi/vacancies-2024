import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data = {
      name: res.data,
    };
    const maritalStatus = await prisma.maritalStatus.create({ data });

    return NextResponse.json({maritalStatus});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}


export async function GET(request: Request) {
  try {
    //  const res = await request.json();

    const maritalStatus = await prisma.maritalStatus.findMany();

    return NextResponse.json({maritalStatus});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}