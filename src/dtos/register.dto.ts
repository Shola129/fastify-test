import {z} from 'zod';
import { MESSAGE } from "../constants/message.constant.js";
const registerDto = z.object({
    email:z.email(MESSAGE.EMAILERROR),
    fullname:z.string().min(5, MESSAGE.FNAME),
    password:z.string().min(6, MESSAGE.PASSWORDERRORLENGTH)
    .max(100, 'must not exceed 100 characters')
    .regex(/[A-Z]/, 'must contain uppercase')
    .regex(/[a-z]/, 'must contain lowwercase')
    .regex(/[0-9]/, 'must contain muber')
    .regex(/[!@#$%^&*()_+=|?><~`.,;:{}]/, 'must be have specail character'),
    phone:z.string().min(11, 'must be a minimum of 11').max(20, 'must not  exceed 20'),
    device: z.object({
        deciveID:z.string(),
        latitude:z.number().min(-90).max(90),
        locationName:z.string(),
        deviceName: z.string(),
    }),
    timeZone: z.string().min(1),
    otp:z.string().nullable().optional(),
    refarralCode: z.string().nullable().optional()
});

export type RegisterDto = z.infer<typeof registerDto>;