import { character } from "@prisma/client"
import { StatusCode } from "../constants"
import { PresenterFactory } from "../factories"
import { CharacterService } from "../services"
import {
  FastifyReply,
  FastifyRequest
} from "fastify"
import {
  CharacterType,
  CharacterReqType,
  GenericTypes
} from "../types"

export namespace CharacterController {
  export const get = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Querystring: CharacterReqType.get }>,
    res: FastifyReply) => {
    const char = await CharacterService.get(req.params as GenericTypes.get)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<{ characters: character[], total: number }>(
        char,
        ['SUCCESS'],
      )
    )
  }
  export const create = async (
    req: FastifyRequest<{ Body: CharacterType.create }>,
    res: FastifyReply) => {
    const char = await CharacterService.create(req.body as CharacterType.create)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<character>(
        char,
        ['SUCCESS'],
      )
    )
  }
  export const update = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Body: CharacterReqType.update }>,
    res: FastifyReply) => {
    const char = await CharacterService.update(req.params as CharacterType.update)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<character>(
        char,
        ['SUCCESS'],
      )
    )
  }
  export const killOrRevive = async (
    req: FastifyRequest<{ Params: GenericTypes.id }>,
    res: FastifyReply) => {
    const char = await CharacterService.killOrRevive(req.params as GenericTypes.id)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<character>(
        char,
        ['SUCCESS'],
      )
    )
  }
  export const destroy = async (
    req: FastifyRequest<{ Params: GenericTypes.id }>,
    res: FastifyReply) => {
    const char = await CharacterService.destroy(req.params as GenericTypes.id)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<{ message: string }>(
        char,
        ['SUCCESS'],
      )
    )
  }
}

export namespace SkillsController {
  export const get = async (
    req: FastifyRequest,
    res: FastifyReply) => { }

  export const add = async (
    req: FastifyRequest,
    res: FastifyReply) => { }

  export const edit = async (
    req: FastifyRequest,
    res: FastifyReply) => { }

  export const remove = async (
    req: FastifyRequest,
    res: FastifyReply) => { }
}

export namespace ItemsController {
  export const get = async (
    req: FastifyRequest,
    res: FastifyReply) => { }

  export const add = async (
    req: FastifyRequest,
    res: FastifyReply) => { }

  export const edit = async (
    req: FastifyRequest,
    res: FastifyReply) => { }

  export const remove = async (
    req: FastifyRequest,
    res: FastifyReply) => { }
}