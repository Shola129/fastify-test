import { sendEmail } from "../apis/resend/send-resend.api";

export async function sendOtp(email:string, otp:string): Promise<string> {
    const subject = "Your verification code";
    try {
        const send = await sendEmail(email, "OTP verification", otp);
        if(send){
            return JSON.stringify({
                status:"success",
                response:"OTP was sent to email successfully"
            });
        }
    } catch (error) {
        console.log(error);
    }
     return sendOtp(email, otp);
}