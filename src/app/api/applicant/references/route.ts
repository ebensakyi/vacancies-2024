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
      phone: res.data.phone,
      address: res.data.address,
      occupation: res.data.occupation,
      name: res.data.fullName,
    };

    const response = await prisma.reference.create({
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
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const response = await prisma.reference.findMany({
      where: { userId },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}


export async function DELETE(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    let userId = session?.user?.id;
    const res = await request.json();

    const response = await prisma.reference.delete({
      where: { id: res, userId },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
