import dotenv from "dotenv";
dotenv.config();

export function stagingConfig(): Record<string, string>{
    const allEnv = process.env;
    const onlyStaging: Record<string, string> = {};

    for(const key in allEnv){
        if(key.endsWith("_STAGING")){
            const newKey = key.replace(/_STAGING$/, '');
            const newValue = allEnv[key];

            if(newValue===undefined){
                throw new Error (`Missing environment variable : ${key}`);
            }
            onlyStaging[key]=newValue;
        }
    }
    return onlyStaging;
}