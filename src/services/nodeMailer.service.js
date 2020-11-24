require("dotenv").config();
import nodemailer from "nodemailer";

async function createEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_NODE_MAILER,
    port: 587,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD_EMAIL
    }
  });

  let info = await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: "bar@example.com",
    subject: "Cambio de contraseña",
    text: "Prueba para el cambio de contraseña",
    html: `Token asociado para el cambio de contraseña:

    El mismo tendrá una duración de 10 minutos, pasado este tiempo será inválido `,
  });
x  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export {
    createEmail
}