require("dotenv").config();
import nodemailer from "nodemailer";
import emailConstants from "../utils/emailConstants";

function createEmailConfiguration() {
  return {
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD_EMAIL
    }
  };
}

function createEmailBody(from, to, subject, html) {
  return {
    from: from,
    to: `${to}`,
    subject: subject,
    html: html
  };
}

async function serviceSendEmailToPasswordChange(email, token) {
  const transporter = nodemailer.createTransport( createEmailConfiguration() );
  let info = await transporter.sendMail( createEmailBody(process.env.USER_EMAIL, email, emailConstants.changePassword.es.subject, emailConstants.changePassword.es.html + ` ${token}`)  );
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export {
  serviceSendEmailToPasswordChange
}