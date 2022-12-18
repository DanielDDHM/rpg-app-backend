import { StatusCode } from '../constants';
import { PresenterFactory } from '../factories';
import { Users } from '@prisma/client';
import { UserService } from '../services';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GenericTypes, UserTypes } from '../types';

export namespace UserController {
  export const get = async (
    req: FastifyRequest<{ Querystring: UserTypes.get }>,
    res: FastifyReply,
  ) => {
    const user = await UserService.get(req.query);

    return res
      .status(StatusCode.OK)
      .send(new PresenterFactory<{ user: Users[]; total: number }>(user, ['SUCCESS']));
  };
  export const create = async (
    req: FastifyRequest<{ Body: UserTypes.create }>,
    res: FastifyReply,
  ) => {
    const userCreated = await UserService.create(req.body as UserTypes.create);

    return res.status(StatusCode.OK).send(new PresenterFactory<Users>(userCreated, ['SUCCESS']));
  };
  export const update = async (
    req: FastifyRequest<{ Params: GenericTypes.id; Body: Omit<UserTypes.update, 'id'> }>,
    res: FastifyReply,
  ) => {
    const {
      params: { id },
      body,
    } = req;
    const userUpdated = await UserService.update({ id: Number(id), ...body } as UserTypes.update);

    return res.status(StatusCode.OK).send(new PresenterFactory<Users>(userUpdated, ['SUCCESS']));
  };
  export const activate = async (
    req: FastifyRequest<{ Params: UserTypes.active }>,
    res: FastifyReply,
  ) => {
    const {
      params: { id },
    } = req;
    const userActivated = await UserService.activate({ id: Number(id) } as UserTypes.active);

    return res.status(StatusCode.OK).send(new PresenterFactory<Users>(userActivated, ['SUCCESS']));
  };
  export const destroy = async (
    req: FastifyRequest<{ Params: GenericTypes.id }>,
    res: FastifyReply,
  ) => {
    const {
      params: { id },
    } = req;
    const userDeleted = await UserService.destroy({ id: Number(id) } as UserTypes.destroy);

    return res.status(StatusCode.OK).send(new PresenterFactory<{ message: string }>(userDeleted));
  };
}
