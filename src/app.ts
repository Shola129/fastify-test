import Fastify from  'fastify';
import type {FastifyInstance} from 'fastify';
import fastifyjwt from '@fastify/jwt';
import fastifycors from '@fastify/cors';
import fastifyRawBody  from 'fastify-raw-body';
import fastifyMulitpart from '@fastify/multipart';
import { ansofraConfig } from './configs/env.config.js';
import fastifyRateLimit from '@fastify/rate-limit'
import fastifyStatic from '@fastify/static';

export async function ansofraApp(): Promise<FastifyInstance> {
    const app = Fastify( { logger: true } );
    
    const corsSet = ansofraConfig()().ALLOWED_CORS;

    const allowedCors = corsSet ? corsSet.split(",").map( (domain:any) => domain.trim()) : ["*"];
    await app.register(fastifycors, {
        origin:allowedCors.includes("*")?true:allowedCors,
        credentials:true,
        methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
        allowedHeaders:["Content-Type", "Authorization", "X-Requested-With", "Accept", "X-Signature-v2"]
    });

    await app.register(fastifyRateLimit, {
       global:false
    });

    app.register(fastifyjwt, {
        secret: ansofraConfig()().JWT_SECRET_KEY!
    });

    await app.register(fastifyRawBody, {
        field:'rawBody',
        global:false,
        runfirst:true,
        encoding:false
    });

    await app.register(fastifyMulitpart, {
        limits:{
            filesSize: 5 * 1024 * 1024,
            files: 1
        }
    });

    await app.register(fastifyStatic, {
        root: join(process.cwd(), 'public', 'upload'),
        prefix: 'uploads/'
    });


    // any other routes to register will contunies here 

    return app;
}