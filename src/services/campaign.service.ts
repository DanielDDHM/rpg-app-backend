import { Campaign } from "@prisma/client"
import { prisma } from "../config"
import { StatusCode } from "../constants"
import { Exception } from "../helpers"
import { CampaignTypes } from "../types"
import { CampaignValidation, GenericValidation } from "../validations"
import { UserService } from "./user.service"

export namespace CampaignService {
  export const get = async (
    params: CampaignTypes.get): Promise<{ campaign: Campaign[], total: number }> => {
    try {
      params.id ? params.id = Number(params.id) : null
      const { id, user, page, perPage } = CampaignValidation.get.parse(params)

      const query = {
        OR: [
          { id },
          { user }
        ]
      }

      const [campaign, total] = await prisma.$transaction([
        prisma.campaign.findMany({
          where: (id || user) ? query : {},
          skip: (Number(page) - 1) * Number(perPage) || 0,
          take: Number(perPage) || 10,
          include: {
            owner: true,
            character: true
          }
        }),
        prisma.campaign.count({ where: (id || user) ? query : {}, })
      ])

      if(!campaign || total === 0){
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['CAMPAIGN NOT EXIST'])
      }

      return { campaign, total: total }

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
    params: CampaignTypes.create): Promise<Campaign> => {
    try {
      const { name, ownerId } = CampaignValidation.create.parse(params)

      await UserService.get({id: ownerId})

      const campaign = await prisma.campaign.create({
        data: {
          name,
          ownerId
        }
      })

      return campaign

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
    params: CampaignTypes.update): Promise<Campaign> => {
    try {
      const { id, name } = CampaignValidation.update.parse(params)

      await CampaignService.get({id})

      const campaign = await prisma.campaign.update({
        where: {
          id
        },
        data: {
          name
        }
      })

      return campaign
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
    params: CampaignTypes.destroy): Promise<{ message: string }> => {
    try {
      const { id } = GenericValidation.id.parse(params)

      await CampaignService.get({id})

      const campaign = await prisma.campaign.delete({
        where: {
          id
        }
      })

      return { message: `Campaign ${campaign.name}, with id: ${id} has been deleted` }

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