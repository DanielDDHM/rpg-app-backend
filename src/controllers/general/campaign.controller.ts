import { Campaigns } from "@prisma/client"
import { StatusCode } from "../../constants"
import { PresenterFactory } from "../../factories"
import { CampaignService } from "../../services"
import {
  FastifyReply,
  FastifyRequest
} from "fastify"
import {
  CampaignReqType,
  CampaignTypes,
  GenericTypes
} from "../../types"

export namespace CampaignController {
  export const get = async (
    req: FastifyRequest<{ Querystring: GenericTypes.get }>,
    res: FastifyReply) => {
    const campaign = await CampaignService.get(req.query as GenericTypes.get)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<{ campaign: Campaigns[], total: number }>(
        campaign,
        ['SUCCESS'],
      )
    )
  }

  export const create = async (
    req: FastifyRequest<{ Body: CampaignTypes.create }>,
    res: FastifyReply) => {
    const campaign = await CampaignService.create(req.body as CampaignTypes.create)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<Campaigns>(
        campaign,
        ['SUCCESS'],
      )
    )
  }
  export const update = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Body: CampaignReqType.update }>,
    res: FastifyReply) => {
    const { params: { id }, body } = req
    const campaign = await CampaignService.update({ id, ...body } as CampaignTypes.update)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<Campaigns>(
        campaign,
        ['SUCCESS'],
      )
    )
  }
  export const destroy = async (
    req: FastifyRequest<{ Params: CampaignTypes.destroy }>,
    res: FastifyReply) => {
    const campaign = await CampaignService.destroy(req.params as CampaignTypes.destroy)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<{ message: string }>(
        campaign,
      )
    )
  }
}