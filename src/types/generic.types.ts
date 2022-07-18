import * as z from 'zod';
import { GenericValidation } from '../validations';

export namespace GenericTypes {
  export type idTypes = z.infer<typeof GenericValidation.idValidation>
  export type getType = z.infer<typeof GenericValidation.getValidation>
}