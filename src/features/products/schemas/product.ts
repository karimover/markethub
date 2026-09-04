import * as z from 'zod';

export const productSchema = z.object({
  image: z.any().optional(),
  name: z.string().min(2, 'Product name must be at least 2 characters.'),
  category: z.string().min(1, 'Please select a category'),
  price: z.number({ message: 'Price is required' }).nonnegative(),
  description: z.string().min(10, 'Description must be at least 10 characters.')
});

export type ProductFormValues = {
  image: File[] | undefined;
  name: string;
  category: string;
  price: number | undefined;
  description: string;
};
