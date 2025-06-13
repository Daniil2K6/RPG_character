import { StatMultipliers } from '../types/character';

export interface Class {
  name: string;
  description: string;
  multipliers: StatMultipliers;
}

export const CLASSES: Record<string, Class> = {
  warrior: {
    name: 'Воин',
    description: 'Мастер ближнего боя, специализирующийся на силе и выносливости.',
    multipliers: {
      strength: 1.5,
      dexterity: 1.2,
      constitution: 1.4,
      intelligence: 0.8,
      wisdom: 0.9,
      charisma: 0.9,
      magic: 0.7
    }
  },
  knight: {
    name: 'Рыцарь',
    description: 'Благородный воин, сочетающий боевое мастерство с лидерскими качествами.',
    multipliers: {
      strength: 1.3,
      dexterity: 1.1,
      constitution: 1.3,
      intelligence: 1.0,
      wisdom: 1.1,
      charisma: 1.3,
      magic: 0.8
    }
  },
  barbarian: {
    name: 'Варвар',
    description: 'Дикий воин, полагающийся на ярость и природную силу.',
    multipliers: {
      strength: 1.7,
      dexterity: 1.1,
      constitution: 1.5,
      intelligence: 0.6,
      wisdom: 0.7,
      charisma: 0.7,
      magic: 0.6
    }
  },
  berserker: {
    name: 'Берсерк',
    description: 'Неистовый боец, черпающий силу в боевом безумии.',
    multipliers: {
      strength: 1.8,
      dexterity: 1.2,
      constitution: 1.4,
      intelligence: 0.5,
      wisdom: 0.6,
      charisma: 0.6,
      magic: 0.5
    }
  },
  archer: {
    name: 'Лучник',
    description: 'Мастер дальнего боя, превосходно владеющий луком.',
    multipliers: {
      strength: 1.0,
      dexterity: 1.7,
      constitution: 1.0,
      intelligence: 1.1,
      wisdom: 1.2,
      charisma: 1.0,
      magic: 0.8
    }
  },
  thief: {
    name: 'Вор',
    description: 'Ловкий и хитрый специалист по скрытности и взлому.',
    multipliers: {
      strength: 0.9,
      dexterity: 1.8,
      constitution: 0.9,
      intelligence: 1.2,
      wisdom: 1.0,
      charisma: 1.1,
      magic: 0.7
    }
  },
  wizard: {
    name: 'Волшебник',
    description: 'Могущественный маг, изучающий тайны магии.',
    multipliers: {
      strength: 0.6,
      dexterity: 0.8,
      constitution: 0.7,
      intelligence: 1.7,
      wisdom: 1.4,
      charisma: 1.1,
      magic: 1.8
    }
  },
  priest: {
    name: 'Жрец',
    description: 'Служитель богов, владеющий божественной магией.',
    multipliers: {
      strength: 0.8,
      dexterity: 0.9,
      constitution: 1.0,
      intelligence: 1.2,
      wisdom: 1.6,
      charisma: 1.3,
      magic: 1.5
    }
  },
  paladin: {
    name: 'Паладин',
    description: 'Святой воин, сочетающий боевые навыки с божественной магией.',
    multipliers: {
      strength: 1.3,
      dexterity: 1.0,
      constitution: 1.2,
      intelligence: 1.1,
      wisdom: 1.3,
      charisma: 1.2,
      magic: 1.2
    }
  }
}; 