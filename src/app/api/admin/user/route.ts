import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { genCode } from "@/lib/generate-random";
import bcrypt from "bcryptjs";
import { sendMail } from "@/lib/mail-sender";
import { nanoid } from 'nanoid'

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
      departmentId: Number(res.data.userRole),
      position: res.data.position,

    };

    const emailExists = await prisma.user.findFirst({
      where: {
        email: res.data.email
      }
    });

    const phoneExists = await prisma.user.findFirst({
      where: {
        email: res.data.phone
      }
    });
    if (emailExists|| phoneExists) {
      return NextResponse.json({}, { status: 201 });
    }


    const user = await prisma.user.create({ data });


    let accessibleJob = res.data.accessibleJobs;

    let newAccessible = accessibleJob.map((aj: any) => ({
      userId: Number(user.id),
      jobId: aj.jobId,
    }));

    const accessibleJobs = await prisma.accessibleJob.createMany({
      data: newAccessible,
    });


    let send = await sendMail(
      email,
      "WAEC Recruitment User credentials",
      `<h4>Welcome to WAEC Recruitment Portal.</h4><br /><p>Your user credentials are;<br/>Email: ${email} <br/>Password: ${password}</p>`
    );
    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();
    let password = await genCode(8);
    let email = res.data.email;
    let id = Number(res.data.id);



    const data = {
      firstName: res.data.firstName,
      surname: res.data.surname,
      otherNames: res.data.otherNames,
      email: res.data.email,
      phoneNumber: res.data.phone,
      password: bcrypt.hashSync(password, salt),
      userRoleId: Number(res.data.userRole),
      departmentId: Number(res.data.userRole),
      position: res.data.position,

    };

    const emailExists = await prisma.user.findFirst({
      where: {
        email: res.data.email
      }
    });

    const phoneExists = await prisma.user.findFirst({
      where: {
        email: res.data.phone
      }
    });
    if (emailExists|| phoneExists) {
      return NextResponse.json({}, { status: 201 });
    }

 
    const user = await prisma.user.update({ data,where:{id:id} });


    let accessibleJob = res.data.accessibleJobs;


    await prisma.accessibleJob.deleteMany({ where:{userId:id} });


    // const modifiedArray = await accessiblePages?.map(item => ({
    //   pageId: item?.id,
    //   userRoleId: response?.id
    // }));

    // await prisma.accessibleJob.createMany({ data: modifiedArray });



    let newAccessible = accessibleJob.map((aj: any) => ({
      userId: Number(user.id),
      jobId: aj.jobId,
    }));

    const accessibleJobs = await prisma.accessibleJob.createMany({
      data: newAccessible,
    });


    let send = await sendMail(
      email,
      "WAEC Recruitment User credentials",
      `<h4>Welcome to WAEC Recruitment Portal.</h4><br /><p>Your user credentials are;<br/>Email: ${email} <br/>Password: ${password}</p>`
    );


    return NextResponse.json({});
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
      include: { UserRole: true, Department: true, AccessibleJob: true }
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

    console.log(res);
    

    const user = await prisma.user.findFirst({where:{
      id: Number(res?.id)
    }})

    let email = `${user?.email }--${nanoid(10)}`
    let phone = `${user?.phoneNumber }--${nanoid(10)}`

    const response = await prisma.user.update({
      where: { id: Number(res?.id) },
      data: { deleted: 1,email:email,phoneNumber:phone}
    });


    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

}