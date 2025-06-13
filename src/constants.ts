import { AbilityRarity } from './types/character';

export const RARITY_LABELS: Record<AbilityRarity, string> = {
  common: 'Обычная',
  rare: 'Редкая',
  epic: 'Эпическая',
  legendary: 'Легендарная',
  mythical: 'Мифическая',
  divine: 'Божественная',
  phantasm: 'Фантазм',
  oversystem: 'Внесистемная',
  extrasystem: 'Экстрасистемная'
};

export const RARITY_COLORS: Record<AbilityRarity, string> = {
  common: '#cccccc',
  rare: '#1a75ff',
  epic: '#cc00ff',
  legendary: '#ffd700',
  mythical: '#ff4d4d',
  divine: '#ff8c1a',
  phantasm: '#00cc99',
  oversystem: '#ff1a1a',
  extrasystem: '#000000'
};

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