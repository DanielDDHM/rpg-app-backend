import * as z from 'zod';
import {
  UsersValidation
} from '../../validations';

export namespace UserTypes {
  export type get = z.infer<typeof UsersValidation.get>;
  export type create = z.infer<typeof UsersValidation.create>;
  export type update = z.infer<typeof UsersValidation.update>;
  export type destroy = z.infer<typeof UsersValidation.destroy>;
  export type active = z.infer<typeof UsersValidation.activate>;
}

export namespace UserReqType {
  export type update = Omit<UserTypes.update, 'id'>;
  export type destroy = Omit<UserTypes.destroy, 'id'>;
}
