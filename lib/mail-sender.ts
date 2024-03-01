import nodemailer from "nodemailer";

export const sendMail = async (to: string, subject: string, message: string) => {
    let transport = nodemailer.createTransport({
      host: "email-smtp.eu-west-2.amazonaws.com",
      port: 465,
      auth: {
        user: "AKIAWQM6FNC5S2SZMN64", 
        pass: "BLz0ziNXpre1B2f6vp0bOz6RaBRHiGQROvkx3d0ELrQd",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: "noreply@waecgh.org",
      to: to,
      subject: subject,
      html: message,
    };


   let response = await  transport.sendMail(mailOptions);
   console.log(response);
   

 return
   
};
