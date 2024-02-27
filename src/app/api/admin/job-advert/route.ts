import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data = {
      details: res.data.detail,
      policyId: Number(res.data.policy),
      name: res.data.name,
    };
    const response = await prisma.advert.create({ data });


    return NextResponse.json(response);


  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}


export async function GET(request: Request) {
  try {
    //  const res = await request.json();
    const response = await prisma.advert.findMany({ where: { deleted: 0 }, include: { Policy: true } });

    console.log(response);

    return NextResponse.json({ response });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}