import jwt from 'jsonwebtoken';
import { prisma } from '../config';
import { Messages, StatusCode } from '../constants';
import { Exception, PasswordCrypt } from '../helpers';
import { GenericTypes } from '../types';
import { GenericValidation } from '../validations';

export namespace AuthService {
  export const login = async (
    payload: GenericTypes.login,
  ): Promise<{ auth: boolean; token: string }> => {
    const { email, nick, password } = GenericValidation.login.parse(payload);

    try {
      const user = await prisma.users.findFirst({
        where: {
          OR: [{ email }, { nick }],
        },
      });

      if (!user) throw new Exception.AppError(StatusCode.NOT_FOUND, [Messages.User.NOT_FOUND]);

      const passMatch = await PasswordCrypt.compare({
        pass: password,
        userP: user.password,
      });

      if (!passMatch || user.email != email) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['WRONG DATA']);
      }

      const data = {
        data: { nick, message: 'CURIOSO' },
      };

      const token = jwt.sign(data, String(process.env.AUTH_SECRET), {
        expiresIn: '1h',
      });

      return { auth: true, token };
    } catch (error: any) {
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages);
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
  export const logout = async () => {};
}
