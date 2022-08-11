import {
  FastifyInstance,
  FastifyRegisterOptions
} from 'fastify';
import {
  CampaignController,
  UserController
} from '../controllers';

const userRouter = (
  fastify: FastifyInstance,
  _opts: FastifyRegisterOptions<any>,
  done: Function,
) => {
  fastify
    .get('/:id?', UserController.get)
    .post('/', UserController.create)
    .put('/:id', UserController.update)
    .patch('/:id', UserController.activate)
    .delete('/:id', UserController.destroy)

  done();
};

const campaignRouter = (
  fastify: FastifyInstance,
  _opts: FastifyRegisterOptions<any>,
  done: Function,
) => {
  fastify
    .get('/:id?', CampaignController.get)
    .post('/', CampaignController.create)
    .put('/:id', CampaignController.update)
    .delete('/:id', CampaignController.destroy)

  done();
};

export { userRouter, campaignRouter };
