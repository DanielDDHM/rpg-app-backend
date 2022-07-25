import {
  FastifyInstance,
  FastifyRegisterOptions
} from 'fastify';
import {
  CharacterController,
  ItemsController,
  SkillsController,
  // SkillsController
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
    .get('/items', ItemsController.get)
    .post('/:id/additem', ItemsController.add)
    .put('/:id/edititem', ItemsController.edit)
    .patch('/:id/removeitem', ItemsController.remove)

  fastify
    .get('/skill', SkillsController.get)
    .post('/:id/addskill', SkillsController.add)
    .put('/:id/editskill', SkillsController.edit)
    .patch('/:id/removeskill', SkillsController.remove)

  done();
};

export default caractersRouter;