let nodemailer = require("nodemailer");

export const sendMail = async (to, subject, message) => {
  return new Promise((resolve, reject) => {
    let transport = nodemailer.createTransport({
      host: "smtp.qikli-mail.com",
      port: 2525,
      auth: {
        user: "vacancies@waecgh.org", //"administrator@waecgh.org",
        pass: "969477DE01B2B0A590C764B5B9D043E8B67F", //"765E3EC747D6F0D13AFE878A1CFE07D3FE16",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: "vacancies@waecgh.org",
      to: to,
      subject: subject,
      html: message,
    };

    let resp = false;

    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error is " + error);
        resolve(false); // or use rejcet(false) but then you will have to handle errors
      } else {
        resolve(true);
      }
    });
  });
};
