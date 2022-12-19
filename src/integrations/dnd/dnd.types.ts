export namespace DnDEndpoints {
  export enum Caracter {
    abilityScores = 'ability-scores',
    alignments = 'alignments',
    backgrounds = 'backgrounds',
    languages = 'languages',
    proficiencies = 'proficiencies',
    skills = 'skills',
  }

  export enum Class {
    classes = 'classes',
    spellcasting = 'spellcasting',
    multiClassing = 'multi-classing',
  }

  export enum ClassResources {
    subclasses = 'subclasses',
    spells = 'spells',
    features = 'features',
    proficiencies = 'profeciencies',
  }

  export enum ClassLevels {
    levels = 'levels',
  }
}

export interface DnDQuerys {
  endpoint: DnDEndpoints.Caracter &
    DnDEndpoints.ClassResources &
    DnDEndpoints.ClassLevels &
    DnDEndpoints.Class;
  query: string;
}
