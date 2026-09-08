export function ansofraRateLimit(max:number, timeWindow:string | string){
    return{
        config:{
            rateLimit:{
                max, 
                timeWindow
                // or
                // max:max,
                // timeWindow:timeWindow
            },
        },
    };
}