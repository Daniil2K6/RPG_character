import { CharacterStats } from '../types/character';

export const STAT_NAMES: Record<keyof CharacterStats, string> = {
  strength: 'Сила',
  dexterity: 'Ловкость',
  constitution: 'Телосложение',
  intelligence: 'Интеллект',
  wisdom: 'Мудрость',
  charisma: 'Харизма',
  magic: 'Магия',
  freePoints: 'Свободные очки'
};

// Единственный источник истины для базовых характеристик
export const BASE_STATS: CharacterStats = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
  magic: 10,
  freePoints: 5
} as const; 