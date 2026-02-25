import nodemailer from "nodemailer";
import { GMAIL_USER ,GMAIL_PASSWORD} from './../../../../config/config.service.js';

export const sendEmail = async ({ name, email, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:GMAIL_USER, 
        pass:GMAIL_PASSWORD, 
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`, 
      to: process.env.GMAIL_USER, 
      subject: `رسالة جديدة من البورتفوليو 🚀 - ${name}`,
      replyTo: email, 
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333;">لديك رسالة جديدة من البورتفوليو الخاص بك! 🌟</h2>
          <p><strong>اسم المرسل:</strong> ${name}</p>
          <p><strong>البريد الإلكتروني:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr>
          <h3 style="color: #555;">محتوى الرسالة:</h3>
          <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; font-size: 16px;">
            ${message}
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};