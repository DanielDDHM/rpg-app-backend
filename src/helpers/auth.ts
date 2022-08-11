import { StatusCode } from "../constants"
import { Exception } from "./exception"
import bcrypt from 'bcryptjs';

export namespace PasswordCrypt{

  export interface Crypt {
    pass: string,
    salt: number
  }

  export interface Compare {
    pass: string,
    userP: string
  }

  export const crypt = async (params: Crypt): Promise<string> => {
    try {
      const {pass, salt} = params
      const encryptPass = await bcrypt.hash(String(pass), salt)
      return encryptPass
    } catch (error) {
      throw new Exception.AppError(StatusCode.FAILED_DEPENDENCY, ['ERROR ON CRYPT PASSWORD'])
    }
  }

  export const compare = async (params: Compare) => {
    try {
      const {pass, userP} = params
      const comparePass = await bcrypt.compare(pass, String(userP))
      return comparePass
    } catch (error: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [String(error.message)])
    }
  }


}