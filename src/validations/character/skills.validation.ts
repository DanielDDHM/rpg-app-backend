import { z } from "zod";

export namespace SkillsValidation {
  export const get = z.object({
    id: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional(),
    char: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional(),
    page: z.number()
      .nonnegative()
      .optional(),
    perPage: z.number()
      .nonnegative()
      .optional()
  }).strict();

  export const add = z.object({
    char: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    name: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    castingtime: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    range: z.number()
      .nonnegative(),
    component: z.object({}),
    duration: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    description: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    damage: z.string()
      .min(2, { message: 'NON_EMPTY' }),
  }).strict();

  export const edit = z.object({
    id: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    char: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    name: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    castingtime: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    range: z.number()
      .nonnegative(),
    component: z.object({}),
    duration: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    description: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    damage: z.string()
      .min(2, { message: 'NON_EMPTY' }),
  }).strict();

  export const remove = z.object({
    id: z.string()
      .min(2, { message: 'NON_EMPTY' }),
  }).strict();
}