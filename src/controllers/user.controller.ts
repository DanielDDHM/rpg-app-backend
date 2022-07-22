import { StatusCode } from "../constants";
import { PresenterFactory } from "../factories";
import {
  Campaigns,
  Users
} from "@prisma/client";
import {
  FastifyReply,
  FastifyRequest
} from "fastify";
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
      new PresenterFactory<{ user: Users[], total: number }>(
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
      new PresenterFactory<Users>(
        userCreated,
        ['SUCCESS'],
      )
    )
  }
  export const update = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Body: UserReqType.update }>,
    res: FastifyReply) => {
    const { params: { id }, body } = req
    const userUpdated = await UserService.update({ id, ...body } as UserTypes.update)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<Users>(
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
      new PresenterFactory<Users>(
        userActivated,
        ['SUCCESS'],
      )
    )
  }
  export const destroy = async (
    req: FastifyRequest<{ Params: GenericTypes.id, Querystring: UserReqType.destroy }>,
    res: FastifyReply) => {
    const { params: { id }, query } = req
    const userDeleted = await UserService.destroy({ id, ...query } as UserTypes.destroy)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<{ message: string }>(
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