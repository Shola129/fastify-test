import Fastify from "fastify";
import { FastifyInstance } from "fastify";
import { ansofraConfig } from "../configs/env.config.js";
import type { RegisterDto } from "../dtos/register.dto.js";
import { ansofraSanitize } from "../middlewares/cleanreg.middleware.js";
import { ansofraRateLimit } from "../middlewares/ratelimit.middleware.js";
import type { ValidateEmailDto } from "../dtos/validate.dto.js";
import { RegisterController } from "../controllers/register.controller.js";
export async function registerRoute(app:FastifyInstance){
    const prefixUrl = ansofraConfig()().APP_VERSION;
    const regController = new RegisterController();
    //what post takes
// app.post(endpoint, object of middleware, async()=>{})
// app.post<(Body:DTO)>{endpoint, object of middleware, aysnc(req, res)=>{
// }}
    app.post<{Body:ValidateEmailDto}>(
        prefixUrl+'/validate/email', 
        {
          ...ansofraRateLimit(2, '1 minute'),
          preHandler: [ansofraSanitize]  
        },
        async (req, res)=>{
            return await regController.validateEmailController(req.body, res);
        }
    )

    app.post<{Body:RegisterDto}>(
        prefixUrl+'/register',
        {
            ...ansofraRateLimit(5, '1 minute'),
            preHandler: [ansofraSanitize]
        },
        
        async (req, res)=>{
            //call controller here...

        }
    )
}