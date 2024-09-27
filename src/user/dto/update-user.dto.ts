import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(1, 'O nome não pode ser vazio').optional(),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .optional(),
  role: z.enum(['USER', 'ORGANIZATION_ADMIN', 'ADMIN']).optional(),
});

export type updateUserSchemaType = z.infer<typeof updateUserSchema>;
