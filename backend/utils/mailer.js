import nodemailer from "nodemailer";

const sendEmail = async (options) => {
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: process.env.SMTP_SECURE === 'true',
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    } 
})

  const mailOptions = {
    from: `Notes App <${process.env.SMTP_MAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
