import { createHash } from 'crypto';

export function otpUtil(value:string): string{
    const hash = createHash("sha256").update(value).digest("hex");
    const number = BigInt("0x" + hash);

    return (number % 1000000n).toString().padStart(6, "0"); 
}