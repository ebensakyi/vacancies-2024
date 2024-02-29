import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { genCode } from "@/lib/generate-random";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export async function POST(request: Request) {
  try {
    const res = await request.json();
    let password = await genCode(8);
    let email = res.data.email;

    const data = {
      firstName: res.data.firstName,
      surname: res.data.surname,
      otherNames: res.data.otherNames,
      email: res.data.email,
      phoneNumber: res.data.phone,
      password: bcrypt.hashSync(password, salt),
      userRoleId: Number(res.data.userRole),
      de
    };
    const user = await prisma.user.create({ data });

    const adminData = {
      position: res.data.position,
      userId: Number(user.id),
      departmentId: Number(res.data.department),
    };
    const admin = await prisma.admin.create({ data: adminData });

    let accessibleJob = res.data.accessibleJobs;

    let newAccessible = accessibleJob.map((aj) => ({
      userId: Number(user.id),
      jobId: aj.jobId,
    }));

    const accessibleJobs = await prisma.accessibleJob.createMany({
      data: newAccessible,
    });

    console.log(password);

    let send = await sendMail(
      email,
      "WAEC Recruitment User credentials",
      `<h4>Welcome to WAEC Recruitment Portal.</h4><br /><p>Your user credentials are;<br/>Email: ${email} <br/>Password: ${password}</p>`
    );
    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();

    const data = {
      name: res.data.name,
      deadline: new Date(res.data.deadline),
      age: Number(res.data.age),
      minimumGrade: Number(res.data.miniGrade),
      experience: Number(res.data.experience),
      note: res.data.note,
      educationLevelId: Number(res.data.miniEducation),
      staffTypeId: Number(res.data.staffType),

    };
    const response = await prisma.policy.update({ data, where: { id: Number(res.data.id) } });


    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}


export async function GET(request: Request) {
  try {
    //  const res = await request.json();
    const response = await prisma.user.findMany({
      where: { deleted: 0 },
      include: { UserRole: true, Department: true }
    });


    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}

export async function DELETE(request: Request) {
  try {
    const res = await request.json();
    const response = await prisma.policy.update({
      where: { id: Number(res?.id) },
      data: { deleted: 1 }
    });


    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}