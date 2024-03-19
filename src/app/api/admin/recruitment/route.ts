import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const data = {
      name: res.data.name,
      deadline: new Date(res.data.deadline),
      startDate: new Date(res.data.startDate),

      staffTypeId: Number(res.data.staffType),
      createdBy: Number(userId),

    };

    
    const response = await prisma.recruitment.create({ data });


    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();

    const data = {
      name: res.data.name,
      deadline: new Date(res.data.deadline),
      startDate: new Date(res.data.startDate),

      staffTypeId: Number(res.data.staffType),


    };
    const response = await prisma.recruitment.update({
      data,
      where: { id: Number(res.data.id) }
    });


    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}


export async function GET(request: Request) {
  try {
    //  const res = await request.json();
    const response = await prisma.recruitment.findMany({
      where: { deleted: 0 },
      include: { StaffType: true }
    });

    

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}

export async function DELETE(request: Request) {
  try {
    const res = await request.json();
    const response = await prisma.policy.update({
      where: { id: Number(res?.id) },
      data: { deleted: 1 }
    });


    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}