import { Users } from "@prisma/client"
import { UserTypes } from "../types"
import { UsersValidation } from "../validations"
import { prisma } from "../config"
import { Exception } from "../helpers"
import {
  StatusCode
} from "../constants"
import { PasswordCrypt } from "../helpers/auth"
import _ from "lodash"

export namespace UserService {
  export const get = async (
    params: UserTypes.get): Promise<{ user: Users[], total: number }> => {
    try {
     _.some(params, "id") === true ? params.id = Number(params.id) : null
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
          include: {
            campaigns: true,
            character: true
          }
        }),
        prisma.users.count({ where: (id || email) ? query : {}, })
      ])

      if(!user || total === 0){
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['USER NOT EXIST'])
      }

      return { user, total: total }


    } catch (error: any) {
      if(error instanceof Exception.AppError){
        throw new Exception.AppError(
          error?.statusCode,
          error?.messages
        )
      }

      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [error])
    }
  }
  export const create = async (
    params: UserTypes.create): Promise<Users> => {
    try {
      const { nick, name, email, phone, password } = UsersValidation.create.parse(params)

      const userExists = await prisma.users.findMany({
        where:{
          OR:[
            {nick},
            {email}
          ]
        }
      })

      if(userExists && userExists.length > 0){
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['USER EXIST'])
      }

      const userCreated = await prisma.users.create({
        data: {
          nick,
          name,
          email,
          phone,
          password: await PasswordCrypt.crypt({pass: password, salt: 6})
        }
      })

      return userCreated
    } catch (error: any) {
      if(error instanceof Exception.AppError){
        throw new Exception.AppError(
          error?.statusCode,
          error?.messages
        )
      }

      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [error])
    }
  }
  export const update = async (
    params: UserTypes.update): Promise<Users> => {
    try {
      const { id, name, email, phone, password } = UsersValidation.update.parse(params)

      await UserService.get({id})

      const userUpdated = await prisma.users.update({
        where: {
          id
        },
        data: {
          name,
          email,
          phone,
          password: await PasswordCrypt.crypt({pass: password, salt: 6})
        }
      })

      return userUpdated
    } catch (error: any) {
      if(error instanceof Exception.AppError){
        throw new Exception.AppError(
          error?.statusCode,
          error?.messages
        )
      }

      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [error])
    }
  }
  export const activate = async (
    params: UserTypes.active): Promise<Users> => {
    try {
      const { id } = UsersValidation.activate.parse(params)

      const {user} = await UserService.get({id})

      let act;
      switch (user[0]?.isActive) {
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
      if(error instanceof Exception.AppError){
        throw new Exception.AppError(
          error?.statusCode,
          error?.messages
        )
      }

      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [error])
    }
  }
  export const destroy = async (
    params: UserTypes.destroy): Promise<{ message: string }> => {
    try {
      const { id, email, password } = UsersValidation.destroy.parse(params)

      const {user} = await UserService.get({id})

      const passMatch = await PasswordCrypt.compare({pass: password!, userP: user[0].password});

        if(user[0].email !== email || !passMatch){
          throw new Exception.AppError(StatusCode.BAD_REQUEST, ['DATA IS INCORRECT'])
        }


      await prisma.users.delete({
        where: { id }
      })

      return { message: `User ${id} has Deleted` }
    } catch (error: any) {
      if(error instanceof Exception.AppError){
        throw new Exception.AppError(
          error?.statusCode,
          error?.messages
        )
      }

      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [error])
    }
  }
}
