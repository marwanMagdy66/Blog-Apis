import nodemailer from "nodemailer";
export const sendEmail = async ({ to, subject, html }) => {
  //sender
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 587,
    secure: true,
    service: "Gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  //reciver
  const mail = await transporter.sendMail({
    from: `"Blog Application " <${process.env.USER}> `,
    to,
    subject,
    html,
  });
  if (mail.rejected.length > 0) return false;
  return true;
};
