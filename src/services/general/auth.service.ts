import { prisma } from "../../config";
import { Messages, StatusCode } from "../../constants";
import { Exception } from "../../helpers";
import { GenericValidation } from "../../validations";
import jwt from "jsonwebtoken";
import { PasswordCrypt } from "../../helpers/auth";
import { GenericTypes } from "../../types";

export namespace AuthService {
  export const login = async (payload: GenericTypes.login):
   Promise<{auth: boolean, token: string}> => {
    const { email, nick, password } = GenericValidation.login.parse(payload)

    try {
      const user = await prisma.users.findFirst({
        where: {
          OR: [
            { email },
            { nick }
          ]
        }
      })

      if (!user) throw new Exception.AppError(StatusCode.NOT_FOUND, [Messages.User.NOT_FOUND]);

      const passMatch = await PasswordCrypt.compare({pass: password, userP: user.password});

      if (!passMatch || user.email != email) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['WRONG DATA']);
      }

      const data = {
        data: { nick, message: 'CURIOSO' },
      }

      const token = jwt.sign(data, String(process.env.AUTH_SECRET), { expiresIn: '1h' })

      return { auth: true, token };

    } catch (error: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }
  export const logout = async () => {

  }
}