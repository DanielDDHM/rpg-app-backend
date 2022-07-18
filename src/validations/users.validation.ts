import { z } from "zod";

export namespace UsersValidation {
  export const userGetValidation = z.object({
    email: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional(),
  }).strict();

  export const userCreateValidation = z.object({
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

  export const userUpdateValidation = z.object({
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

  export const userDeleteValidation = z.object({
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