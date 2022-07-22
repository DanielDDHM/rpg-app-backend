import { z } from "zod";

export namespace GenericValidation {
  export const id = z.object({
    id: z.string()
      .min(2, { message: 'MIN_LENGHT_3' }),
  }).strict();

  export const get = z.object({
    id: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .optional(),
    page: z.number()
      .nonnegative()
      .optional(),
    perPage: z.number()
      .nonnegative()
      .optional()
  }).strict();
}