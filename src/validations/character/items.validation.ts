import { z } from "zod";

export namespace ItemsValidation {
  export const get = z.object({
    id: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional(),
    char: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional()
  }).strict();

  export const add = z.object({
    char: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    name: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    properties: z.object({}),
    value: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    damage: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    weight: z.string()
      .min(2, { message: 'NON_EMPTY' }),
  }).strict();

  export const edit = z.object({
    id: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    char: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    name: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    properties: z.object({}),
    value: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    damage: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    weight: z.string()
      .min(2, { message: 'NON_EMPTY' }),
  }).strict();

  export const remove = z.object({
    id: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    char: z.string()
      .min(2, { message: 'NON_EMPTY' }),
  }).strict();
}