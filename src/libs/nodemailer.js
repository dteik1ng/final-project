import nodemailer from "nodemailer";


export const enviarEmail = (
  text,
  email,
  subject = "I. E. Centenario de Pereira") => {
  return new Promise(async (resolve, reject) => {
    try {
      const configNodemailer = {
        host: "smtp.gmail.com",
        port: 587,
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: "scv5267@gmail.com",
          pass: "dely ksmu zkhz pogf",
        },
      };

      const transportData = nodemailer.createTransport(configNodemailer);

      const message = {
        from: "scv5267@gmail.com",
        to: email,
        subject,
        text,
      };

      const infoRespose = await transportData.sendMail(message);

      resolve(infoRespose);
    } catch (error) {
      reject(error);
    }
  });
};