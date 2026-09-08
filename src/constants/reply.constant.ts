import { unknown } from "zod"

type ApiResponse <T = unknown > = {
    status: "success" | "failed",
    response: string,
    data? : T,
}

export class ResponseCreated {
    private container<T>(status: "success" | "failed", response: string, data?: T) : ApiResponse<T>{
        if(data===undefined){
            return {
                status,
                response
                //Or still the same
                // status:status,
                // response:response
            }
        }

        return {
            status,
            response,
            data
            //Or still the same
            // status:status,
            // response:response
            // data?:data
        }
    }

    ok<T = unknown>(data?:T, message="Action was successful"){
        return this.container("success", message, data);
    }

    created<T = unknown>(data?: T, message="Created successfully"){
        return this.container("success", message, data);
    }

    unauthrized<T = unknown>(data?:T, message="Access denied"){
        return this.container("failed", message, data);
    }

    badRequest<T = unknown>(data?:T, message="Bad request"){
        return this.container("failed", message, data);
    }

    forbidden<T = unknown>(data?:T, message="access forbidden"){
        return this.container("failed", message, data);
    }

    conflict<T = unknown>(data?: T, message="resources already exist"){
        return this.container("failed", message, data);
    }

    internalServerError<T = unknown>(data?: T, message="iternal server error"){
        return this.container("failed", message, data);
    }

    notImplemented<T = unknown>(data?: T, message="This features not available yet"){
        return this.container("failed", message, data);
    }
}