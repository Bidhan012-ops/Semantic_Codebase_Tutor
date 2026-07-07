import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string({ message: "Email is required" }).email({ message: "Invalid email address" }).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email must be a valid format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(100, { message: "Password must be at most 100 characters long" }),
}); 