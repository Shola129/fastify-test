import { z } from "zod";
import {MESSAGE} from "../constants/message.constant";

export const validateEmailDto = z.object({
    email:z.email(MESSAGE.EMAILERROR),
});

export type ValidateEmailDto  = z.infer<typeof validateEmailDto>