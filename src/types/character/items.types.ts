import { z } from "zod";
import { ItemsValidation } from "../../validations";

export namespace ItemsType {
  export type add = z.infer<typeof ItemsValidation.add>
  export type edit = z.infer<typeof ItemsValidation.edit>
  export type remove = z.infer<typeof ItemsValidation.remove>
}
export namespace ItemsReqType {
  export type edit = Omit<ItemsType.edit, 'id'>
}