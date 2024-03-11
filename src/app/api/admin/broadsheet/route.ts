import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
import PersonalInfo from '@/src/components/applicant/PersonalInfo';

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);
    let jobId: any = searchParams.get("id")?.toString();


    const response = await prisma.application.findMany({
        where:{
            jobId: Number(jobId)
        },
      include: {
        Job: true,
        User: {
            include:{
                Personal:{
                    include: {
                        Sex:true,
                        MaritalStatus:true,
                    }
                },
                Employment:true,
                GradesObtained:true,
                SchoolAttended:true,
                Reference:true,
                Publication:true,
                Certificate:true,

            }
        },
      },
    });

    

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
