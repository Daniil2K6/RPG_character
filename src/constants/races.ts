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
      strength: 0.2, // очень слабые физически
      dexterity: 1.3,
      constitution: 0.4, // очень хрупкие
      intelligence: 1.7,
      wisdom: 1.4,
      charisma: 1.5,
      magic: 2.0 // сильная магия
    }
  },
  dwarf: {
    name: 'Дварф',
    multipliers: {
      strength: 1.8,
      dexterity: 0.7,
      constitution: 2.0, // очень живучие
      intelligence: 0.9,
      wisdom: 1.3,
      charisma: 0.5,
      magic: 0.8
    }
  },
  gnome: {
    name: 'Гном',
    multipliers: {
      strength: 1.4,
      dexterity: 1.1,
      constitution: 1.5,
      intelligence: 1.0,
      wisdom: 1.2,
      charisma: 0.7,
      magic: 1.0
    }
  },
  orc: {
    name: 'Орк',
    multipliers: {
      strength: 1.8, // очень сильные
      dexterity: 0.8,
      constitution: 1.5,
      intelligence: 0.6,
      wisdom: 0.6,
      charisma: 0.5,
      magic: 0.5
    }
  },
  dragonborn: {
    name: 'Драконид',
    multipliers: {
      strength: 1.3,
      dexterity: 0.8,
      constitution: 1.3,
      intelligence: 1.1,
      wisdom: 1.0,
      charisma: 0.7,
      magic: 1.5
    }
  },
  goblin: {
    name: 'Гоблин',
    multipliers: {
      strength: 0.3, // мем-дебаф
      dexterity: 1.7, // ловкие
      constitution: 0.3, // мем-дебаф
      intelligence: 0.5, // мем-дебаф
      wisdom: 5.0, // мем-бонус
      charisma: 0.2, // мем-дебаф
      magic: 0.2 // мем-дебаф
    }
  },
  demon_power: {
    name: 'Демон Силы',
    multipliers: {
      strength: 3.0,
      dexterity: 1.0,
      constitution: 2.0,
      intelligence: 0.8,
      wisdom: 0.7,
      charisma: 1.0,
      magic: 1.2
    }
  },
  demon_lust: {
    name: 'Демон Похоти',
    multipliers: {
      strength: 0.8,
      dexterity: 1.2,
      constitution: 0.9,
      intelligence: 1.3,
      wisdom: 0.8,
      charisma: 3.0, // супер-обаяние
      magic: 1.5
    }
  },
  demon_fire: {
    name: 'Демон Огня',
    multipliers: {
      strength: 1.3,
      dexterity: 1.1,
      constitution: 1.1,
      intelligence: 1.0,
      wisdom: 0.9,
      charisma: 1.0,
      magic: 2.5 // сильная магия
    }
  },
  angel: {
    name: 'Ангел',
    multipliers: {
      strength: 1.2,
      dexterity: 1.2,
      constitution: 1.2,
      intelligence: 1.5,
      wisdom: 2.0,
      charisma: 2.0,
      magic: 2.0
    }
  }
};