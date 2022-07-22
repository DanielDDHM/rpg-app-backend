import { Users } from "@prisma/client"
import { UserTypes } from "../../types"
import { UsersValidation } from "../../validations"
import { prisma } from "../../config"
import { Exception } from "../../helpers"
import {
  Messages,
  StatusCode
} from "../../constants"

export namespace UserService {
  export const get = async (
    params: UserTypes.get): Promise<{ user: Users[], total: number }> => {
    try {
      const { id, email, page, perPage } = UsersValidation.get.parse(params)

      const query = {
        OR: [
          { id },
          { email }
        ]
      }

      const [user, total] = await prisma.$transaction([
        prisma.users.findMany({
          where: (id || email) ? query : {},
          skip: (Number(page) - 1) * Number(perPage) || 0,
          take: Number(perPage) || 10,
        }),
        prisma.users.count({ where: (id || email) ? query : {}, })
      ])

      return { user, total: total }


    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const create = async (
    params: UserTypes.create): Promise<Users> => {
    try {
      const { nick, name, email, phone, password, } = UsersValidation.create.parse(params)

      const userCreated = await prisma.users.create({
        data: {
          nick,
          name,
          email,
          phone,
          password
        }
      })

      return userCreated
    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const update = async (
    params: UserTypes.update): Promise<Users> => {
    try {
      const { id, name, email, phone, password, } = UsersValidation.update.parse(params)
      const userUpdated = await prisma.users.update({
        where: {
          id
        },
        data: {
          name,
          email,
          phone,
          password
        }
      })

      return userUpdated
    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const activate = async (
    params: UserTypes.active): Promise<Users> => {
    try {
      const { id } = UsersValidation.activate.parse(params)

      const user = await prisma.users.findFirst({
        where: { id }
      }).then()

      let act;
      switch (user?.isActive) {
        case true:
          act = false
          break;
        case false:
          act = true
          break;
      }

      const updatedUser = await prisma.users.update({
        where: { id },
        data: {
          isActive: act
        }
      })

      return updatedUser
    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const destroy = async (
    params: UserTypes.destroy): Promise<{ message: string }> => {
    try {
      const { id, email, password } = UsersValidation.destroy.parse(params)

      console.log(email, password)

      await prisma.users.delete({
        where: { id }
      })

      return { message: `User ${id} has Deleted` }
    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
}
