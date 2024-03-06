import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;


    
    let age = calculateAge(res.data.dob);
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        firstName: res.data.firstName,
        surname: res.data.surname,
        otherNames: res.data.otherNames,
        phoneNumber: res.data.phone,
      },
    });


      let data = {
        userId,
        titleId: Number(res.data.title),
        permanentAddress: res.data.permanentAddress,
        presentAddress: res.data.presentAddress,
        dob: res.data.dob,
        hometown: res.data.hometown,
        birthPlace: res.data.birthPlace,
        maritalStatusId: res.data.maritalStatusId,
        sexId: Number(res.data.sexId),
        haveKids: Number(res.data.haveKids),
        childrenNumber: Number(res.data.childrenNumber),
        sonsInfo: res.data.sonsInfo,
        daughtersInfo: res.data.daughtersInfo,
        ageAtApplication: age,

        residenceTel: res.data.residenceTel,
      };

      const response = await prisma.personal.create({ data });
      return NextResponse.json({response});
  
  } catch (error: any) {
    console.log("error==>",error);
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;

    console.log(">>>>>>>>>>>>>update",res.data.id);
    

    let age = calculateAge(res.data.dob);
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        firstName: res.data.firstName,
        surname: res.data.surname,
        otherNames: res.data.otherNames,
        phoneNumber: res.data.phone,
      },
    });

    let data = {
      userId,
      titleId: Number(res.data.title),
      permanentAddress: res.data.permanentAddress,
      presentAddress: res.data.presentAddress,
      dob: res.data.dob,
      hometown: res.data.hometown,
      birthPlace: res.data.birthPlace,
      maritalStatusId: res.data.maritalStatusId,
      sexId: Number(res.data.sexId),
      haveKids: Number(res.data.haveKids),
      childrenNumber: Number(res.data.childrenNumber),
      sonsInfo: res.data.sonsInfo,
      daughtersInfo: res.data.daughtersInfo,
      ageAtApplication: age,

      residenceTel: res.data.residenceTel,
    };

    const response = await prisma.personal.update({
      data,
      where: { id: Number(res.data.id) },
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

    let userId = session?.user?.id;    


    const response = await prisma.personal.findUnique({
      where: { userId: Number(userId) },
    });
    

    return NextResponse.json({response});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}

function calculateAge(dateOfBirth: Date) {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}
