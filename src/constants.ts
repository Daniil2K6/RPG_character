import { AbilityRarity } from './types/character';

export const RARITY_ORDER: AbilityRarity[] = [
  'common',
  'rare',
  'epic',
  'legendary',
  'mythical',
  'divine',
  'phantasm',
  'oversystem',
  'extrasystem'
];

export const RARITY_COLORS: Record<AbilityRarity, string> = {
  common: '#ffffff', // Белый
  rare: '#0000ff', // Синий
  epic: '#800080', // Фиолетовый
  legendary: '#ffa500', // Оранжевый
  mythical: '#ff0000', // Красный
  divine: '#ffff00', // Желтый
  phantasm: '#00ffff', // Голубой
  oversystem: '#ff00ff', // Розовый
  extrasystem: '#00ff00' // Зеленый
};

export const RARITY_LABELS: Record<AbilityRarity, string> = {
  common: 'Обычный',
  rare: 'Редкий',
  epic: 'Эпический',
  legendary: 'Легендарный',
  mythical: 'Мифический',
  divine: 'Божественный',
  phantasm: 'Фантазм',
  oversystem: 'Надсистемный',
  extrasystem: 'Внесистемный'
}; 