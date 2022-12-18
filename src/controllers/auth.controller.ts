import {
  FastifyReply,
  FastifyRequest
} from "fastify"
import { AuthService } from "../../services"
import { GenericTypes } from "../../types"
import { StatusCode } from "../../constants"
import { PresenterFactory } from "../../factories"

export namespace AuthController {
  export const login = async (
    req: FastifyRequest<{Body: GenericTypes.login}>,
    res: FastifyReply) => {

    const login = await AuthService.login(req.body as GenericTypes.login)

    return res.status(StatusCode.OK).send(
      new PresenterFactory<{auth: boolean, token: string}>(
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