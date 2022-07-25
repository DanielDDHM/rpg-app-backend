import { Character } from "@prisma/client"
import { prisma } from "../../config"
import { Messages, StatusCode } from "../../constants"
import { Exception } from "../../helpers"
import { SkillsType } from "../../types"
import { SkillsValidation } from "../../validations"
import { v4 as uuid } from "uuid"

export namespace SkillsService {
  export const get = async (
    params: SkillsType.get): Promise<Character["magics"]> => {
    try {
      const { id, char } = SkillsValidation.get.parse(params)

      const charFind = await prisma.character.findFirst({
        where: {
          id: char
        }
      })

      const skill = id ? [charFind?.magics.find(magic => magic?.id! === id)!] : charFind?.magics!

      return skill
    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const add = async (
    params: SkillsType.add): Promise<Character["magics"]> => {
    try {
      const { char,
        damage,
        name,
        castingtime,
        component,
        description,
        duration,
        range } = SkillsValidation.add.parse(params)

      const skill = {
        id: uuid(),
        damage,
        name,
        castingtime,
        component,
        description,
        duration,
        range
      }

      const charUpdated = await prisma.character.update({
        where: {
          id: char
        },
        data: {
          magics: { push: skill }
        }
      })

      return charUpdated.magics
    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const edit = async (
    params: SkillsType.edit): Promise<Character["magics"]> => {
    try {
      const {
        id,
        char,
        damage,
        name,
        castingtime,
        component,
        description,
        duration,
        range } = SkillsValidation.edit.parse(params)

      const skill = {
        damage,
        name,
        castingtime,
        component,
        description,
        duration,
        range
      }

      const charFind = await prisma.character.findFirst({
        where: { id: char }
      })

      charFind!.magics[charFind!.magics.findIndex(skill => skill?.id! === id)] = skill

      const charUpdated = await prisma.character.update({
        where: {
          id: char,
        },
        data: { magics: charFind?.magics }
      })

      return charUpdated.magics

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const remove = async (params: SkillsType.remove) => {
    try {
      const { id, char } = SkillsValidation.remove.parse(params)

      const charFind = await prisma.character.findFirst({
        where: { id: char }
      })

      charFind!.magics.splice(charFind!.magics.findIndex(skills => skills?.id! === id), 1)

      const charUpdated = await prisma.character.update({
        where: {
          id: char,
        },
        data: { magics: charFind?.magics }
      })

      return charUpdated.magics
    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
}