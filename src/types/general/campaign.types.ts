import { z } from "zod"
import {
  CampaignValidation,
  GenericValidation
} from "../../validations"

export namespace CampaignTypes {
  export type get = z.infer<typeof CampaignValidation.get>
  export type create = z.infer<typeof CampaignValidation.create>
  export type update = z.infer<typeof CampaignValidation.update>
  export type destroy = z.infer<typeof GenericValidation.id>
}


export namespace CampaignReqType {
  export type update = Omit<CampaignTypes.update, 'id'>
}