import { z } from 'zod';

export const createOrUpdateOrganizationSchema = z.object({
  name: z
    .string({ required_error: 'O nome da organização é obrigatório' })
    .min(1, 'O nome da organização não pode ser vazio'),
});

export type createOrUpdateOrganizationSchemaType = z.infer<
  typeof createOrUpdateOrganizationSchema
>;
