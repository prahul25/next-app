import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    const emailVerificationHtml = `<p> Click <a href=${process.env.DOMAIN}/verifyemail?token=${hashedToken}>Here</a> to Verify you email or copy and paste the link below in your browser</br></p>`;
    const forgotPasswordHtml = `<p> Click <a href=${process.env.DOMAIN}/forgotpassword?token=${hashedToken}>Here</a> to Reset your password or copy and paste the link below in your browser</br></p>`;
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
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6ac60f0ac4dc45",
        pass: "676c066f1a7bdd",
      },
    });

    const mailOptions = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
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
