import {
  FastifyInstance,
  FastifyRegisterOptions
} from 'fastify';
import authRouter from './auth.routes';
import { campaignRouter } from './campaign.routes';
import caractersRouter from './caracters.routes';
import itemRouter from './item.routes';
import skillRouter from './skill.routes';
import {
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
        .register(itemRouter, { prefix: '/item' })
        .register(skillRouter, { prefix: '/skill' })
      done();
    },
    { prefix: '/v1' },
  );
};