import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { sex } from "./sex";
import { degreePrefix } from "./degree-prefix";
import { division } from "./division";
import { department } from "./department";
import { educationLevel } from "./education-level";
import { examType } from "./exam-type";
import { examTypeNew } from "./exam-type-new";
import { grade } from "./grade";
import { pages } from "./pages";
import { staffType } from "./staff-type";
import { subjectType } from "./subject-type";
import { userRole } from "./user-role";
import { subject } from "./subject";
import { maritalStatus } from "./marital-status";
import { rt } from "./recruitment-type";
import { yes_no } from "./yes-no";
import { superAdmin } from "./user";
import { reasons } from "./reason";
import { titles } from "./title";

async function main() { await prisma.division.createMany({
    data: division,
  });
  await prisma.department.createMany({
    data: department,
  });await prisma.userRole.createMany({
    data: userRole,
  }); await prisma.user.createMany({
    data: superAdmin,
  });
  await prisma.sex.createMany({
    data: sex,
  });
  await prisma.degreePrefix.createMany({
    data: degreePrefix,
  });
 
  await prisma.educationLevel.createMany({
    data: educationLevel,
  });
  await prisma.examType.createMany({
    data: examType,
  });
  await prisma.grade.createMany({
    data: grade,
  });
  await prisma.page.createMany({
    data: pages,
  });
  await prisma.staffType.createMany({
    data: staffType,
  });

  await prisma.subjectType.createMany({
    data: subjectType,
  });
  
  await prisma.subject.createMany({
    data: subject,
  });
  await prisma.maritalStatus.createMany({
    data: maritalStatus,
  });
  await prisma.recruitment.createMany({
    data: rt,
  });
  // await prisma.policy.createMany({
  //   data: policy,
  // });
  await prisma.yesNo.createMany({
    data: yes_no,
  });
 
  await prisma.reason.createMany({
    data: reasons,
  });
  await prisma.examTypeNew.createMany({
    data: examTypeNew,
  });

  await prisma.title.createMany({
    data: titles,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // await prisma.$disconnect();
  });
