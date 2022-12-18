import { ExternalRequest } from '../config';
import { StatusCode, Urls } from '../constants';
import { Exception } from './exception';

export namespace DnDRequest {
  // For Ability Score, Alignment, Background, Language, Proficiency, Skill and Class
  export const caracter = async (index: string, query: string) => {
    try {
      const response = await ExternalRequest.get(`${Urls.Api.dnd}/${index}/${query}`);
      return response.data;
    } catch (error: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };

  // For spellcasting, multiclassing, subclasses, spells, features, proficiencies, all level resources
  export const classResources = async (index: string, query: string) => {
    try {
      const response = await ExternalRequest.get(`${Urls.Api.dnd}/classes/${index}/${query}`);
      return response.data;
    } catch (error: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };

  // For specific level resource for a class and level, features and spells
  export const levelResources = async (index: string, query: string, resource?: string) => {
    try {
      const response = await ExternalRequest.get(
        `${Urls.Api.dnd}/classes/${index}/levels/${query}/${resource}`,
      );
      return response.data;
    } catch (error: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
}
