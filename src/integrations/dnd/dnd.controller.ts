import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCode } from '../../constants';
import { PresenterFactory } from '../../factories';
import { DnDRequest } from './dnd';
import { DnDQuerys } from './dnd.types';

export namespace DnDController {
  export const getChar = async (
    req: FastifyRequest<{ Querystring: DnDQuerys }>,
    res: FastifyReply,
  ) => {
    const { endpoint, query } = req.query;
    const result = await DnDRequest.caracter(endpoint, query);

    return res.status(StatusCode.OK).send(new PresenterFactory(result, ['SUCCESS']));
  };

  export const getClassResources = async (
    req: FastifyRequest<{ Querystring: DnDQuerys }>,
    res: FastifyReply,
  ) => {
    const { endpoint, query } = req.query;
    const result = await DnDRequest.classResources(endpoint, query);

    return res.status(StatusCode.OK).send(new PresenterFactory(result, ['SUCCESS']));
  };

  export const getLevelResources = async (
    req: FastifyRequest<{ Querystring: DnDQuerys }>,
    res: FastifyReply,
  ) => {
    const { endpoint, query } = req.query;
    const result = await DnDRequest.levelResources(endpoint, query);

    return res.status(StatusCode.OK).send(new PresenterFactory(result, ['SUCCESS']));
  };
}
