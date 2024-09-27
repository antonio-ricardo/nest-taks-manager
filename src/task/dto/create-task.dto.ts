import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z
    .string({ required_error: 'O titulo da tarefa é obrigatório' })
    .min(1, 'O titulo da tarefa não pode ser vazio'),
  description: z
    .string({
      invalid_type_error: 'A descrição da tarefa tem que ser uma string',
    })
    .nullable()
    .optional(),
  status: z
    .enum(['PENDING', 'IN_PROGRESS', 'COMPLETED'], {
      invalid_type_error:
        'O status da tarefa tem que ser pendente, em progresso ou concluído',
    })
    .optional(),
  dueDate: z.coerce.date({
    required_error: 'O prazo da tarefa é obrigatório',
    invalid_type_error: 'O prazo da tarefa precisa ser uma data',
  }),
  userId: z.string().nullable().optional(),
  organizationId: z.string({
    required_error: 'A empresa da tarefa é obrigatória',
  }),
});

export type createTaskSchemaType = z.infer<typeof createTaskSchema>;
