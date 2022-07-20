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
    .get('/get/:id?', UserController.get)
    .post('/create', UserController.create)
    .put('/update/:id', UserController.update)
    .patch('/active/:id', UserController.activate)
    .delete('/delete/:id', UserController.destroy)

  done();
};

const campaignRouter = (
  fastify: FastifyInstance,
  _opts: FastifyRegisterOptions<any>,
  done: Function,
) => {
  fastify
    .get('/get/:id?', CampaignController.get)
    .post('/create', CampaignController.create)
    .put('/update/:id', CampaignController.update)
    .delete('/delete/:id', CampaignController.destroy)

  done();
};

export { userRouter, campaignRouter };
