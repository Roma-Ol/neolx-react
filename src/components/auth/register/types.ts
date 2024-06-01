import { z } from 'zod';

export interface IRegisterFields {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export const RegisterUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long' }),

  phone: z
    .string()
    .regex(/^(?:\+38)?0\d{9}$/, { message: 'Number must be a valid Ukrainian phone number' }),

  email: z.string().email({ message: 'Email must be a valid email address' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(18, { message: 'Password must be at most 18 characters long' }),
});

// Optionally, you can create a TypeScript type from the schema
export type UserSchemaType = z.infer<typeof RegisterUserSchema>;
