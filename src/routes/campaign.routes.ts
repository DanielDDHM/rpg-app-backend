import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import { CampaignController } from '../controllers';

const campaignRouter = (
  fastify: FastifyInstance,
  _opts: FastifyRegisterOptions<any>,
  done: Function,
) => {
  fastify
    .get('/:id?', CampaignController.get)
    .post('/', CampaignController.create)
    .put('/:id', CampaignController.update)
    .delete('/:id', CampaignController.destroy);

  done();
};

export { campaignRouter };
