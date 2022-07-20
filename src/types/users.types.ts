import * as z from 'zod';
import {
  CampaignValidation,
  GenericValidation,
  UsersValidation
} from '../validations';
import { GenericTypes } from './generic.types';

export namespace UserTypes {
  export type get = z.infer<typeof UsersValidation.get>;
  export type create = z.infer<typeof UsersValidation.create>;
  export type update = z.infer<typeof UsersValidation.update>;
  export type destroy = z.infer<typeof UsersValidation.destroy>;
  export type active = z.infer<typeof UsersValidation.activate>;
}

export namespace CampaignTypes {
  export type get = z.infer<typeof CampaignValidation.get>
  export type create = z.infer<typeof CampaignValidation.create>
  export type update = z.infer<typeof CampaignValidation.update>
  export type destroy = z.infer<typeof GenericValidation.id>
}

export namespace UserReqType {
  export type updateT = Omit<UserTypes.update, 'id'>;
  export type destroyT = Omit<UserTypes.destroy, 'id'>;
}

export namespace CampaignReqType {
  export type updateT = Omit<CampaignTypes.update, 'id'>
}