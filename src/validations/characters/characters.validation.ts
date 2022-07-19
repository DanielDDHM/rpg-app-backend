import { z } from "zod";

export namespace CharacterValidation {
  export const get = z.object({
    user: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional(),
  }).strict();

  export const create = z.object({
    name: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .max(10, { message: 'MAX_LENGTH_10' }),
  }).strict();

  export const update = z.object({
    name: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .max(10, { message: 'MAX_LENGTH_10' }),
  }).strict();
}