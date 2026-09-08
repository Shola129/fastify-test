import { RegisterDto } from "../../../dtos/register.dto";
import { HTTPRESPONSE } from "../../../constants/http.constant";
import { ResponseCreated } from "../../../constants/reply.constant";
import { FastifyInstance, FastifyReply } from "fastify";
import { ValidateEmailDto } from "../../../dtos/validate.dto";

const response = new ResponseCreated();
export class RegisterServices{
    async validateEmailService(data: ValidateEmailDto, reply:FastifyReply) {
        try {
            return reply 
                .code(HTTPRESPONSE.OK)
                .send(response.ok({
                    email:"smaon@gmail.com",
                    action:"validate"
                }))
        } catch (error) {
            console.log(error);
        }
    }
}