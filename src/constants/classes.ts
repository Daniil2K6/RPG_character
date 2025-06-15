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
      wisdom: 0.5,
      charisma: 0.9,
      magic: 1.0
    }
  },
  knight: {
    name: 'Рыцарь',
    description: 'Благородный воин, сочетающий боевое мастерство с лидерскими качествами.',
    multipliers: {
      strength: 1.2,
      dexterity: 1.0,
      constitution: 1.5,
      intelligence: 0.9,
      wisdom: 0.7,
      charisma: 1.3,
      magic: 1.2
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
      strength: 0.6,
      dexterity: 1.6,
      constitution: 0.8,
      intelligence: 1.0,
      wisdom: 1.0,
      charisma: 1.1,
      magic: 1.2
    }
  },
  thief: {
    name: 'Вор',
    description: 'Ловкий и хитрый специалист по скрытности и взлому.',
    multipliers: {
      strength: 0.7,
      dexterity: 1.6,
      constitution: 0.9,
      intelligence: 0.9,
      wisdom: 0.9,
      charisma: 1.0,
      magic: 0.8
    }
  },
  wizard: {
    name: 'Волшебник',
    description: 'Могущественный маг, изучающий тайны магии.',
    multipliers: {
      strength: 0.5,
      dexterity: 1.0,
      constitution: 0.7,
      intelligence: 1.2,
      wisdom: 1.3,
      charisma: 1.1,
      magic: 1.7
    }
  },
  priest: {
    name: 'Жрец',
    description: 'Служитель богов, владеющий божественной магией.',
    multipliers: {
      strength: 0.8,
      dexterity: 0.9,
      constitution: 1.0,
      intelligence: 1.0,
      wisdom: 1.1,
      charisma: 1.5,
      magic: 1.4
    }
  },
  paladin: {
    name: 'Паладин',
    description: 'Святой воин, сочетающий боевые навыки с божественной магией.',
    multipliers: {
      strength: 1.4,
      dexterity: 0.9,
      constitution: 1.5,
      intelligence: 0.7,
      wisdom: 1.1,
      charisma: 1.4,
      magic: 1.2
    }
  },
  bard: {
    name: 'Бард',
    description: 'Очаровательный музыкант, вдохновляющий союзников и владеющий магией.',
    multipliers: {
      strength: 0.7,
      dexterity: 1.2,
      constitution: 0.9,
      intelligence: 0.9,
      wisdom: 1.0,
      charisma: 2.0,
      magic: 1.3
    }
  },
  cultist: {
    name: 'Культист',
    description: 'Тёмный служитель, жертвующий телом ради магической мощи.',
    multipliers: {
      strength: 0.3,
      dexterity: 0.7,
      constitution: 0.5,
      intelligence: 1.4,
      wisdom: 1.7,
      charisma: 1.0,
      magic: 2.3
    }
  },
  mage: {
    name: 'Маг',
    description: 'Учёный маг, полагающийся на знания, а не на врождённый дар.',
    multipliers: {
      strength: 0.6,
      dexterity: 0.8,
      constitution: 0.7,
      intelligence: 2.0,
      wisdom: 1.8,
      charisma: 1.0,
      magic: 0.9
    }
  },
  universalist: {
    name: 'Универсал',
    description: 'Баланс во всём — ни слабых, ни сильных сторон.',
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
  seeker: {
    name: 'Искатель',
    description: 'Слаб физически, но умен и мудр.',
    multipliers: {
      strength: 0.7,
      dexterity: 0.8,
      constitution: 0.8,
      intelligence: 2.0,
      wisdom: 1.7,
      charisma: 1.1,
      magic: 0.8
    }
  },
  mad_cursed: {
    name: 'Проклятый безумием',
    description: 'благословение и проклятье знаниями.',
    multipliers: {
      strength: 0.1,
      dexterity: 0.3,
      constitution: 0.2,
      intelligence: 3.0,
      wisdom: 3.0,
      charisma: 0.1,
      magic: 0.8
    }
  },
  yang_adept: {
    name: 'Адепт Янь',
    description: 'Слаб во всём, кроме силы и телосложения.',
    multipliers: {
      strength: 3.0,
      dexterity: 0.3,
      constitution: 3.0,
      intelligence: 0.3,
      wisdom: 0.3,
      charisma: 0.3,
      magic: 0.3
    }
  },
  yin_adept: {
    name: 'Адепт Инь',
    description: 'Слаб во всём, кроме магии и харизмы.',
    multipliers: {
      strength: 0.3,
      dexterity: 0.3,
      constitution: 0.3,
      intelligence: 0.3,
      wisdom: 0.3,
      charisma: 3.0,
      magic: 3.0
    }
  }
};