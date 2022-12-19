import { Character } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from '../config';
import { StatusCode } from '../constants';
import { Exception } from '../helpers';
import { CharacterType, GenericTypes } from '../types';
import { CharacterValidation, GenericValidation } from '../validations';
import { CampaignService } from './campaign.service';
import { UserService } from './user.service';

export namespace CharacterService {
  export const get = async (
    params: CharacterType.get,
  ): Promise<{ characters: Character[]; total: number }> => {
    try {
      const { id, user, campaign, page, perPage } = CharacterValidation.get.parse(params);

      const [characters, total] = await prisma.$transaction([
        prisma.character.findMany({
          where: {
            AND: [
              { OR: [{ id }, { usersId: user }, { campaignsId: campaign }] },
              { deletedAt: null },
            ],
          },
          skip: (Number(page) - 1) * Number(perPage) || 0,
          take: Number(perPage) || 10,
          include: {
            items: true,
            magics: true,
            owner: true,
            campaign: true,
          },
        }),
        prisma.character.count({
          where: {
            AND: [
              { OR: [{ id }, { usersId: user }, { campaignsId: campaign }] },
              { deletedAt: null },
            ],
          },
        }),
      ]);

      if (!characters.length) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['CHAR NOT EXIST']);
      }

      return { characters, total: total };
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const create = async (params: CharacterType.create): Promise<Character> => {
    try {
      const { campaign, name, owner, about, atributes, slots, status } =
        CharacterValidation.create.parse(params);

      await Promise.all([CampaignService.get({ id: campaign }), UserService.get({ id: owner })]);

      const char = await prisma.character.create({
        data: {
          campaignsId: campaign,
          usersId: owner,
          name,
          about,
          atributes,
          slots,
          status,
        },
      });

      return char;
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };

  export const update = async (params: CharacterType.update): Promise<Character> => {
    try {
      const { id, campaign, name, owner, about, atributes, slots, status } =
        CharacterValidation.update.parse(params);

      await Promise.all([
        get({ id }),
        CampaignService.get({ id: campaign }),
        UserService.get({ id: owner }),
      ]);

      const char = await prisma.character.update({
        where: {
          id,
        },
        data: {
          campaignsId: campaign,
          name,
          about,
          usersId: owner,
          atributes,
          slots,
          status,
        },
      });

      return char;
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };

  export const killOrRevive = async (params: GenericTypes.get) => {
    try {
      const { id } = GenericValidation.id.parse(params);

      const { characters } = await get({ id });

      let act;
      switch (characters[0].isAlive) {
        case true:
          act = false;
          break;
        case false:
          act = true;
          break;
      }

      const char = await prisma.character.update({
        where: { id },
        data: {
          isAlive: act,
        },
      });

      return char;
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const destroy = async (params: CharacterType.destroy): Promise<{ message: string }> => {
    try {
      const { id } = GenericValidation.id.parse(params);

      await get({ id });

      const char = await prisma.character.update({
        where: { id },
        data: {
          deletedAt: dayjs().toISOString(),
        },
      });

      return { message: `user ${char.id} has been deleted` };
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
}
