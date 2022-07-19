import {
  FastifyInstance,
  FastifyRegisterOptions
} from 'fastify';
import caractersRouter from './caracters.routes';
import {
  campaignRouter,
  userRouter
} from './users.routes';

export default (app: FastifyInstance) => {
  app.register(
    (fastify: FastifyInstance, _opts: FastifyRegisterOptions<any>, done: Function) => {
      fastify.register(caractersRouter, { prefix: '/char' })
        .register(userRouter, { prefix: '/user' })
        .register(campaignRouter, { prefix: '/campaign' })
      done();
    },
    { prefix: '/v1' },
  );
};