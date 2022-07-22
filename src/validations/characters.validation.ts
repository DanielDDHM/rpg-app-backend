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
    about: z.object({
      class: z.string()
        .min(2, { message: 'NON_EMPTY' }),
      level: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      race: z.string()
        .min(2, { message: 'NON_EMPTY' }),
      tendency: z.string()
        .min(2, { message: 'NON_EMPTY' }),
      story: z.string()
        .min(2, { message: 'NON_EMPTY' }),
      initiative: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      distance: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
    })
      .optional(),
    slots: z.object({})
      .optional(),
    atributes: z.object({
      force: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      dexterity: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      constitution: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      intelligence: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      wisdom: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      charisma: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
    })
      .optional(),
    status: z.object({
      armor: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      proeficiency: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      life: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
    })
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
    about: z.object({
      class: z.string()
        .min(2, { message: 'NON_EMPTY' }),
      level: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      race: z.string()
        .min(2, { message: 'NON_EMPTY' }),
      tendency: z.string()
        .min(2, { message: 'NON_EMPTY' }),
      story: z.string()
        .min(2, { message: 'NON_EMPTY' }),
      initiative: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      distance: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
    })
      .optional(),
    slots: z.object({})
      .optional(),
    atributes: z.object({
      force: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      dexterity: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      constitution: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      intelligence: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      wisdom: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      charisma: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
    })
      .optional(),
    status: z.object({
      armor: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      proeficiency: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
      life: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' }),
    })
      .optional(),
  }).strict();
}

export namespace itemsvalidation {
  export const get = z.object({
    char: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional(),
    page: z.number()
      .nonnegative()
      .optional(),
    perPage: z.number()
      .nonnegative()
      .optional()
  }).strict();

  export const add = z.object({

  }).strict();
}

export namespace skillsvalidation {
  export const get = z.object({
    char: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional(),
    page: z.number()
      .nonnegative()
      .optional(),
    perPage: z.number()
      .nonnegative()
      .optional()
  }).strict();

  export const add = z.object({

  }).strict();
}