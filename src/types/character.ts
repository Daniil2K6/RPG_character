export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export type TemplateType = 'base' | 'nova';

export interface CustomTab {
  id: string;
  title: string;
  content: string;
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  isExpanded?: boolean;
}

export interface CharacterTemplate {
  id: string;
  type: TemplateType;
  name: string;
  description: string;
  defaultStats: CharacterStats;
  initialFreePoints: number;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  level: number;
  imageUrl: string;
  description: string;
  stats: CharacterStats;
  templateType: TemplateType;
  createdAt: string;
  lastModifiedAt: string;
  freePoints: number;
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
  nova: {
    id: 'nova',
    type: 'nova',
    name: 'Nova',
    description: 'Шаблон для создания персонажа в системе Nova',
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
}; 