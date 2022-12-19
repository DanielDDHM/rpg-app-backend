import { Item } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from '../config';
import { StatusCode } from '../constants';
import { Exception } from '../helpers';
import { ItemsType } from '../types';
import { ItemsValidation } from '../validations';
import { CharacterService } from './caracter.service';

export namespace ItemsService {
  export const get = async (params: ItemsType.get): Promise<Item> => {
    try {
      const { id, char } = ItemsValidation.get.parse(params);
      console.log(char, id);

      const item = await prisma.item.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!item) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['ITEM NOT FOUND']);
      }

      return item;
    } catch (error: any) {
      console.log(error);

      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const add = async (params: ItemsType.add): Promise<Item> => {
    try {
      const { charId, damage, name, properties, value, weight } = ItemsValidation.add.parse(params);

      await CharacterService.get({ id: Number(charId) });

      return await prisma.item.create({
        data: {
          charId,
          damage,
          name,
          properties,
          value,
          weight,
        },
      });
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const edit = async (params: ItemsType.edit): Promise<Item> => {
    try {
      const { id, damage, name, properties, value, weight } = ItemsValidation.edit.parse(params);

      await get({ id });

      return await prisma.item.update({
        where: {
          id,
        },
        data: {
          damage,
          name,
          properties,
          value,
          weight,
        },
      });
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const remove = async (params: ItemsType.remove): Promise<{ message: string }> => {
    try {
      const { id } = ItemsValidation.remove.parse(params);

      await prisma.item
        .update({
          where: {
            id,
          },
          data: {
            deletedAt: dayjs().toISOString(),
          },
        })
        .catch((e) => {
          throw new Exception.AppError(e?.statusCode, [String(e)]);
        });

      return { message: 'deleted with success' };
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
}
