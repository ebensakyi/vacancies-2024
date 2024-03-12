import Promise, { resolve ,reject} from "bluebird";
import _ from "lodash";
import AWS from "aws-sdk";
const fs = require("fs");

//import pdf  from "html-pdf";
const pdf = Promise.promisifyAll(require("html-pdf"));

var XLSX = require("xlsx");

import { calculateAge } from "@/lib/calculate-age";
import { prisma } from "@/prisma/db";
import moment from "moment";
import { NextResponse } from "next/server";
import { broadsheetTemplate } from "@/lib/broadsheet-template";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
    const puppeteer = require('puppeteer');



export async function POST(request: Request) {
 // try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;

 

    let jobId = res.jobId;
    let fileType = res.fileType;
    let broadsheetType = res.broadsheetType;

      await generate(jobId, fileType, broadsheetType);
     const response = new NextResponse()
response.headers.set('content-type', 'application/pdf');
response.headers.set('content-disposition', 'attachment; filename="example.pdf"');

return response;

    // return NextResponse.json({ response });


 


  // } catch (error) {
  //   console.log(error);
  //   return NextResponse.json({ message: error });
  // }
}

const generate = async (jobId: any, fileType: any, broadsheetType: any) => {
  if (fileType == "pdf") {
    generatePdf(jobId, broadsheetType);
  }
  if (fileType == "xls") {
    generateXls(jobId, broadsheetType);
  }
};

const generatePdf = async (
  jobId: number,
  broadsheetType: any
) => {
  try {
    let where = {};
    let pdfText = "";
    let jobName = "";
    let typeName = "";

       if (broadsheetType == 'undefined') {
      typeName = "ALL";
      where = { submitted: 1, jobId: Number(jobId) };
    } else if (broadsheetType == '-1') {
      typeName = "UNWORKED";
      where = { submitted: 1, jobId: Number(jobId), shortlisted: -1 };
    } else if (broadsheetType == '1') {
      typeName = "SHORTLISTED";
      where = { submitted: 1, jobId: Number(jobId), shortlisted: 1 };
    } else if (broadsheetType == '0') {
      typeName = "REJECTED";
      where = { submitted: 1, jobId: Number(jobId), shortlisted: 0 };
    }

    
    const broadsheet = await prisma.application.findMany({
      where: where,

      include: {
        User: {
          include: {
            Personal: {
              include: {
                Sex: true,
                MaritalStatus: true,
              },
            },
            Employment: true,
            SchoolAttended: {
              include: {
                EducationLevel: true,
              },
            },
            GradesObtained: {
              include: {
                IndexNumber: {
                  include: { ExamType: true },
                },
              },
            },
            Publication: true,
            Reference: true,
            Certificate: true,
            Essay: true,
            Bonded: {
              include: {
                YesNo: true,
              },
            },
            Confirmation: {
              include: {
                YesNo: true,
              },
            },
          },
        },
        Job: true,
        RejectReason: {
          include: {
            Reason: true,
          },
        },
      },
    });

   
    {
      let i = 1;
      pdfText = broadsheet
        .map((bs: any) => {
          //  jobName = bs.Job.name;

          return `<tr key=${bs.id}>
        <td> ${i++}</td>
        <td> ${bs.id}</td>
              <td>
                ${_.startCase(_.lowerCase(bs.User.otherNames))} ${_.startCase(
            _.lowerCase(bs.User.otherNames)
          )} ${_.startCase(_.lowerCase(bs.User.surname))}
        <br />
               
            
                ${bs.User.phoneNumber} <br />
                ${bs.User.Personal.residenceTel}<br/>
                ${bs.User.email}<br />
                ${bs.User.Personal.address}
              </td>
      
             
              <td>
                ${calculateAge(bs.User.Personal.dob)} yrs
              </td>

               <td>
               ${bs.User.SchoolAttended.map((sa: any) => {
                 return `${sa.institutionName} <br/> ${sa.EducationLevel.name} <br/>${sa.institutionStart} to ${sa.institutionEnd}<br/><br/>`;
               }).join("")}

               ${bs.User.Certificate.map((cert: any) => {
                 return `${cert.institution} <br/> ${cert.certificateObtained} <br/>${cert.from} to ${cert.to}<br/><br/>`;
               }).join("")}
             
              ${bs.User.GradesObtained.map((gd: any) => {
                return `${gd.IndexNumber.ExamType.name}(${gd.examYear}) - ${
                  gd.subject
                } - ${gd.grade}  <br/> `;
              }).join("")}
             </td> 

            
              <td>
              ${bs.User.Employment.map((emp: any) => {
                return `${emp.organizationName} <br/> ${emp.position} <br/> GHS ${emp.salary}<br/>
                  ${emp.start}  to  ${emp.end}<br/><br/>`;
              }).join("")}
              </td>

             
             <td>
         
             ${
               broadsheetType == 0
                 ? bs.RejectReason.map((rr: any) => {
                     return `${rr.Reason.reason} <br/><br/>`;
                   }).join("")
                 : ""
             }
             
             </td>

            </tr>`;
        })
        .join("");
    }
    let html = broadsheetTemplate(pdfText);



    let date = new Date();
    let formatted = moment(date).format("DDMMYYYYhhmm");
    let fileName =
      jobName.trim().replaceAll("/", "_") +
      "_" +
      typeName +
      "_" +
      formatted +
      ".pdf";



      // let options:{} = {
      //   format: "A4",
      //   orientation: "landscape",
      //   header: {
      //     height: "25mm",
      //     contents: `<div style="text-align: center;">THE WEST AFRICAN EXAMINATIONS COUNCIL</div>
      //     <div style="text-align: center;">BROADSHEET FOR ${typeName} - ${jobName}</div>`,
      //   },
      //   border: {
      //     top: "0.2in",
      //     right: "0.2in",
      //     bottom: "0.2in",
      //     left: "0.8in",
      //   },
  
     
      // }  


      (async () => {
        const browser = await puppeteer.launch();
       
        const page = await browser.newPage();
       
        await page.setContent(html);
       
      let file =  await page.pdf({ path: 'example.pdf', format: 'A4', orientation: 'portrait', });
       
        await browser.close();

        
       
       })();


 //   let response = await pdf.create(html, options);

 // new Promise(async (resolve, reject) => {

  // const options = {
  //   format: 'A4',
  //   orientation: 'portrait',
  //   border: '10mm',
  //   footer: {
  //     height: '10mm',
  //   },
  //   type: 'pdf',
  //   timeout: 30000,
  // };

//   const buffer = await pdf.create(html, {
//     format: "A4",
//     orientation: "landscape",
//     header: {
//       height: "25mm",
//       contents: `<div style="text-align: center;">THE WEST AFRICAN EXAMINATIONS COUNCIL</div>
//       <div style="text-align: center;">BROADSHEET FOR ${typeName} - ${jobName}</div>`,
//     },
//     border: {
//       top: "0.2in",
//       right: "0.2in",
//       bottom: "0.2in",
//       left: "0.8in",
//     },

 
//   } ).toBuffer((err: any, buffer: unknown) => {
//     if (err) {
//       return reject(err);
//       }
  
//       return resolve(buffer);
//   });
// });
   


    // let file = "./public/broadsheet/" + fileName;   
    //  console.log("fileName===> ",file);

    // let uploadedFile = await uploadFile(file, fileName);

    // let fileUrl = uploadedFile?.Location;

    // console.log(uploadedFile);

   // return NextResponse.json({ fileName, url: fileUrl });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
const uploadFile = async (fileName: string, location: any) => {
  try {
    // let data = fs.readFileSync(file);
    var filePath = `${fileName}`;

    const params = {
      Bucket: "vacancies-gh", // pass your bucket name
      Key: fileName, // file will be saved as testBucket/contacts.csv
      // Body: JSON.stringify(data, null, 2),
      Body: fs.createReadStream(filePath),

      ACL: "public-read",
    };

    let stored = await s3.upload(params).promise();

    return stored;
  } catch (error) {
    console.log("Errrr ", error);
    return error;
  }
};
const generateXls = async (
  jobId: number,
  broadsheetType: string
) => {
  try {
    let where = {};
    let pdfText = "";
    let jobName = "";
    let typeName = "";

    if (broadsheetType == 'undefined') {
      typeName = "ALL";
      where = { submitted: 1, jobId: Number(jobId) };
    } else if (broadsheetType == '-1') {
      typeName = "UNWORKED";
      where = { submitted: 1, jobId: Number(jobId), shortlisted: -1 };
    } else if (broadsheetType == '1') {
      typeName = "SHORTLISTED";
      where = { submitted: 1, jobId: Number(jobId), shortlisted: 1 };
    } else if (broadsheetType == '0') {
      typeName = "REJECTED";
      where = { submitted: 1, jobId: Number(jobId), shortlisted: 0 };
    }


    const broadsheet = await prisma.application.findMany({
      where: where,

      include: {
        User: {
          include: {
            Personal: {
              include: {
                Sex: true,
                MaritalStatus: true,
              },
            },
            Employment: true,
            SchoolAttended: {
              include: {
                EducationLevel: true,
              },
            },
            GradesObtained: {
              include: {
                IndexNumber: {
                  include: { ExamType: true },
                },
              },
            },
            Publication: true,
            Reference: true,
            Certificate: true,
            Essay: true,
            Bonded: {
              include: {
                YesNo: true,
              },
            },
            Confirmation: {
              include: {
                YesNo: true,
              },
            },
          },
        },
        Job: true,
        RejectReason: {
          include: {
            Reason: true,
          },
        },
      },
    });

     //let x = JSON.stringify(broadsheet);
    //  console.log(x);

    let i = 1;
    pdfText = broadsheet
      .map((bs: any) => {
        // jobName = bs.Job.name;

        ` sn: ${i++},
        id: ${bs.id},
         name: 
                ${_.startCase(_.lowerCase(bs.User.firstName))} ${_.startCase(
          _.lowerCase(bs.User.otherNames)
        )} ${_.startCase(_.lowerCase(bs.User.surname))},
       
          phoneNumber:  ${bs.User.phoneNumber},
          residenceTel:     ${bs.User.Personal.residenceTel},
          email:    ${bs.User.email},
          Address:   ${bs.User.Personal.address},
          Age:${calculateAge(bs.User.Personal.dob)} yrs,
          Cert:  ${bs.User.Certificate.map((cert: any) => {
            return `${cert.certificateObtained} <br/> ${cert.from} to ${cert.to}<br/><br/>`;
          }).join("")},
             
          Grade:  ${bs.User.GradesObtained.map((gd: any) => {
            return `${gd.ExamType.name}(${gd.year.split("-")[0]}) - ${
              gd.Subject.name
            } - ${gd.Grade.name} `;
          }).join("")},
          Employment: 
              ${bs.User.Employment.map((emp: any) => {
                return `${emp.organizationName} <br/> ${emp.position} <br/> GHS ${emp.salary}<br/>
                  ${emp.start}  to  ${emp.end}<br/><br/>`;
              }).join("")}
             
             
           `;
      })
      .join("");

      console.log("pdf");
      
  } catch (error) {}
};
