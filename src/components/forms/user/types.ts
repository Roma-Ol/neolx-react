import { IUserEditFields } from '../../users/type.ts';
import { z } from 'zod';

export interface IUserEditFormProps {
  values: IUserEditFields;
  entityId: string;
  handleSave: () => void;
}

export const UserEditSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long' })
    .optional(),
  phone: z
    .string()
    .regex(/^(?:\+38)?0\d{9}$/, { message: 'Number must be a valid Ukrainian phone number' })
    .optional(),
  email: z.string().email({ message: 'Email must be a valid email address' }).optional(),
  role: z
    .string({ required_error: 'Role is required', invalid_type_error: 'Role must be a string' })
    .optional(),
});
