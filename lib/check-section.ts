// import { prisma } from "@/prisma/db";
// import requirements from "./section-requirements";

// export const isSectionValid = async (
//   model: string,
//   conditions: any,
//   requiredCount: any,
//   userId: any
// ) => {

//   let personal = requirements.personal.name;
//   let schools = requirements.schools.name;
//   let grades = requirements.grades.name;
//   let certifications = requirements.certifications.name;
//   let employment = requirements.employment.name;
//   let references = requirements.references.name;


//   if (model == personal) {
//     let pcount = await prisma.personal.count({ where: { userId } });

//     if (pcount == requiredCount) {
//       return true;
//     }
//     return false;
//   } else if (model == schools) {
//     let scount = await prisma.schoolAttended.count({ where: { userId } });
//     if (scount >= 1) {
//       return true;
//     }
//     return false;
//   } else if (model == grades) {
//     //let gcount = await prisma.gradesObtained.count({ where: { userId } });
//     let basicCount = await prisma.gradesObtained.count({
//       where: { userId, examTypeId: 1 },
//     });
//     let seniorCount = await prisma.gradesObtained.count({
//       where: {
//         userId,
//         OR: [
//           { examTypeId: 2 },
//           { examTypeId: 3 },
//           { examTypeId: 4 },
//           { examTypeId: 5 },
//           { examTypeId: 6 },
//         ],
//       },
//     });

//     let oLevelCount = await prisma.gradesObtained.count({
//       where: { userId, examTypeId: 6 },
//     });
//     let aLevelCount = await prisma.gradesObtained.count({
//       where: { userId, examTypeId: 5 },
//     });

   

//     if (
//       (basicCount >= 5 && seniorCount >= 5) ||
    
//       (oLevelCount >= 5 && aLevelCount >= 4)
//     ) {
//       return true;
//     }
//     return false;
//   } else if (model == certifications) {
//     let ccount = await prisma.certificate.count({ where: { userId } });
//     if (ccount >= 1) {
//       return true;
//     }
//     return false;
//   } else if (model == employment) {
//     let ecount = await prisma.employment.count({ where: { userId } });
//     if (ecount >= 1) {
//       return true;
//     }
//     return false;
//   } else if (model == references) {
//     let rcount = await prisma.reference.count({ where: { userId } });
//     if (rcount == 3) {
//       return true;
//     }
//     return false;
//   }
// };
