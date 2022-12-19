import { z } from 'zod';

export namespace ItemsValidation {
  export const get = z
    .object({
      id: z.number().nonnegative({ message: 'NON_NEGATIVE' }).optional(),
      char: z.number().nonnegative({ message: 'NON_NEGATIVE' }).optional(),
    })
    .strict();

  export const add = z
    .object({
      charId: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
      name: z.string().min(2, { message: 'NON_EMPTY' }),
      properties: z.object({}).optional(),
      value: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
      damage: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
      weight: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
    })
    .strict();

  export const edit = z
    .object({
      id: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
      name: z.string().min(2, { message: 'NON_EMPTY' }),
      properties: z.object({}),
      value: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
      damage: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
      weight: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
    })
    .strict();

  export const remove = z
    .object({
      id: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
    })
    .strict();
}
