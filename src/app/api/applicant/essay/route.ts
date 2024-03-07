import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function POST(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const res = await request.json();
    
    let data = {
      userId: userId,
      essay: res.data.essay,
    };


      const response = await prisma.essay.create({
        data,
      });

     


    return NextResponse.json({response});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}


export async function GET(request: Request) {
  try {
    //  const res = await request.json();


    return NextResponse.json({});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}