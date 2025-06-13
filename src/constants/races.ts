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
      intelligence: 1.4,
      wisdom: 1.4,
      charisma: 1.5,
      magic: 2.1 // сильная магия
    }
  },
  dwarf: {
    name: 'Дварф',
    multipliers: {
      strength: 1.5,
      dexterity: 0.8,
      constitution: 1.4, // очень живучие
      intelligence: 1.1,
      wisdom: 1.3,
      charisma: 0.7,
      magic: 1.3
    }
  },
  gnome: {
    name: 'Гном',
    multipliers: {
      strength: 1.4,
      dexterity: 1.3,
      constitution: 1.6,
      intelligence: 1.0,
      wisdom: 1.2,
      charisma: 0.5,
      magic: 1.1
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
      strength: 0.4,
      dexterity: 1.0, 
      constitution: 0.5, 
      intelligence: 0.4,
      wisdom: 5.0,
      charisma: 0.1,
      magic: 0.9
    }
  },
  demon_power: {
    name: 'Демон Силы',
    multipliers: {
      strength: 2.2,
      dexterity: 0.7,
      constitution: 1.8,
      intelligence: 0.7,
      wisdom: 0.5,
      charisma: 0.7,
      magic: 1.2
    }
  },
  demon_lust: {
    name: 'Демон Похоти',
    multipliers: {
      strength: 0.4,
      dexterity: 1.3,
      constitution: 0.3,
      intelligence: 1.0,
      wisdom: 0.7,
      charisma: 3.0, // супер-обаяние
      magic: 2.0
    }
  },
  demon_fire: {
    name: 'Демон Огня',
    multipliers: {
      strength: 0.8,
      dexterity: 1.1,
      constitution: 1.0,
      intelligence: 1.0,
      wisdom: 0.8,
      charisma: 1.0,
      magic: 2.0 // сильная магия
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
  },
  vampire: {
    name: 'Вампир',
    multipliers: {
      strength: 0.6,
      dexterity: 1.5,
      constitution: 0.7,
      intelligence: 1.4,
      wisdom: 1.1,
      charisma: 2.0,
      magic: 1.7
    }
  },
  dark_elf: {
    name: 'Тёмный эльф',
    multipliers: {
      strength: 0.4,
      dexterity: 1.5,
      constitution: 0.3,
      intelligence: 1.6,
      wisdom: 1.2,
      charisma: 1.3,
      magic: 2.3
    }
  },
  gnoll: {
    name: 'Гнолл',
    multipliers: {
      strength: 1.7,
      dexterity: 1.1,
      constitution: 1.5,
      intelligence: 0.5,
      wisdom: 0.7,
      charisma: 0.6,
      magic: 0.4
    }
  },
  beastfolk: {
    name: 'Зверолид',
    multipliers: {
      strength: 1.3,
      dexterity: 1.4,
      constitution: 1.2,
      intelligence: 0.8,
      wisdom: 1.0,
      charisma: 0.9,
      magic: 0.7
    }
  },
  arachnid: {
    name: 'Арахнид',
    multipliers: {
      strength: 0.8,
      dexterity: 1.7,
      constitution: 1.0,
      intelligence: 1.3,
      wisdom: 1.0,
      charisma: 0.5,
      magic: 1.5
    }
  }
};