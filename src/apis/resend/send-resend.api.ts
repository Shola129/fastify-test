import { from } from "node:stream/iter";
import { ansofraConfig } from "../../configs/env.config";
const config = ansofraConfig()();

export async function sendEmail(to:string, subject:string, text:string, html?:string){
    try {
        const response = await fetch(`${config.RESEND_URL}`, {
            method:"POST",
            headers:{Authorization:`Bearer ${config.RESEND_API_KEY}`},
            body:JSON.stringify({
                from:config.RESEND_FROM_EMAIL,
                to: [to],
                subject,
                text,
                html
            })
        });

        if(!response.ok){
            throw new Error("Error sending email");
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log("Resend error: ", error);
        return error;    
    }
} 