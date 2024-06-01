import { z } from 'zod';

export interface IListingCreateFormFields {
  title: string;
  description: string;
  price: number;
}

export interface IListingEditFormProps {
  values: IListingCreateFormFields;
  entityId: string;
  handleSave: () => void;
}

export interface IListingEntity {
  _id: string;
  title: string;
  description: string;
  price: number;
  author: string;
}

export const ListingCreateValidationSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(30, 'Title must be at most 30 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  price: z.preprocess(
    (val) => (val === '' ? undefined : parseFloat(val as string)),
    z.number({ required_error: 'Price is required' }).positive('Price must be greater than 0'),
  ),
});
