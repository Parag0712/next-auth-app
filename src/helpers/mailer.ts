import nodemailer from "nodemailer";
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // make hash value based on user id 
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // Now we check request for reset password or verify email and store  data in database
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + (15 * 60 * 1000)
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + (15 * 60 * 1000)
            })
        }


        //now we implement nodemailer transport function 
        let transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
            
        });

        const mailOption = {
            from: process.env.SMTP_USER,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOption);
        return mailResponse;

    } catch (error: any) {
        console.log(error);
        throw Error(error.message)
    }
}