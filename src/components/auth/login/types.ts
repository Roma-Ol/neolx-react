import { z } from 'zod';

export interface ILoginFields {
  email: string;
  password: string;
}

export const LoginUserSchema = z.object({
  email: z.string().email({ message: 'Email must be a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(18, { message: 'Password must be at most 18 characters long' }),
});
