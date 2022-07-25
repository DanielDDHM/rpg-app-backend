import {
  Messages,
  StatusCode
} from "../../constants"
import { Exception } from "../../helpers"
import { ItemsType } from "../../types"
import { ItemsValidation } from "../../validations"
import { prisma } from "../../config"
import { Character } from "@prisma/client"
import { v4 as uuid } from "uuid"
export namespace ItemsService {
  export const get = async (
    params: ItemsType.get): Promise<Character["items"]> => {
    try {
      const { id, char } = ItemsValidation.get.parse(params)

      const charFind = await prisma.character.findFirst({
        where: {
          id: char
        }
      })

      const items = id ? [charFind?.items.find(item => item?.id! === id)!] : charFind?.items!

      return items

    } catch (error: any) {
      console.log(error)
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const add = async (
    params: ItemsType.add): Promise<Character["items"]> => {
    try {

      const { char, damage, name, properties, value, weight } = ItemsValidation.add.parse(params)

      const item = {
        id: uuid(),
        damage,
        name,
        properties,
        value,
        weight
      }

      const charUpdated = await prisma.character.update({
        where: {
          id: char
        },
        data: {
          items: { push: item }
        }
      })

      return charUpdated.items
    } catch (error: any) {
      console.log(error)
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const edit = async (
    params: ItemsType.edit): Promise<Character["items"]> => {
    try {
      const { id, char, damage, name, properties, value, weight } = ItemsValidation.edit.parse(params)

      const item = {
        id,
        damage,
        name,
        properties,
        value,
        weight
      }

      const charFind = await prisma.character.findFirst({
        where: { id: char }
      })

      charFind!.items[charFind!.items.findIndex(item => item?.id! === id)] = item

      const charUpdated = await prisma.character.update({
        where: {
          id: char,
        },
        data: { items: charFind?.items }
      })

      return charUpdated.items

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const remove = async (
    params: ItemsType.remove
  ): Promise<Character["items"]> => {
    try {
      const { id, char } = ItemsValidation.remove.parse(params)

      const charFind = await prisma.character.findFirst({
        where: { id: char }
      })

      charFind!.items.splice(charFind!.items.findIndex(item => item?.id! === id), 1)

      const charUpdated = await prisma.character.update({
        where: {
          id: char,
        },
        data: { items: charFind?.items }
      })

      return charUpdated.items
    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
}