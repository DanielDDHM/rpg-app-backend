import { z } from "zod";

export namespace CharacterValidation {
  export const get = z.object({
    id: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .optional(),
    user: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional(),
    page: z.number()
      .nonnegative()
      .optional(),
    perPage: z.number()
      .nonnegative()
      .optional()
  }).strict();

  export const create = z.object({
    name: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .max(10, { message: 'MAX_LENGTH_10' }),
    campaign: z.string()
      .min(2, { message: 'MIN_LENGHT_3' }),
    owner: z.string()
      .min(2, { message: 'MIN_LENGHT_3' }),
    about: z.object({})
      .optional(),
    slots: z.object({})
      .optional(),
    atributes: z.object({})
      .optional(),
    status: z.object({})
      .optional(),
  }).strict();

  export const update = z.object({
    id: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .optional(),
    name: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .max(10, { message: 'MAX_LENGTH_10' }),
    campaign: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .max(10, { message: 'MAX_LENGTH_10' }),
    owner: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .max(10, { message: 'MAX_LENGTH_10' }),
    about: z.object({})
      .optional(),
    slots: z.object({})
      .optional(),
    atributes: z.object({})
      .optional(),
    status: z.object({})
      .optional(),
  }).strict();
}
