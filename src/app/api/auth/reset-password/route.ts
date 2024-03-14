import { sendMail } from "@/lib/mail-sender";
import { prisma } from "@/prisma/db";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export async function GET(request: Request) {}

export async function POST(request: Request) {
  try {
    const res = await request.json();
    let token = res.data.token;
    let password = res.data.password;

    let tokenArr = token.split('-_-')
    let userId = Number(tokenArr[1]);

    console.log("tokenArr",tokenArr);
    console.log(res);
    console.log("userId",userId);


    


  let user = await prisma.user.findFirst({ where: { id: userId } });

  console.log(user);
  

    if (!user) {
      return NextResponse.json({}, { status: 201 });
    }
    
    let hashedPassword = bcrypt.hashSync(password, salt);


    const response: any = await prisma.user.update({
      data: { password:hashedPassword },
      where: { id: userId },
    });

    // let send = await sendMail(
    //   email,
    //   "WAEC Recruitment Password Reset",
    //   `<h4>Welcome to WAEC Recruitment Portal.</h4><br /><p>Click on the link below to reset your password;\n<br/><p>URL: <a href="https://vacancies.waecgh.org/api/auth/reset-password?id=${nanoid(
    //     20
    //   )}"> Reset password</a></p> <br/>`
    // );

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({});

  }
}
