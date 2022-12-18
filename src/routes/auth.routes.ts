import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import { AuthController } from '../controllers';

const authRouter = (
  fastify: FastifyInstance,
  _opts: FastifyRegisterOptions<any>,
  done: Function,
) => {
  fastify.post('/login', AuthController.login).post('/logout', AuthController.logout);
  done();
};

export default authRouter;
