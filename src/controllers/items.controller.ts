import { Item } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCode } from '../constants';
import { PresenterFactory } from '../factories';
import { ItemsService } from '../services';
import { GenericTypes, ItemsType } from '../types';

export namespace ItemsController {
  export const get = async (
    req: FastifyRequest<{ Querystring: ItemsType.get }>,
    res: FastifyReply,
  ) => {
    const { id } = req.query;
    const items = await ItemsService.get({ id: Number(id) } as ItemsType.get);

    return res.status(StatusCode.OK).send(new PresenterFactory<Item>(items, ['SUCCESS']));
  };

  export const add = async (req: FastifyRequest<{ Body: ItemsType.add }>, res: FastifyReply) => {
    const items = await ItemsService.add({
      ...req.body,
    } as ItemsType.add);
    return res.status(StatusCode.OK).send(new PresenterFactory<Item>(items, ['SUCCESS']));
  };

  export const edit = async (
    req: FastifyRequest<{ Querystring: GenericTypes.id; Body: Omit<ItemsType.edit, 'id'> }>,
    res: FastifyReply,
  ) => {
    const items = await ItemsService.edit({
      id: Number(req.query.id),
      ...req.body,
    } as ItemsType.edit);
    return res.status(StatusCode.OK).send(new PresenterFactory<Item>(items, ['SUCCESS']));
  };

  export const remove = async (
    req: FastifyRequest<{ Params: GenericTypes.id }>,
    res: FastifyReply,
  ) => {
    const items = await ItemsService.remove({
      id: Number(req.params.id),
    } as ItemsType.remove);

    return res
      .status(StatusCode.OK)
      .send(new PresenterFactory<{ message: string }>(items, ['SUCCESS']));
  };
}
