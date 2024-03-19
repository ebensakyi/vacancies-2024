import { sendMail } from "@/lib/mail-sender";
import { prisma } from "@/prisma/db";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function GET(request: Request) {}

export async function POST(request: Request) {
  const res = await request.json();
  let email = res.data.email;

  let emailExist = await prisma.user.count({ where: { email } });
  if (!emailExist) {
    return NextResponse.json({}, { status: 201 });
  }
  let user:any = await prisma.user.findFirst({ where: { email } });

  let send = await sendMail(
   email,
    "WAEC Recruitment Password Reset",
    `<h4>Welcome to WAEC Recruitment Portal.</h4><br />
    <p>Click on the link below to reset your password;\n<br/><p>URL: <a href="https://vacancies.waecgh.org/api/auth/reset-password?id=${nanoid(200)}#$${user.id}"> Reset password</a></p> <br/>`
  );

  return NextResponse.json({});
}
