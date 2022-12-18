import {
  FastifyInstance,
  FastifyRegisterOptions
} from 'fastify';
import {
  SkillsController,
} from '../controllers';

const skillRouter = (
  fastify: FastifyInstance,
  _opts: FastifyRegisterOptions<any>,
  done: Function,
) => {
  fastify
    .get('/:id', SkillsController.get)
    .post('/', SkillsController.add)
    .put('/edit', SkillsController.edit)
    .delete('/:id', SkillsController.remove)

  done();
};

export default skillRouter;