import * as z from 'zod';
import { GenericValidation, UsersValidation } from '../validations';
import { GenericTypes } from './generic.types';

export namespace UserTypes {
  export type getUser = z.infer<typeof UsersValidation.userGetValidation> & GenericTypes.getType;
  export type createUser = z.infer<typeof UsersValidation.userCreateValidation>;
  export type updateUser = z.infer<typeof UsersValidation.userUpdateValidation>;
  export type deleteUser = z.infer<typeof UsersValidation.userDeleteValidation>;
  export type activeUser = z.infer<typeof GenericValidation.idValidation>;
}