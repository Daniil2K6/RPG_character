export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export type TemplateType = 'base' | 'nova-player';

export type AbilityRarity = 
  | 'common' 
  | 'uncommon' 
  | 'rare' 
  | 'epic' 
  | 'legendary' 
  | 'mythical' 
  | 'divine' 
  | 'phantasm' 
  | 'oversystem' 
  | 'extrasystem';

export interface CustomTab {
  id: string;
  title: string;
  content: string;
}

export interface NovaPoints {
  on: number; // Обычные очки навыков
  son: number; // Свободные очки навыков
  lon: number; // Легендарные очки навыков
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  rarity: AbilityRarity;
  isExpanded?: boolean;
}

export interface CharacterTemplate {
  id: string;
  type: TemplateType;
  name: string;
  description: string;
  defaultStats?: CharacterStats;
  initialPoints?: NovaPoints;
  initialFreePoints?: number;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  level: number;
  imageUrl: string;
  description: string;
  stats?: CharacterStats;
  novaPoints?: NovaPoints;
  templateType: TemplateType;
  createdAt: string;
  lastModifiedAt: string;
  freePoints?: number;
  abilities: Ability[];
  customTabs: CustomTab[];
}

// Предопределенные шаблоны
export const TEMPLATES: Record<TemplateType, CharacterTemplate> = {
  base: {
    id: 'base',
    type: 'base',
    name: 'Базовый',
    description: 'Базовый шаблон для создания персонажа в любой системе',
    defaultStats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    initialFreePoints: 10,
  },
  'nova-player': {
    id: 'nova-player',
    type: 'nova-player',
    name: 'Nova Игрок',
    description: 'Шаблон для создания игрового персонажа в системе Nova',
    initialPoints: {
      on: 0,
      son: 1,
      lon: 0,
    }
  },
};

export const DEFAULT_CHARACTER: Character = {
  id: crypto.randomUUID(),
  name: 'Новый персонаж',
  race: '',
  level: 1,
  description: '',
  imageUrl: '/placeholder.png',
  templateType: 'nova-player',
  customTabs: [
    {
      id: crypto.randomUUID(),
      title: 'Задания',
      content: ''
    }
  ],
  abilities: [],
  novaPoints: {
    son: 1,
    on: 0,
    lon: 0
  },
  createdAt: new Date().toISOString(),
  lastModifiedAt: new Date().toISOString(),
}; 