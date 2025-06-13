import { BASE_STATS } from '../constants/stats';

export interface NovaPoints {
  on: number;   // Обычные очки
  son: number;  // Свободные очки
  lon: number;  // Легендарные очки
  current: number; // Текущие очки
  max: number;     // Максимальные очки
}

export type TemplateType = 'base' | 'equipment' | 'nova-player';

export interface CharacterTemplate {
  type: string;
  name: string;
  description: string;
  initialStats: CharacterStats;
  initialPoints?: NovaPoints;
}

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  magic: number;
  freePoints: number;
}

export type StatKey = keyof Omit<CharacterStats, 'freePoints'>;

export type StatMultipliers = Record<StatKey, number>;

export type AbilityRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythical' | 'divine' | 'phantasm' | 'oversystem' | 'extrasystem';

export interface Ability {
  id: string;
  name: string;
  description: string;
  rarity: AbilityRarity;
  level: number;
  maxLevel: number;
  confirmed?: boolean;
}

export interface EquipmentItem {
  name: string;
  description: string;
  image?: string;
  bonuses: StatMultipliers;
}

export type EquipmentSlot = 'head' | 'neck' | 'shoulders' | 'chest' | 'legs' | 'feet';

export interface CustomTab {
  id: string;
  title: string;
  content: string;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  stats: CharacterStats;
  statMultipliers: StatMultipliers;
  statBonuses: StatMultipliers;
  abilities: Ability[];
  equipment: Record<EquipmentSlot, EquipmentItem | null>;
  novaPoints: NovaPoints;
  description: string;
  customTabs: CustomTab[];
  lastModifiedAt: string;
  createdAt: string;
  templateType: string;
  mainImage?: string;
  freePoints: number;
}

export type Template = CharacterTemplate;

export const TEMPLATES: Record<string, CharacterTemplate> = {
  'nova-player': {
    type: 'nova-player',
    name: 'Нова-игрок',
    description: 'Шаблон для создания персонажа с нова-способностями',
    initialStats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      magic: 10,
      freePoints: 0
    },
    initialPoints: {
      on: 0,
      son: 0,
      lon: 0,
      current: 0,
      max: 0
    }
  }
};

export const DEFAULT_CHARACTER: Character = {
  id: crypto.randomUUID(),
  name: '',
  race: 'human',
  class: 'warrior',
  level: 1,
  description: '',
  stats: { ...BASE_STATS },
  abilities: [],
  freePoints: BASE_STATS.freePoints,
  createdAt: new Date().toISOString(),
  lastModifiedAt: new Date().toISOString(),
  templateType: 'base',
  customTabs: [],
  statMultipliers: {
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
    magic: 1
  },
  statBonuses: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    magic: 0
  },
  equipment: {
    head: null,
    neck: null,
    shoulders: null,
    chest: null,
    legs: null,
    feet: null
  },
  novaPoints: {
    on: 0,
    son: 0,
    lon: 0,
    current: 0,
    max: 0
  }
};