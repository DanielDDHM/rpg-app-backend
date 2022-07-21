import { character } from "@prisma/client"
import { Exception } from "../helpers"
import { prisma } from "../config"
import {
  Messages,
  StatusCode
} from "../constants"
import {
  CharacterType,
  GenericTypes
} from "../types"
import {
  CharacterValidation,
  GenericValidation
} from "../validations"

export namespace CharacterService {
  export const get = async (
    params: CharacterType.get): Promise<{ characters: character[], total: number }> => {
    try {
      const { id, user, page, perPage } = CharacterValidation.get.parse(params)

      const query = {
        OR: [
          { id },
          { userId: user }
        ]
      }

      const [char, total] = await prisma.$transaction([
        prisma.character.findMany({
          where: (id || user) ? query : {},
          skip: (Number(page) - 1) * Number(perPage) || 0,
          take: Number(perPage) || 10,
        }),
        prisma.character.count({ where: (id || user) ? query : {}, })
      ])

      return { characters: char, total: total }

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const create = async (
    params: CharacterType.create): Promise<character> => {
    try {
      const {
        campaign,
        name,
        owner,
        about,
        atributes,
        slots,
        status
      } = CharacterValidation.create.parse(params)

      const char = await prisma.character.create({
        data: {
          campaignsId: campaign,
          name,
          usersId: owner,
          about,
          atributes,
          slots,
          status
        }
      })

      return char

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const update = async (
    params: CharacterType.update): Promise<character> => {
    try {
      const {
        id,
        campaign,
        name,
        owner,
        about,
        atributes,
        slots,
        status
      } = CharacterValidation.update.parse(params)

      const char = await prisma.character.update({
        where: {
          id
        },
        data: {
          campaignsId: campaign,
          name,
          about,
          usersId: owner,
          atributes,
          slots,
          status
        }
      })

      return char
    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const killOrRevive = async (
    params: GenericTypes.get) => {
    try {
      const { id } = GenericValidation.id.parse(params)

      const charFind = await prisma.character.findFirst({
        where: { id }
      })
      let act;
      switch (charFind?.isAlive) {
        case true:
          act = false
          break;
        case false:
          act = true
          break;
      }

      const char = await prisma.character.update({
        where: { id },
        data: {
          isAlive: act
        }
      })

      return char
    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const destroy = async (
    params: CharacterType.destroy): Promise<{ message: string }> => {
    try {
      const { id } = GenericValidation.id.parse(params)
      const char = await prisma.character.delete({
        where: { id }
      })


      return { message: `user ${char.id} has been deleted` }
    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
}

export namespace SkillsService {
  export const get = async () => {
    try {

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const add = async () => {
    try {

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const edit = async () => {
    try {

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const remove = async () => {
    try {

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
}

export namespace ItemsService {
  export const get = async () => {
    try {

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const add = async () => {
    try {

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const edit = async () => {
    try {

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const remove = async () => {
    try {

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
}