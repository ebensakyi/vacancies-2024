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

    let isRightUser = results[0];
    let candidateDetails = results[1];

    console.log("isRightUser ", isRightUser);
    console.log("candidateDetails ", candidateDetails);
    if (isRightUser) {
      const savedIndexNumber = await prisma.indexNumber.create({
        data: {
          candidateNumber: indexNumber,
          examYear: examYear,
          candidateName: candidateDetails.candidate.cname,
          candidateDob: candidateDetails.candidate.dob,
          userId: userId,
          examTypeId: examType,
        },
      });

      //save results in db
      for (let i = 0; i < candidateDetails.length; i++) {
        const response = await prisma.gradesObtained.create({
          data: {
            subjectCode: "",
            subject: "",
            grade: "",
            interpretation: "",
            userId: userId,
            indexNumberId: savedIndexNumber.id,
          },
        });
      }

      return NextResponse.json({});
    }

    return NextResponse.json({});
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
  let containsFirstName = resultsCandidateName.includes(firstName);
  let containsSurname = resultsCandidateName.includes(surname);

  if (!containsFirstName && !containsSurname) {
    return false;
  }
  return true;
};
