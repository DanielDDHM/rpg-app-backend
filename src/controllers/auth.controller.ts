import {
  FastifyReply,
  FastifyRequest
} from "fastify"
import { StatusCode } from "../constants"
import { PresenterFactory } from "../factories"

export namespace AuthController {
  export const login = async (
    req: FastifyRequest,
    res: FastifyReply) => {

    return res.status(StatusCode.OK).send(
      new PresenterFactory<{}>(
        login,
        ['SUCCESS'],
      )
    )
  }
  export const logout = async (
    req: FastifyRequest,
    res: FastifyReply) => {

    return res.status(StatusCode.OK).send(
      new PresenterFactory<{}>(
        logout,
        ['SUCCESS'],
      )
    )
  }
}