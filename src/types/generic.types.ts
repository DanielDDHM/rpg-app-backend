import * as z from 'zod';
import { GenericValidation } from '../validations';

export namespace GenericTypes {
  export type id = z.infer<typeof GenericValidation.id>
  export type get = z.infer<typeof GenericValidation.get>
  export type login = z.infer<typeof GenericValidation.login>
  export type verify = z.infer<typeof GenericValidation.verify>
}