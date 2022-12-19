import { Users } from '@prisma/client';
import dayjs from 'dayjs';
import _ from 'lodash';
import { prisma } from '../config';
import { StatusCode } from '../constants';
import { Exception } from '../helpers';
import { PasswordCrypt } from '../helpers/auth';
import { UserTypes } from '../types';
import { UsersValidation } from '../validations';

export namespace UserService {
  export const get = async (params: UserTypes.get): Promise<{ user: Users[]; total: number }> => {
    try {
      _.some(params, 'id') === true ? (params.id = Number(params.id)) : null;
      const { id, email, page, perPage } = UsersValidation.get.parse(params);

      const [user, total] = await prisma.$transaction([
        prisma.users.findMany({
          where: { AND: [{ deletedAt: null }, { OR: [{ id }, { email }] }] },
          skip: (Number(page) - 1) * Number(perPage) || 0,
          take: Number(perPage) || 10,
          include: {
            campaigns: true,
            character: true,
          },
        }),
        prisma.users.count({ where: { AND: [{ deletedAt: null }, { OR: [{ id }, { email }] }] } }),
      ]);

      if (!user || total === 0) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['USER NOT EXIST']);
      }

      return { user, total: total };
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const create = async (params: UserTypes.create): Promise<Users> => {
    try {
      const { nick, name, email, phone, password } = UsersValidation.create.parse(params);

      const userExists = await prisma.users.findMany({
        where: {
          OR: [{ nick }, { email }],
        },
      });

      if (userExists && userExists.length > 0) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['USER EXIST']);
      }

      const userCreated = await prisma.users.create({
        data: {
          nick,
          name,
          email,
          phone,
          password: await PasswordCrypt.crypt({ pass: password, salt: 6 }),
        },
      });

      return userCreated;
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const update = async (params: UserTypes.update): Promise<Users> => {
    try {
      const { id, name, email, phone, password } = UsersValidation.update.parse(params);

      await UserService.get({ id });

      const userUpdated = await prisma.users.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          phone,
          password: await PasswordCrypt.crypt({ pass: password, salt: 6 }),
        },
      });

      return userUpdated;
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const activate = async (params: UserTypes.active): Promise<Users> => {
    try {
      const { id } = UsersValidation.activate.parse(params);

      const { user } = await UserService.get({ id });

      let act;
      switch (user[0]?.isActive) {
        case true:
          act = false;
          break;
        case false:
          act = true;
          break;
      }

      const updatedUser = await prisma.users.update({
        where: { id },
        data: {
          isActive: act,
        },
      });

      return updatedUser;
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const destroy = async (params: UserTypes.destroy): Promise<{ message: string }> => {
    try {
      const { id, email, password } = UsersValidation.destroy.parse(params);

      const { user } = await UserService.get({ id });

      console.log(user, user[0].password, password);

      const passMatch = await PasswordCrypt.compare({ pass: password!, userP: user[0].password });

      console.log(passMatch);

      if (user[0].email !== email || !passMatch) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['DATA IS INCORRECT']);
      }

      await prisma.users.update({
        where: { id },
        data: {
          deletedAt: dayjs().toISOString(),
        },
      });

      return { message: `User ${id} has Deleted` };
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
}
