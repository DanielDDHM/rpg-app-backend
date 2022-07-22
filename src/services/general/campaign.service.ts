import { Campaigns } from "@prisma/client"
import { prisma } from "../../config"
import { Messages, StatusCode } from "../../constants"
import { Exception } from "../../helpers"
import { CampaignTypes } from "../../types"
import { CampaignValidation, GenericValidation } from "../../validations"

export namespace CampaignService {
  export const get = async (
    params: CampaignTypes.get): Promise<{ campaign: Campaigns[], total: number }> => {
    try {
      const { id, user, page, perPage } = CampaignValidation.get.parse(params)

      const query = {
        OR: [
          { id },
          { user }
        ]
      }

      const [campaign, total] = await prisma.$transaction([
        prisma.campaigns.findMany({
          where: (id || user) ? query : {},
          skip: (Number(page) - 1) * Number(perPage) || 0,
          take: Number(perPage) || 10,
        }),
        prisma.campaigns.count({ where: (id || user) ? query : {}, })
      ])

      return { campaign, total: total }

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const create = async (
    params: CampaignTypes.create): Promise<Campaigns> => {
    try {
      const { name, user } = CampaignValidation.create.parse(params)

      const campaign = await prisma.campaigns.create({
        data: {
          name,
          usersId: user
        }
      })

      return campaign

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const update = async (
    params: CampaignTypes.update): Promise<Campaigns> => {
    try {
      const { id, name } = CampaignValidation.update.parse(params)

      const campaign = await prisma.campaigns.update({
        where: {
          id
        },
        data: {
          name
        }
      })

      return campaign
    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const destroy = async (
    params: CampaignTypes.destroy): Promise<{ message: string }> => {
    try {
      const { id } = GenericValidation.id.parse(params)

      const campaign = await prisma.campaigns.delete({
        where: {
          id
        }
      })

      return { message: `Campaign ${campaign.name}, with id: ${id} has been deleted` }

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
}