import { Character } from "@prisma/client"
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
      const {id} = req.params;
    const char = await CharacterService.get({id: Number(id)} as GenericTypes.get)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<{ characters: Character[], total: number }>(
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
      new PresenterFactory<Character>(
        char,
        ['SUCCESS'],
      )
    )
  }
  export const update = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Body: CharacterReqType.update }>,
    res: FastifyReply) => {
    const { params: { id }, body } = req
    const char = await CharacterService.update({ id: Number(id), ...body } as CharacterType.update)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<Character>(
        char,
        ['SUCCESS'],
      )
    )
  }
  export const killOrRevive = async (
    req: FastifyRequest<{ Params: GenericTypes.id }>,
    res: FastifyReply) => {
    const {id} = req.params;
    const char = await CharacterService.killOrRevive({id: Number(id)} as GenericTypes.id)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<Character>(
        char,
        ['SUCCESS'],
      )
    )
  }
  export const destroy = async (
    req: FastifyRequest<{ Params: GenericTypes.id }>,
    res: FastifyReply) => {

      const {id} = req.params;
    const char = await CharacterService.destroy({id: Number(id)} as GenericTypes.id)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<{ message: string }>(
        char,
        ['SUCCESS'],
      )
    )
  }
}