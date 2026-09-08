import Fastify from 'fastify';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { HTTPRESPONSE } from '../constants/http.constant';
import { ResponseCreated } from '../constants/reply.constant';

const response = new ResponseCreated();

 export async function ansofraSanitize(req:FastifyRequest, res:FastifyReply){
    const body = req.body;

    if(body && typeof body==="object" && !Array.isArray(body)){
        for(const key in body as Record<string, unknown>){
            if(key.startsWith("$") || key.includes(".")){
                return res
                .code(HTTPRESPONSE.BADREQUEST)
                .send(response.badRequest());
            }

            const value = (body as Record<string, unknown>)[key];
            if(typeof value === "string"){
                (body as Record<string, unknown>)[key] = value.trim();
            }
        }
    }
}