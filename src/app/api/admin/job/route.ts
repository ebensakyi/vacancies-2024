import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data = {
      policyId: Number(res.data.policy),
      name: res.data.name,
    };
    const response = await prisma.job.create({ data });


    return NextResponse.json(response, { status: 200 });


  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}


export async function PUT(request: Request) {
  try {
    const res = await request.json();
    let update = res.data.update
    let publish = res.data.publish

    let id = Number(res.data.id)
    let details = res.data.detail
    let policyId = Number(res.data.policy)
    let name = res.data.name


    if (update) {
      const data = {
        policyId: policyId,
        name: name
      };
      const response = await prisma.job.update({ data, where: { id: id } });
      return NextResponse.json(response, { status: 200 });
    }

    const job = await prisma.job.findFirst({  where: { id: id } });
    let pub = job?.published || 0

    const response = await prisma.job.update({ data: { published: Math.abs(pub-1)  }, where: { id: id } });


    return NextResponse.json(response, { status: 200 });


  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function GET(request: Request) {
  try {
    //  const res = await request.json();
    const response = await prisma.job.findMany({ where: { deleted: 0 }, include: { Policy: true } });


    return NextResponse.json({ response }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}

export async function DELETE(request: Request) {
  try {
    const res = await request.json();
    console.log("RERERES ",res);
    

    const response = await prisma.job.update({ where: { id: Number(res.id) }, data: { deleted: 1 } });


    return NextResponse.json({ response }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}