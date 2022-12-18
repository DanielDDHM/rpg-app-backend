import {
  FastifyInstance,
  FastifyRegisterOptions
} from 'fastify';
import {
  CharacterController,
} from '../controllers';

const caractersRouter = (
  fastify: FastifyInstance,
  _opts: FastifyRegisterOptions<any>,
  done: Function,
) => {
  fastify
    .get('/:id?', CharacterController.get)
    .post('/', CharacterController.create)
    .put('/:id', CharacterController.update)
    .patch('/:id', CharacterController.killOrRevive)
    .delete('/:id', CharacterController.destroy)
  done();
};

export default caractersRouter;