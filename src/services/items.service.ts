import { StatusCode } from '../constants';
import { Exception } from '../helpers';
import { ItemsType } from '../types';
import { ItemsValidation } from '../validations';
import { prisma } from '../config';
import { Character } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { CharacterService } from './caracter.service';

export namespace ItemsService {
  export const get = async (params: ItemsType.get): Promise<Character['items']> => {
    try {
      const { id, char } = ItemsValidation.get.parse(params);

      const { characters } = await CharacterService.get({ id: char });

      const items = id
        ? [characters[0]?.items.find((item) => item?.id! === id)!]
        : characters[0]?.items!;

      if (items.length === 0) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['ITEM NOT FOUND']);
      }

      return items;
    } catch (error: any) {
      console.log(error);

      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const add = async (params: ItemsType.add): Promise<Character['items']> => {
    try {
      const { char, damage, name, properties, value, weight } = ItemsValidation.add.parse(params);

      await CharacterService.get({ id: char });

      const item = {
        id: uuid(),
        damage,
        name,
        properties,
        value,
        weight,
      };

      const charUpdated = await prisma.character.update({
        where: {
          id: char,
        },
        data: {
          items: { push: item },
        },
      });

      return charUpdated.items;
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const edit = async (params: ItemsType.edit): Promise<Character['items']> => {
    try {
      const { id, char, damage, name, properties, value, weight } =
        ItemsValidation.edit.parse(params);
      const item = {
        id,
        damage,
        name,
        properties,
        value,
        weight,
      };

      const { characters } = await CharacterService.get({ id: char });

      characters[0].items[characters[0].items.findIndex((item) => item?.id! === id)] = item;

      const charUpdated = await prisma.character.update({
        where: {
          id: char,
        },
        data: { items: characters[0]?.items },
      });

      return charUpdated.items;
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const remove = async (params: ItemsType.remove): Promise<Character['items']> => {
    try {
      const { id, char } = ItemsValidation.remove.parse(params);

      const { characters } = await CharacterService.get({ id: char });

      characters[0].items.splice(
        characters[0].items.findIndex((item) => item?.id! === id),
        1,
      );

      const charUpdated = await prisma.character.update({
        where: {
          id: char,
        },
        data: { items: characters[0].items },
      });

      return charUpdated.items;
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
}
