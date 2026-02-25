import nodemailer from "nodemailer";
import { GMAIL_USER, GMAIL_PASSWORD } from './../../../../config/config.service.js';

export const sendEmail = async ({ name, email, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Portfolio Notification" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: `📩 New Message from ${name}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background-color: #0d1117; color: #ffffff; border-radius: 15px; overflow: hidden; border: 1px solid #30363d; }
            .header { background: linear-gradient(90deg, #00BFFF, #3b82f6); padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; color: #ffffff; text-transform: uppercase; letter-spacing: 2px; }
            .content { padding: 40px; }
            .info-box { background-color: #161b22; border: 1px solid #30363d; border-radius: 10px; padding: 20px; margin-bottom: 25px; }
            .label { color: #00BFFF; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 5px; }
            .value { color: #e6edf3; font-size: 16px; margin-bottom: 15px; }
            .message-box { background-color: #0d1117; border-left: 4px solid #00BFFF; padding: 20px; color: #9ca3af; line-height: 1.6; font-style: italic; }
            .footer { background-color: #161b22; padding: 20px; text-align: center; font-size: 12px; color: #6e7681; border-top: 1px solid #30363d; }
            a { color: #00BFFF; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Message Received</h1>
            </div>
            <div class="content">
              <div class="info-box">
                <div class="label">Sender Name</div>
                <div class="value">${name}</div>
                
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="label">Message Content</div>
              <div class="message-box">
                "${message}"
              </div>
            </div>
            <div class="footer">
              This email was sent from your <strong>Portfolio Dashboard</strong>.<br>
              © 2026 Ahmed Mokhtar Portfolio
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("🔴 Error sending email: ", error);
  }
};