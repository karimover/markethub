import * as z from 'zod';

export const userSchema = z.object({
  first_name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  last_name: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Укажите номер телефона'),
  role: z.string().min(1, 'Please select a segment'),
  status: z.string().min(1, 'Please select a status')
});

export type UserFormValues = z.infer<typeof userSchema>;
