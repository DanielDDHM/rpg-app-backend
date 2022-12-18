import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import { UserController } from '../controllers';

const userRouter = (
  fastify: FastifyInstance,
  _opts: FastifyRegisterOptions<any>,
  done: Function,
) => {
  fastify
    .get('/', UserController.get)
    .post('/', UserController.create)
    .put('/:id', UserController.update)
    .patch('/:id', UserController.activate)
    .delete('/:id', UserController.destroy);

  done();
};

export { userRouter };
