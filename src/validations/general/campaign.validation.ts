import { z } from "zod";

export namespace CampaignValidation {
  export const get = z.object({
    id: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .optional(),
    user: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
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
    usersId: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
  }).strict();

  export const update = z.object({
    id: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .optional(),
    name: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .max(10, { message: 'MAX_LENGTH_10' }),
  }).strict();
}