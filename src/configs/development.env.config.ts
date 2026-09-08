import dotenv from "dotenv";
dotenv.config();

export function devConfig(): Record<string, string>{
    const allEnv = process.env;
    const onlyDev: Record<string, string> = {};
    for(const key in allEnv){
        if(key.endsWith("_DEV")){
            const newKey = key.replace(/DEV$/, "");
            const newValue = allEnv[key];

            if(newValue=== undefined){
                throw new Error(`Missing environment variable : ${key}`);
            }

            onlyDev[newKey] = newValue;
        }
    }

    return onlyDev;
}

