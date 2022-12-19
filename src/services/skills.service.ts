import { Magic } from '@prisma/client';
import { prisma } from '../config';
import { Messages, StatusCode } from '../constants';
import { Exception } from '../helpers';
import { SkillsType } from '../types';
import { SkillsValidation } from '../validations';

export namespace SkillsService {
  export const get = async (params: SkillsType.get): Promise<Magic> => {
    try {
      const { id } = SkillsValidation.get.parse(params);

      const skill = await prisma.magic.findFirst({
        where: { id },
      });

      if (!skill) {
        throw new Exception.AppError(StatusCode.NOT_FOUND, [Messages.StatusMessage.NOT_FOUND]);
      }

      return skill;
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const add = async (params: SkillsType.add): Promise<Magic> => {
    try {
      const { charId, damage, name, castingtime, component, description, duration, range } =
        SkillsValidation.add.parse(params);

      const skill = await prisma.magic.create({
        data: {
          charId,
          damage,
          name,
          castingtime,
          component,
          description,
          duration,
          range,
        },
      });

      return skill;
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const edit = async (params: SkillsType.edit): Promise<Magic> => {
    try {
      const { damage, name, castingtime, component, description, duration, range, id } =
        SkillsValidation.edit.parse(params);

      await get({ id });

      const magic = await prisma.magic.update({
        where: {
          id,
        },
        data: {
          damage,
          name,
          castingtime,
          component,
          description,
          duration,
          range,
        },
      });

      return magic;
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const remove = async (params: SkillsType.remove): Promise<{ message: string }> => {
    try {
      const { id } = params;
      return { message: `Skill ${id} has Deleted` };
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
}
