import { z } from 'zod';

export namespace SkillsValidation {
  export const get = z
    .object({
      id: z.number().nonnegative({ message: 'NON_NEGATIVE' }).optional(),
      char: z.number().nonnegative({ message: 'NON_NEGATIVE' }).optional(),
    })
    .strict();

  export const add = z
    .object({
      char: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
      name: z.string().min(2, { message: 'NON_EMPTY' }),
      castingtime: z.string().min(2, { message: 'NON_EMPTY' }),
      range: z.number().nonnegative(),
      component: z.object({}),
      duration: z.string().min(2, { message: 'NON_EMPTY' }),
      description: z.string().min(2, { message: 'NON_EMPTY' }),
      damage: z.string().min(2, { message: 'NON_EMPTY' }),
    })
    .strict();

  export const edit = z
    .object({
      id: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
      char: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
      name: z.string().min(2, { message: 'NON_EMPTY' }),
      castingtime: z.string().min(2, { message: 'NON_EMPTY' }),
      range: z.number().nonnegative(),
      component: z.object({}),
      duration: z.string().min(2, { message: 'NON_EMPTY' }),
      description: z.string().min(2, { message: 'NON_EMPTY' }),
      damage: z.string().min(2, { message: 'NON_EMPTY' }),
    })
    .strict();

  export const remove = z
    .object({
      id: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
      char: z.number().nonnegative({ message: 'NON_NEGATIVE' }),
    })
    .strict();
}
