import { z } from "zod";
import {
  CharacterValidation,
  GenericValidation,
} from "../../validations";

export namespace CharacterType {
  export type get = z.infer<typeof CharacterValidation.get>
  export type create = z.infer<typeof CharacterValidation.create>
  export type update = z.infer<typeof CharacterValidation.update>
  export type destroy = z.infer<typeof GenericValidation.id>
}

export namespace CharacterReqType {
  export type get = Omit<CharacterType.get, 'id'>
  export type update = Omit<CharacterType.update, 'id'>
}
