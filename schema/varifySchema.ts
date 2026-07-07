import {z} from 'zod';
export const varifySchema = z.object({
    varifyCode: z.string().length(6, { message: "Verification code must be exactly 6 characters long" }),
});