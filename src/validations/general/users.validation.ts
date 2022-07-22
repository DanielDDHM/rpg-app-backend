import { z } from "zod";

export namespace UsersValidation {
  export const get = z.object({
    id: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .optional(),
    email: z.string()
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
    nick: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .max(10, { message: 'MAX_LENGTH_10' }),
    name: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .max(10, { message: 'MAX_LENGTH_10' }),
    email: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    password: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .max(10, { message: 'MAX_LENGTH_8' }),
    phone: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .max(13, { message: 'MAX_LENGTH_13' }),
  }).strict();

  export const update = z.object({
    id: z.string()
      .min(2, { message: 'MIN_LENGHT_3' }),
    name: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .max(10, { message: 'MAX_LENGTH_10' }),
    email: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    password: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .max(10, { message: 'MAX_LENGTH_8' }),
    phone: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .max(13, { message: 'MAX_LENGTH_13' }),
  }).strict();

  export const activate = z.object({
    id: z.string()
      .min(2, { message: 'MIN_LENGHT_3' }),
  }).strict();

  export const destroy = z.object({
    id: z.string()
      .min(2, { message: 'MIN_LENGHT_3' }),
    email: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional(),
    password: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .max(10, { message: 'MAX_LENGTH_8' })
      .optional(),
  }).strict();

}
