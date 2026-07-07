import { z } from 'zod';
export const UsernameSchema = z.string().trim().min(3, { message: "Username must be at least 3 characters long" }).max(30, { message: "Username must be at most 30 characters long" });
export const signupSchema = z.object({
    username: UsernameSchema,
    email: z.string().email({ message: "Invalid email address" }).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email must be a valid format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(100, { message: "Password must be at most 100 characters long" }),
});