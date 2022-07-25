import {
  FastifyReply,
  FastifyRequest
} from "fastify"
import {
  GenericTypes,
  SkillsReqType,
  SkillsType
} from "../../types"
import { Character } from "@prisma/client"
import { StatusCode } from "../../constants"
import { PresenterFactory } from "../../factories"
import { SkillsService } from "../../services"


export namespace SkillsController {
  export const get = async (
    req: FastifyRequest<{ Querystring: SkillsType.get }>,
    res: FastifyReply) => {

    const skills = await SkillsService.get(req.query as SkillsType.get)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<Character["magics"]>(
        skills,
        ['SUCCESS'],
      )
    )
  }

  export const add = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Body: SkillsReqType.add }>,
    res: FastifyReply) => {

    const skills = await SkillsService.add({ char: req.params.id, ...req.body } as SkillsType.add)
    return res.status(StatusCode.OK).send(
      new PresenterFactory<Character["magics"]>(
        skills,
        ['SUCCESS'],
      )
    )
  }

  export const edit = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Body: SkillsReqType.edit }>,
    res: FastifyReply) => {

    const skills = await SkillsService.edit({ char: req.params.id, ...req.body } as SkillsType.edit)
    return res.status(StatusCode.OK).send(
      new PresenterFactory<Character["magics"]>(
        skills,
        ['SUCCESS'],
      )
    )
  }

  export const remove = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Querystring: SkillsReqType.remove }>,
    res: FastifyReply) => {

    const skills = await SkillsService.remove({ char: req.params.id, ...req.query } as SkillsType.remove)
    return res.status(StatusCode.OK).send(
      new PresenterFactory<Character["magics"]>(
        skills,
        ['SUCCESS'],
      )
    )
  }

}