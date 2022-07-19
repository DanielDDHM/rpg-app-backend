import { z } from "zod";
import { CharacterValidation, GenericValidation } from "../validations";

export namespace CharacterType {
  export type create = z.infer<typeof CharacterValidation.create>
  export type update = z.infer<typeof CharacterValidation.update>
  export type destroy = z.infer<typeof GenericValidation.id>
}

export namespace AboutType { }

export namespace AtributeType { }

export namespace itemsType { }

export namespace skillsType { }

export namespace statusType { }