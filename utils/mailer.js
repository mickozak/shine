// utils/mailer.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Utwórz transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  // 2. Zdefiniuj opcje e-maila
  const mailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // 3. Wyślij e-mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
