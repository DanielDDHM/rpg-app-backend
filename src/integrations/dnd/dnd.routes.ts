import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import { DnDController } from './dnd.controller';

const dndRouter = (
  fastify: FastifyInstance,
  _opts: FastifyRegisterOptions<any>,
  done: Function,
) => {
  fastify.get('/char', DnDController.getChar);
  fastify.get('/levelResources', DnDController.getLevelResources);
  done();
};

export default dndRouter;
