import { StatMultipliers } from './character';

export interface Race {
  name: string;
  multipliers: StatMultipliers;
}

export interface Class {
  name: string;
  description: string;
  multipliers: StatMultipliers;
}

export const RACES = {
  human: {
    name: 'Человек',
    multipliers: {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charisma: 1,
      magic: 1
    }
  },
  elf: {
    name: 'Эльф',
    multipliers: {
      strength: 0.8,
      dexterity: 1.2,
      constitution: 0.8,
      intelligence: 1.2,
      wisdom: 1,
      charisma: 1,
      magic: 1.2
    }
  },
  dwarf: {
    name: 'Дварф',
    multipliers: {
      strength: 1.2,
      dexterity: 0.8,
      constitution: 1.2,
      intelligence: 1,
      wisdom: 1,
      charisma: 0.8,
      magic: 0.8
    }
  }
} as const;

export const CLASSES = {
  warrior: {
    name: 'Воин',
    description: 'Мастер ближнего боя',
    multipliers: {
      strength: 1.2,
      dexterity: 1,
      constitution: 1.2,
      intelligence: 0.8,
      wisdom: 0.8,
      charisma: 0.8,
      magic: 0.8
    }
  },
  mage: {
    name: 'Маг',
    description: 'Мастер магии',
    multipliers: {
      strength: 0.8,
      dexterity: 0.8,
      constitution: 0.8,
      intelligence: 1.2,
      wisdom: 1.2,
      charisma: 1,
      magic: 1.2
    }
  },
  rogue: {
    name: 'Разбойник',
    description: 'Мастер скрытности',
    multipliers: {
      strength: 0.8,
      dexterity: 1.2,
      constitution: 0.8,
      intelligence: 1,
      wisdom: 1,
      charisma: 1.2,
      magic: 0.8
    }
  }
} as const;

export type RaceType = keyof typeof RACES;
export type ClassType = keyof typeof CLASSES; 