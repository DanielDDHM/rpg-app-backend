import { z } from "zod";

export namespace CampaignValidation {
  export const get = z.object({
    id: z.number()
    .nonnegative({message: 'NON_NEGATIVE'})
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
      .max(25, { message: 'MAX_LENGTH_25' }),
    ownerId: z.number()
    .nonnegative({message: 'NON_NEGATIVE'})
  }).strict();

  export const update = z.object({
    id: z.number()
    .nonnegative({message: 'NON_NEGATIVE'})
      .optional(),
    name: z.string()
      .min(2, { message: 'MIN_LENGHT_3' })
      .max(25, { message: 'MAX_LENGTH_25' }),
  }).strict();
}