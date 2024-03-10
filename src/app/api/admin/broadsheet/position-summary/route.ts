import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";



  export async function GET(request: Request) {
    try {
    

          const response = await prisma.job.findMany({
            include: {
              _count: {
                select: { Application: true },
              },
            },
          })
      
  
      return NextResponse.json({ response });
  
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: error });
    }
  
  }