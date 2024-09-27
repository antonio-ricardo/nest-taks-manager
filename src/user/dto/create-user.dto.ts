import { z } from 'zod';

export const createUserSchema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório' })
    .min(1, 'O nome não pode ser vazio'),
  password: z
    .string({ required_error: 'A senha é obrigatória' })
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  organizationId: z.string({
    required_error: 'O ID da empresa do usuário é obrigatório',
  }),
  role: z.enum(['USER', 'ORGANIZATION_ADMIN', 'ADMIN']),
});

export type createUserSchemaType = z.infer<typeof createUserSchema>;
