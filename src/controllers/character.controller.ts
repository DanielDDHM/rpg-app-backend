import { FastifyReply, FastifyRequest } from "fastify"

export namespace CharacterController {
  export const get = async (req: FastifyRequest, res: FastifyReply) => {
    console.log('Teste')
  }
  export const create = async (req: FastifyRequest, res: FastifyReply) => {

  }
  export const update = async (req: FastifyRequest, res: FastifyReply) => {

  }
  export const killOrRevive = async (req: FastifyRequest, res: FastifyReply) => {

  }
  export const destroy = async (req: FastifyRequest, res: FastifyReply) => {

  }
}

export namespace SkillsController {
  export const get = async (req: FastifyRequest, res: FastifyReply) => {

  }
  export const add = async (req: FastifyRequest, res: FastifyReply) => {

  }
  export const edit = async (req: FastifyRequest, res: FastifyReply) => {

  }
  export const remove = async (req: FastifyRequest, res: FastifyReply) => {

  }
}

export namespace ItemsController {
  export const get = async (req: FastifyRequest, res: FastifyReply) => {

  }
  export const add = async (req: FastifyRequest, res: FastifyReply) => {

  }
  export const edit = async (req: FastifyRequest, res: FastifyReply) => {

  }
  export const remove = async (req: FastifyRequest, res: FastifyReply) => {

  }
}