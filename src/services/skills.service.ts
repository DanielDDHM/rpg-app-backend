import { Character } from "@prisma/client"
import { prisma } from "../config"
import {  StatusCode } from "../constants"
import { Exception } from "../helpers"
import { SkillsType } from "../types"
import { SkillsValidation } from "../validations"
import { v4 as uuid } from "uuid"
import { CharacterService } from "./caracter.service"

export namespace SkillsService {
  export const get = async (
    params: SkillsType.get): Promise<Character["magics"]> => {
    try {
      const { id, char } = SkillsValidation.get.parse(params)

      const {characters} = await CharacterService.get({id: char})

      const skill = id ? [characters[0]?.magics.find(magic => magic?.id! === id)!] : characters[0]?.magics!

      if(skill.length === 0){
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['SKILL NOT FOUND'])
      }

      return skill
    } catch (error: any) {
      if(error instanceof Exception.AppError){
        throw new Exception.AppError(
          error?.statusCode,
          error?.messages
        )
      }

      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [error])
    }
  }
  export const add = async (
    params: SkillsType.add): Promise<Character["magics"]> => {
    try {
      const { char,
        damage,
        name,
        castingtime,
        component,
        description,
        duration,
        range } = SkillsValidation.add.parse(params)

      const skill = {
        id: uuid(),
        damage,
        name,
        castingtime,
        component,
        description,
        duration,
        range
      }

      const charUpdated = await prisma.character.update({
        where: {
          id: char
        },
        data: {
          magics: { push: skill }
        }
      })

      return charUpdated.magics
    } catch (error: any) {
      if(error instanceof Exception.AppError){
        throw new Exception.AppError(
          error?.statusCode,
          error?.messages
        )
      }

      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [error])
    }
  }
  export const edit = async (
    params: SkillsType.edit): Promise<Character["magics"]> => {
    try {
      const {
        id,
        char,
        damage,
        name,
        castingtime,
        component,
        description,
        duration,
        range } = SkillsValidation.edit.parse(params)

      const skill = {
        damage,
        name,
        castingtime,
        component,
        description,
        duration,
        range
      }

      const {characters} = await CharacterService.get({id: char})

      characters[0]!.magics[characters[0]!.magics.findIndex(skill => skill?.id! === id)] = skill

      const charUpdated = await prisma.character.update({
        where: {
          id: char,
        },
        data: { magics: characters[0]?.magics }
      })

      return charUpdated.magics

    } catch (error: any) {
      if(error instanceof Exception.AppError){
        throw new Exception.AppError(
          error?.statusCode,
          error?.messages
        )
      }

      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [error])
    }
  }
  export const remove = async (params: SkillsType.remove) => {
    try {
      const { id, char } = SkillsValidation.remove.parse(params)

      const {characters} = await CharacterService.get({id: char})

      characters[0]!.magics.splice(characters[0]!.magics.findIndex(skills => skills?.id! === id), 1)

      const charUpdated = await prisma.character.update({
        where: {
          id: char,
        },
        data: { magics: characters[0]?.magics }
      })

      return charUpdated.magics
    } catch (error: any) {
      if(error instanceof Exception.AppError){
        throw new Exception.AppError(
          error?.statusCode,
          error?.messages
        )
      }

      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [error])
    }
  }
}