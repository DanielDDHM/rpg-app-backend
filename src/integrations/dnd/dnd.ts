import { StatusCode } from '../../constants';
import { Exception } from '../../helpers/exception';

import axios, { AxiosRequestConfig } from 'axios';
import { DnDEndpoints } from './dnd.types';

const dndService = axios.create({
  baseURL: process.env.DND_BASE_URL,
});

export const requestDnd = async (config: AxiosRequestConfig) => {
  try {
    const resp = await dndService(config);

    return {
      status: resp.status,
      data: resp.data,
      headers: resp.headers,
    };
  } catch (e: any) {
    console.error(`
      ----------------------------------------------------
      🚨 EXCEPTION ALERT 🚨
      An exception ocurred while trying to request DND Api.
      Route: ${dndService.defaults.baseURL}${config.url}
      Exception: ${e}
      ----------------------------------------------------
    `);
    if (e.isAxiosError) {
      return {
        errors: e,
      };
    }
    throw new Error(e);
  }
};

export namespace DnDRequest {
  // For Ability Score, Alignment, Background, Language, Proficiency, Skill and Class
  export const caracter = async (endpoint: DnDEndpoints.Caracter, query: string) => {
    try {
      return await requestDnd({
        method: 'GET',
        url: `/${endpoint}/${query}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.data);
    } catch (error: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };

  // For spellcasting, multiclassing, subclasses, spells, features, proficiencies, all level resources
  export const classResources = async (endpoint: DnDEndpoints.ClassResources, query: string) => {
    try {
      return await requestDnd({
        method: 'GET',
        url: `/classes/${endpoint}/${query}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.data);
    } catch (error: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };

  // For specific level resource for a class and level, features and spells
  export const levelResources = async (
    endpoint: DnDEndpoints.ClassLevels,
    query: string,
    resource?: string,
  ) => {
    try {
      return await requestDnd({
        method: 'GET',
        url: `/classes/${endpoint}/levels/${query}/${resource}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.data);
    } catch (error: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };

  // For specific level resource for a class and level, features and spells
  export const gameMechanics = async (endpoint: DnDEndpoints.Class, query: string) => {
    try {
      return await requestDnd({
        method: 'GET',
        url: `/classes/${endpoint}/${query}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.data);
    } catch (error: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [error]);
    }
  };
}
