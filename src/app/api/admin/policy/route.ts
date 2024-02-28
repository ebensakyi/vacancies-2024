import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data = {
      name: res.data.name,
      deadline: new Date(res.data.deadline),
      age: Number(res.data.age),
      minimumGrade: Number(res.data.miniGrade),
      experience: Number(res.data.experience),
      note: res.data.note,
      educationLevelId: Number(res.data.miniEducation),
      staffTypeId: Number(res.data.staffType),

    };
    const response = await prisma.policy.create({ data });


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
      age: Number(res.data.age),
      minimumGrade: Number(res.data.miniGrade),
      experience: Number(res.data.experience),
      note: res.data.note,
      educationLevelId: Number(res.data.miniEducation),
      staffTypeId: Number(res.data.staffType),

    };
    const response = await prisma.policy.update({ data,where:{id: Number(res.data.id)} });


    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}


export async function GET(request: Request) {
  try {
    //  const res = await request.json();
    const response = await prisma.policy.findMany({
      where: { deleted: 0 },
      include: { EducationLevel: true, StaffType: true }
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