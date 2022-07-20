import {
  campaigns,
  users
} from "@prisma/client";
import {
  FastifyReply,
  FastifyRequest
} from "fastify";
import { StatusCode } from "../constants";
import { PresenterFactory } from "../factories";
import {
  CampaignService,
  UserService
} from "../services";
import {
  CampaignReqType,
  CampaignTypes,
  GenericTypes,
  UserReqType,
  UserTypes
} from "../types";


export namespace UserController {
  export const get = async (
    req: FastifyRequest<{ Querystring: UserTypes.get }>,
    res: FastifyReply) => {

    const user = await UserService.get(req.query as UserTypes.get)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<{ user: users[], total: Number }>(
        user,
        ['SUCCESS'],
      )
    )
  }
  export const create = async (
    req: FastifyRequest<{ Body: UserTypes.create }>,
    res: FastifyReply) => {
    const userCreated = await UserService.create(req.body as UserTypes.create)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<users>(
        userCreated,
        ['SUCCESS'],
      )
    )
  }
  export const update = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Body: UserReqType.updateT }>,
    res: FastifyReply) => {
    const { params: { id }, body } = req
    const userUpdated = await UserService.update({ id, ...body } as UserTypes.update)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<users>(
        userUpdated,
        ['SUCCESS'],
      )
    )
  }
  export const activate = async (
    req: FastifyRequest<{ Params: UserTypes.active }>,
    res: FastifyReply) => {
    const { params: { id } } = req
    const userActivated = await UserService.activate({ id } as UserTypes.active)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<users>(
        userActivated,
        ['SUCCESS'],
      )
    )
  }
  export const destroy = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Querystring: UserReqType.destroyT }>,
    res: FastifyReply) => {
    const { params: { id }, query } = req
    const userDeleted = await UserService.destroy({ id, ...query } as UserTypes.destroy)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<{ message: String }>(
        userDeleted,
      )
    )
  }
}

export namespace CampaignController {
  export const get = async (
    req: FastifyRequest<{ Querystring: GenericTypes.get }>,
    res: FastifyReply) => {
    const campaign = await CampaignService.get(req.query as GenericTypes.get)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<{ campaign: campaigns[], total: Number }>(
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
      new PresenterFactory<campaigns>(
        campaign,
        ['SUCCESS'],
      )
    )
  }
  export const update = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Body: CampaignReqType.updateT }>,
    res: FastifyReply) => {
    const { params: { id }, body } = req
    const campaign = await CampaignService.update({ id, ...body } as CampaignTypes.update)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<campaigns>(
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
      new PresenterFactory<{ message: String }>(
        campaign,
      )
    )
  }
}