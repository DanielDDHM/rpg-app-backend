export namespace ModelType {
  export namespace Char {

    export type about = {
      class: string,
      level: number,
      race: string,
      tendency: string,
      story: string,
      initiative: number,
      distance: number,
      appareance: string,
      others: JSON
    }

    export type slots = {
      level0: JSON,
      level1: JSON,
      level2: JSON,
      level3: JSON,
      level4: JSON,
      level5: JSON,
      level6: JSON,
      level7: JSON,
      level8: JSON,
      level9: JSON,
    }

    export type atributes = {
      force: number,
      dexterity: number,
      constitution: number,
      intelligence: number,
      wisdom: number,
      charisma: number,
    }

    export type status = {
      armor: number,
      proeficiency: number,
      life: number
    }

    export type magic = {
      name: string,
      castingtime: string,
      range: number,
      component: JSON,
      duration: string
      description: string,
      damage: string,
      spellist: JSON
    }

    export type item = {
      name: string,
      value: string,
      damage: string,
      weight: string,
      properties: JSON
    }
  }
}