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
    .get('/:id/items', ItemsController.get)
    .get('/:id/skills', SkillsController.get)
    .post('/create', CharacterController.create)
    .post('/:id/additem', ItemsController.add)
    .post('/:id/addskills', SkillsController.add)
    .put('/update/:id', CharacterController.update)
    .put('/:id/edititem/id', ItemsController.edit)
    .put('/:id/editskill/id', ItemsController.edit)
    .put('/:id/removeitem/id', ItemsController.remove)
    .put('/:id/removeskill/id', SkillsController.remove)
    .patch('/killOrRevive/:id', CharacterController.killOrRevive)

    .delete('/delete/:id', CharacterController.destroy)

  done();
};

export default caractersRouter;