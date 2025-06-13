import { Race } from '../types/races';

export const RACES: Record<string, Race> = {
  human: {
    name: 'Человек',
    multipliers: {
      strength: 1.0,
      dexterity: 1.0,
      constitution: 1.0,
      intelligence: 1.0,
      wisdom: 1.0,
      charisma: 1.0,
      magic: 1.0
    }
  },
  elf: {
    name: 'Эльф',
    multipliers: {
      strength: 0.8,
      dexterity: 1.2,
      constitution: 0.9,
      intelligence: 1.1,
      wisdom: 1.1,
      charisma: 1.1,
      magic: 1.2
    }
  },
  dwarf: {
    name: 'Дварф',
    multipliers: {
      strength: 1.5,
      dexterity: 0.8,
      constitution: 1.4,
      intelligence: 1.0,
      wisdom: 1.2,
      charisma: 0.6,
      magic: 1.1
    }
  },
  gnome: {
    name: 'Гном',
    multipliers: {
      strength: 1.4,
      dexterity: 0.9,
      constitution: 1.6,
      intelligence: 1.0,
      wisdom: 1.1,
      charisma: 0.5,
      magic: 0.9
    }
  },
  orc: {
    name: 'Орк',
    multipliers: {
      strength: 1.2,
      dexterity: 0.9,
      constitution: 1.1,
      intelligence: 0.8,
      wisdom: 0.8,
      charisma: 0.8,
      magic: 0.8
    }
  },
  dragonborn: {
    name: 'Драконид',
    multipliers: {
      strength: 1.2,
      dexterity: 1.0,
      constitution: 1.1,
      intelligence: 1.0,
      wisdom: 0.9,
      charisma: 1.1,
      magic: 1.2
    }
  },
  goblin: {
    name: 'Гоблин',
    multipliers: {
      strength: 0.7,
      dexterity: 1.3,
      constitution: 0.8,
      intelligence: 0.9,
      wisdom: 0.8,
      charisma: 0.6,
      magic: 0.7
    }
  }
}; 