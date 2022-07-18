import { z } from "zod";

export namespace GenericValidation {
  export const idValidation = z.object({
    id: z.string()
      .min(2, { message: 'MIN_LENGHT_3' }),
  }).strict();

  export const getValidation = z.object({
    id: z.string()
      .min(2, { message: 'MIN_LENGHT_3' }),
    page: z.number()
      .nonnegative()
      .optional(),
    perPage: z.number()
      .nonnegative()
      .optional()
  }).strict();
}