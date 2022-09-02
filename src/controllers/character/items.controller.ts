import { Character } from "@prisma/client"
import {
  FastifyReply,
  FastifyRequest
} from "fastify"
import { StatusCode } from "../../constants"
import { PresenterFactory } from "../../factories"
import { ItemsService } from "../../services"
import { GenericTypes, ItemsReqType, ItemsType } from "../../types"

export namespace ItemsController {
  export const get = async (
    req: FastifyRequest<{Querystring: ItemsType.get }>,
    res: FastifyReply) => {

      const {id} = req.query;
    const items = await ItemsService.get({id: Number(id)} as ItemsType.get)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<Character["items"]>(
        items,
        ['SUCCESS'],
      )
    )
  }

  export const add = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Body: ItemsReqType.add }>,
    res: FastifyReply) => {

    const items = await ItemsService.add({ char: Number(req.params.id), ...req.body } as ItemsType.add)
    return res.status(StatusCode.OK).send(
      new PresenterFactory<Character["items"]>(
        items,
        ['SUCCESS'],
      )
    )
  }

  export const edit = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Body: ItemsReqType.edit }>,
    res: FastifyReply) => {

    const items = await ItemsService.edit({ char: Number(req.params.id), ...req.body } as ItemsType.edit)
    return res.status(StatusCode.OK).send(
      new PresenterFactory<Character["items"]>(
        items,
        ['SUCCESS'],
      )
    )
  }

  export const remove = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Querystring: ItemsReqType.remove }>,
    res: FastifyReply) => {

    const items = await ItemsService.remove({ char: Number(req.params.id), ...req.query } as ItemsType.remove)
    return res.status(StatusCode.OK).send(
      new PresenterFactory<Character["items"]>(
        items,
        ['SUCCESS'],
      )
    )
  }

}