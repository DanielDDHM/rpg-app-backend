import {
  FastifyInstance,
  FastifyRegisterOptions
} from 'fastify';
import authRouter from './auth.routes';
import caractersRouter from './caracters.routes';
import {
  campaignRouter,
  userRouter
} from './users.routes';

export default (app: FastifyInstance) => {
  app.register(
    (fastify: FastifyInstance, _opts: FastifyRegisterOptions<any>, done: Function) => {
      fastify
        .register(authRouter, { prefix: '/auth' })
        .register(caractersRouter, { prefix: '/char' })
        .register(campaignRouter, { prefix: '/campaign' })
        .register(userRouter, { prefix: '/user' })
      done();
    },
    { prefix: '/v1' },
  );
};