import { EmailTemplate } from "@/emails/email-template";
import { ApiResponse } from "@/types/Apiresponce";
import * as nodemailer from 'nodemailer';
import { render } from "@react-email/render";//this is used to convert react component to html string
export async function sendVarificationEmail(
    email: string,
    username: string,
    varifyCode: string
): Promise<ApiResponse> {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GOOGLE_EMAIL_ADDRESS,
                pass: process.env.GOOGLE_APP_PASSWORD,
            },
        });
        const htmlContent = await render(EmailTemplate({ username, varifyCode }));
        const info = await transporter.sendMail({
            from: process.env.GOOGLE_EMAIL_ADDRESS,
            to: email,
            subject: "Verify your email",
            text: `Hello ${username}, your verification code is ${varifyCode}`,
            html: htmlContent,
        });
        console.log("The node mailer info is ", info);
        return {
            success: true,
            message: "Verification email sent successfully."
        }
    }
    catch (error) {
        console.error("Error sending verification email:", error);
        return {
            success: false,
            message: "Failed to send verification email."
        };
    }
}
