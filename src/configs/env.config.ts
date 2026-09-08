import dotenv from 'dotenv';
import { devConfig } from "./development.env.config";
import { stagingConfig } from "./staging.env.config";
import { prodConfig } from './production.env.config';

dotenv.config();

export function ansofraConfig() {
    if(process.env.APP_ENVIRONMENT?.toLowerCase()==="production"){
        return prodConfig;
    }
    
    else if(process.env.APP_ENVIRONMENT?.toLowerCase() === "staging"){
        return stagingConfig
        ;
    }

    else{
        return devConfig;
    }
}