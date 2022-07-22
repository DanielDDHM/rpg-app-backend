import 'dotenv/config';

// import jwt from 'jsonwebtoken';
import {
  FastifyReply,
  FastifyRequest
} from 'fastify';
import {
  Messages,
  StatusCode
} from '../constants';
import { Exception } from '../helpers';

export namespace AuthUserMiddleware {
  export const verifyToken = async (
    req: FastifyRequest,
    res: FastifyReply) => {
    try {
      const token = String(req.headers['x-access-token'])
      if (!token) throw new Exception.AppError(
        StatusCode.UNAUTHORIZED, [Messages.StatusMessage.NOT_FOUND]);

    } catch (error: any) {
      res.status(error.statusCode).send(error)
    }
  }
}
