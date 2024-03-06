import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const salt = bcrypt.genSaltSync(10);

export async function POST(request: Request) {
  try {
    const res = await request.json();

    let data = {
      firstName: res.data.firstName,
      surname: res.data.surname,
      otherNames: res.data.otherNames,
      email: res.data.email,
      phoneNumber: res.data.phoneNumber,
      password:  bcrypt.hashSync(res.data.password, salt),
      userRoleId: 4
    };



    const response:any = await prisma.user.create({ data });


    
      return NextResponse.json({response});
    
  } catch (error: any) {
    if (error.code === "P2002")
    return NextResponse.json({statusCode: 201, message: "Email or Phone number already exist" });
  }
}

export async function GET(request: Request) { }
