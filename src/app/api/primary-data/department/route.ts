import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data = {
      divisionId: Number(res.data.division),
      name: res.data.name,
    };
    const department = await prisma.department.create({ data });

    return NextResponse.json({department});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}


export async function GET(request: Request) {
  try {
    //  const res = await request.json();

    const response = await prisma.department.findMany({ include: { Division: true }, });

    return NextResponse.json({response});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}