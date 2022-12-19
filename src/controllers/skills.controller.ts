import { Magic } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCode } from '../constants';
import { PresenterFactory } from '../factories';
import { SkillsService } from '../services';
import { GenericTypes, SkillsReqType, SkillsType } from '../types';

export namespace SkillsController {
  export const get = async (
    req: FastifyRequest<{ Querystring: SkillsType.get }>,
    res: FastifyReply,
  ) => {
    const { id } = req.query;
    const skills = await SkillsService.get({ id: Number(id) });

    return res.status(StatusCode.OK).send(new PresenterFactory<Magic>(skills, ['SUCCESS']));
  };

  export const add = async (
    req: FastifyRequest<{ Params: GenericTypes.id; Body: SkillsReqType.add }>,
    res: FastifyReply,
  ) => {
    const skills = await SkillsService.add({
      char: Number(req.params.id),
      ...req.body,
    } as SkillsType.add);
    return res.status(StatusCode.OK).send(new PresenterFactory<Magic>(skills, ['SUCCESS']));
  };

  export const edit = async (
    req: FastifyRequest<{ Params: GenericTypes.id; Body: SkillsReqType.edit }>,
    res: FastifyReply,
  ) => {
    const skills = await SkillsService.edit({
      char: Number(req.params.id),
      ...req.body,
    } as SkillsType.edit);
    return res.status(StatusCode.OK).send(new PresenterFactory<Magic>(skills, ['SUCCESS']));
  };

  export const remove = async (
    req: FastifyRequest<{ Params: GenericTypes.id }>,
    res: FastifyReply,
  ) => {
    const skills = await SkillsService.remove({
      id: Number(req.params.id),
    } as SkillsType.remove);
    return res
      .status(StatusCode.OK)
      .send(new PresenterFactory<{ message: string }>(skills, ['SUCCESS']));
  };
}
