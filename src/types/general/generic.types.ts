import * as z from 'zod';
import { GenericValidation } from '../../validations';

export namespace GenericTypes {
  export type id = z.infer<typeof GenericValidation.id>
  export type get = z.infer<typeof GenericValidation.get>
}