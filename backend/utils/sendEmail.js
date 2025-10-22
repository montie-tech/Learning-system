const nodemailer = require('nodemailer');

async function sendMail(to, subject, text, attachments = []) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const info = await transporter.sendMail({
    from: `"Nexus LMS" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    attachments
  });

  return info;
}

module.exports = sendMail;
