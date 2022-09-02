import { z } from "zod";

export namespace ItemsValidation {
  export const get = z.object({
    id: z.number()
    .nonnegative({message: 'NON_NEGATIVE'})
      .optional(),
    char: z.number()
    .nonnegative({message: 'NON_NEGATIVE'})
      .optional(),
  }).strict();

  export const add = z.object({
    id: z.number()
    .nonnegative({message: 'NON_NEGATIVE'}),
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
    id: z.number()
    .nonnegative({message: 'NON_NEGATIVE'}),
    char: z.number()
    .nonnegative({message: 'NON_NEGATIVE'}),
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
    id: z.number()
    .nonnegative({message: 'NON_NEGATIVE'}),
    char: z.number()
    .nonnegative({message: 'NON_NEGATIVE'}),
  }).strict();
}