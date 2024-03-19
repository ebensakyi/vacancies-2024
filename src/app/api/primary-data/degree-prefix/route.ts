import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";



export async function GET(request: Request) {
  try {
 //const res = await request.json();

    const response = await prisma.degreePrefix.findMany({ });

    
    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}

export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data = {
    
      name: res.data.name,
    };
    const degreePrefixes = await prisma.degreePrefix.create({ data });

    return NextResponse.json({ degreePrefixes });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}


