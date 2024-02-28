import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {

    let { searchParams } = new URL(request.url)
    let id = Number(searchParams.get("id"))


    const response = await prisma.advert.findFirst({ where: { deleted: 0, id: id }, });


    return NextResponse.json({ response });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: error });
    }

}