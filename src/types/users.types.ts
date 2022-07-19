import * as z from 'zod';
import { CampaignValidation, GenericValidation, UsersValidation } from '../validations';

export namespace UserTypes {
  export type get = z.infer<typeof UsersValidation.get>;
  export type create = z.infer<typeof UsersValidation.create>;
  export type update = z.infer<typeof UsersValidation.update>;
  export type destroy = z.infer<typeof UsersValidation.destroy>;
  export type active = z.infer<typeof GenericValidation.id>;
}

export namespace CampaignTypes {
  export type create = z.infer<typeof CampaignValidation.create>
  export type update = z.infer<typeof CampaignValidation.update>
  export type destroy = z.infer<typeof GenericValidation.id>
}