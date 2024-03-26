export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
export async function GET(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    let userId = session?.user?.id;

    const application = await prisma.application.findMany({
      where: {
        userId: userId,
        deleted: 0,
      },
      include: {
        Job: {
          include: {
            Policy: {
              include: {
                Recruitment: true,
              },
            },
          },
        },
      },
    });


    let response = application.map((app:any) => app.Job.Policy.Recruitment.staffTypeId);

 
    return NextResponse.json({ response });
  } catch (error) {
    console.log("=====errrr ", error);
  }
}
