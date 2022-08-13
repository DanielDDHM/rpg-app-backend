import {
  FastifyInstance,
  FastifyRegisterOptions
} from 'fastify';
import {
  CharacterController,
  ItemsController,
  SkillsController,
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

  fastify
    .get('/items/:id?', ItemsController.get)
    .post('/:id/additem', ItemsController.add)
    .put('/:id/edititem', ItemsController.edit)
    .patch('/:id/removeitem', ItemsController.remove)

  fastify
    .get('/skill/:id?', SkillsController.get)
    .post('/:id/addskill', SkillsController.add)
    .put('/:id/editskill', SkillsController.edit)
    .patch('/:id/removeskill', SkillsController.remove)

  done();
};

export default caractersRouter;