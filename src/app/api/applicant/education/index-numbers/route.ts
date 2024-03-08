import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import axios from "axios";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const surname = session?.user?.surname;
    const firstName = session?.user?.firstName;

    let indexNumber = res.data.indexNumber;
    let examYear = res.data.examYear;
    let examType = res.data.examType;

    // let data = {
    //   userId: userId,
    //   indexNumber: indexNumber,
    //   year: examYear,
    //   examTypeId: examType,
    // };

    let results = await getCandidateResults(
      indexNumber,
      examType,
      examYear,
      surname,
      firstName
    );

    let candidateDetails = results[0];
    let isRightUser = results[1];

    // console.log("isRightUser ", isRightUser);
    // console.log("candidateDetails ", candidateDetails);
    if (isRightUser) {
      const response = await prisma.indexNumber.create({
        data: {
          candidateNumber: indexNumber,
          examYear: examYear,
          candidateName: candidateDetails.candidate.cname,
          candidateDob: candidateDetails.candidate.dob,
          candidateGender: candidateDetails.candidate.gender + "",
          userId: userId,
          examTypeId: Number(examType),
        },
        include: {
          ExamType: true,
        },
      });

      let results = candidateDetails.resultdetails;
      console.log(results);

      //save results in db
      for (let i = 0; i < results.length; i++) {
        await prisma.gradesObtained.create({
          data: {
            subjectCode: results[i].subjectcode,
            subject: results[i].subject,
            grade: results[i].grade,
            interpretation: results[i].interpretation,
            userId: userId,
            indexNumberId: response.id,
          },
        });
      }

      return NextResponse.json({ response });
    }

    return NextResponse.json({}, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function GET(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    let userId = session?.user?.id;

    const response = await prisma.indexNumber.findMany({
      where: { userId: userId },
      include: {
        ExamType: true,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}

export async function DELETE(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    let userId = session?.user?.id;
    const res = await request.json();

    let indexNumberId = res;

    const gradesObtainedIds = await prisma.gradesObtained.findMany({
      where: { userId: userId, indexNumberId },
      select: {
        id: true,
      },
    });

    console.log(indexNumberId);

    console.log(gradesObtainedIds);

    for (let i = 0; i < gradesObtainedIds.length; i++) {
      console.log(gradesObtainedIds[i].id);

      await prisma.gradesObtained.delete({
        where: { userId: userId, id: gradesObtainedIds[i].id },
      });
    }

    const response = await prisma.indexNumber.delete({
      where: { userId: userId, id: res },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}

const getCandidateResults = async (
  indexNumber: string,
  examType: string,
  examYear: string,
  surname: string,
  firstName: string
): Promise<any> => {
  console.log(indexNumber);
  console.log(examType);
  console.log(examYear);
  console.log(surname);
  console.log(firstName);

  try {
    const options = {
      method: "POST",
      url: "https://verify.waecgh.org/api/resultsreq/v3",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/8.6.1",
        Authorization: "Basic cXBmZ3J6dG06TktuclA4VURSdg==",
      },
      data: {
        cindex: indexNumber,
        examyear: examYear,
        examtype: examType,
        reqref: nanoid(20),
      },
    };

    const response = await axios.request(options);

    let candidateName = response.data.candidate.cname;
    let canditateResult = response.data.resultdetails;
    if (canditateResult.length == 0) {
      return [null, false];
    }

    let compareUser = await compareUserWithResults(
      candidateName,
      surname,
      firstName
    );

    return [response.data, compareUser];
  } catch (error) {
    console.error(error);
  }
};

const compareUserWithResults = async (
  resultsCandidateName: string,
  surname: string,
  firstName: string
) => {
  let containsFirstName = resultsCandidateName
    .toUpperCase()
    .includes(firstName.toUpperCase());
  let containsSurname = resultsCandidateName
    .toUpperCase()
    .includes(surname.toUpperCase());

  if (!containsFirstName && !containsSurname) {
    return false;
  }
  return true;
};
