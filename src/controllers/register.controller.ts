import Fastify from "fastify";
import { FastifyInstance, FastifyReply } from "fastify";
import { RegisterDto } from "../dtos/register.dto";
import { HTTPRESPONSE } from "../constants/http.constant";
import { ResponseCreated } from "../constants/reply.constant";
import { ValidateEmailDto } from "../dtos/validate.dto";
import { RegisterServices } from "../services/register/commands/register.service";

const response = new ResponseCreated();

export class RegisterController{
    private readonly regService = new RegisterServices();

    async validateEmailController(data: ValidateEmailDto, reply: FastifyReply) {
        return await this.regService.validateEmailService(data, reply);
    }
}
