import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string({ required_error: 'O nome do usuário é obrigatório' })
    .min(1, 'O nome do usuário não pode ser vazio'),
  password: z
    .string({ required_error: 'A senha do usuário é obrigatória' })
    .min(1, 'A senha do usuário não pode ser vazia'),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
