import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }:any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    const emailVerificationHtml = `<p>Hello,</p>
<p>Thank you for registering with us. Please click the link below to verify your email address:</p>
<p style="margin-top:15px; margin-bottom:10px">
  <a href="https://next-app-navy-seven.vercel.app/verifyemail?token=${hashedToken}" style="color: #fff; background-color: #007BFF; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
    Verify Your Email
  </a>
</p>
<p>If the button above does not work, copy and paste the following link into your browser:</p>
<p>https://next-app-navy-seven.vercel.app/verifyemail?token=${hashedToken}</p>
<p>Thank you,<br/>The Team</p>
`;
    const forgotPasswordHtml = `<p>Hello,</p>
<p>We received a request to reset your password. Please click the link below to reset your password:</p>
<p style="margin-top:15px; margin-bottom:10px">
  <a href="https://next-app-navy-seven.vercel.app/resetpassword?token=${hashedToken}" style="color: #fff; background-color: #007BFF; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
    Reset Your Password
  </a>
</p>
<p>If the button above does not work, copy and paste the following link into your browser:</p>
<p>https://next-app-navy-seven.vercel.app/resetpassword?token=${hashedToken}</p>
<p>If you did not request a password reset, please ignore this email.</p>
<p>Thank you,<br/>The Team</p>

`;
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail.com",
      auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_MAIL,
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: emailType === "VERIFY" ? emailVerificationHtml : forgotPasswordHtml, // html body
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
