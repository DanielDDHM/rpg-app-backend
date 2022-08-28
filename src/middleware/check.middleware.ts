import 'dotenv/config';
import jwt from 'jsonwebtoken';

import {
  FastifyReply,
  FastifyRequest
} from 'fastify';
import {
  
  Messages,
  StatusCode
} from '../constants';
import { Exception } from '../helpers';

export namespace AuthMiddleware {

  export interface CheckTokenResponse {
    data: {
      nick: string,
      message: string
    },
    iat: number,
    exp: number
  }


  export const verifyToken = async (
    req: FastifyRequest,
    res: FastifyReply,
    done: Function) => {
    try {
      const token = String(req.headers['x-access-token'])
      if (!token) throw new Exception.AppError(
        StatusCode.UNAUTHORIZED, [Messages.StatusMessage.NOT_FOUND]);

        const verify = jwt.verify(token, String(process.env.AUTH_SECRET)) as CheckTokenResponse

      if (verify) {
        return done()
      }

    } catch (error: any) {
      res.status(error.statusCode).send(error)
    }
  }
}
