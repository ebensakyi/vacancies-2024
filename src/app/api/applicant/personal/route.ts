import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session :any= await getServerSession(authOptions);
    const userId = session?.user?.id;


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

    const count = await prisma.personal.count({
      where: { userId },
    });
    if (!count) {
      let data = {
        userId,
        title:res.data.title,
        address: res.data.address,
        dob: res.data.dob,
        hometown: res.data.hometown,
        birthPlace: res.data.birthPlace,
        maritalStatusId: res.data.maritalStatusId,
        sexId: res.data.sexId,
        haveKids: Number(res.data.haveKids),
        childrenNumber: Number(res.data.childrenNumber),
        sonsInfo: res.data.sonsInfo,
        daughtersInfo: res.data.daughtersInfo,

        residenceTel: res.data.residenceTel,
      };

      const personal = await prisma.personal.create({ data });
      return NextResponse.json({});
    }

    return NextResponse.json({},{status:201});
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