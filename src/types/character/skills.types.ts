import { z } from "zod"
import { SkillsValidation } from "../../validations"

export namespace SkillsType {
  export type get = z.infer<typeof SkillsValidation.get>
  export type add = z.infer<typeof SkillsValidation.add>
  export type edit = z.infer<typeof SkillsValidation.edit>
  export type remove = z.infer<typeof SkillsValidation.remove>
}
export namespace SkillsReqType {
  export type add = Omit<SkillsType.add, 'char'>
  export type edit = Omit<SkillsType.edit, 'char'>
  export type remove = Omit<SkillsType.remove, 'char'>
}
