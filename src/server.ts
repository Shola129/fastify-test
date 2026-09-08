import { ansofraApp } from "./app.js";
import { ansofraConfig } from "./configs/env.config.js";

const start = async (): Promise<void> => {
    try {
        const app = await ansofraApp();
        const config = ansofraConfig()();
        
        await app.listen({
            port: Number(config.APP_PORT!),
            host: config.APP_HOST!
        });

        app.log.info `Server Started on : ${config.APP_HOST}:${config.APP_PORT}`;

        const shutdown = async () => {
            app.log.info('shutting down');
            await app.close();
            process.exit(0);
        }
        
        process.on('SIGTERM', shutdown);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

start();