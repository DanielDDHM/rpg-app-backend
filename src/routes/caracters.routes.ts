import {
  FastifyInstance,
  FastifyRegisterOptions
} from 'fastify';
import {
  CharacterController,
  ItemsController,
  SkillsController
} from '../controllers';

const caractersRouter = (
  fastify: FastifyInstance,
  _opts: FastifyRegisterOptions<any>,
  done: Function,
) => {
  fastify
    .get('/get/:id?', CharacterController.get)
    .post('/create', CharacterController.create)
    .put('/update/:id', CharacterController.update)
    .patch('/killorrevive/:id', CharacterController.killOrRevive)
    .delete('/delete/:id', CharacterController.destroy)

  fastify
    .get('/:id/items', ItemsController.get)
    .post('/:id/additem', ItemsController.add)
    .put('/:id/edititem/id', ItemsController.edit)
    .delete('/:id/removeitem/id', ItemsController.remove)

  fastify
    .get('/:id/skills', SkillsController.get)
    .post('/:id/addskills', SkillsController.add)
    .put('/:id/editskill/id', SkillsController.edit)
    .delete('/:id/removeskill/id', SkillsController.remove)

  done();
};

export default caractersRouter;