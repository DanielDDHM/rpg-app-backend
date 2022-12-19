import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import { ItemsController } from '../controllers';

const itemRouter = (
  fastify: FastifyInstance,
  _opts: FastifyRegisterOptions<any>,
  done: Function,
) => {
  fastify;

  fastify
    .get('/', ItemsController.get)
    .post('/', ItemsController.add)
    .put('/edit', ItemsController.edit)
    .delete('/:id', ItemsController.remove);

  done();
};

export default itemRouter;
