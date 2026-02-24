import nodemailer from "nodemailer";
import { GMAIL_USER ,GMAIL_PASSWORD} from './../../../../config/config.service.js';

export const sendEmail = async ({ name, email, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:GMAIL_USER, // إيميلك
        pass:GMAIL_PASSWORD, // باسورد التطبيقات
      },
    });

    // 2. شكل الإيميل اللي هيوصلك
    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`, // بيظهر كأنه مبعوت من سيرفرك باسم الزائر
      to: process.env.GMAIL_USER, // الإيميل اللي هيستقبل (إيميلك)
      subject: `رسالة جديدة من البورتفوليو 🚀 - ${name}`,
      replyTo: email, // عشان لما تدوس Reply في الجيميل، يرد على إيميل الزائر مباشرة
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

    // 3. إرسال الإيميل
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    // مش هنعمل throw error هنا عشان لو الإيميل فشل لأي سبب، الرسالة تتسجل عادي في الداتا بيز للزائر
  }
};