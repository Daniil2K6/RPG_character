import type { CharacterTemplate } from '../../../types/character';

export const novaPlayerTemplate: CharacterTemplate = {
  type: 'nova-player',
  name: 'Nova Игрок',
  description: 'Шаблон для создания персонажа в системе Nova',
  initialStats: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    magic: 10,
    freePoints: 5
  },
  initialPoints: {
    on: 0,
    son: 1,
    lon: 0
  }
};

export enum AbilityRank {
  COMMON = 'Обычный',
  RARE = 'Редкий',
  EPIC = 'Эпический',
  LEGENDARY = 'Легендарный',
}

export const AbilityRankColor: Record<AbilityRank, string> = {
  [AbilityRank.COMMON]: '#b0b0b0',      // Серый
  [AbilityRank.RARE]: '#2196f3',        // Синий
  [AbilityRank.EPIC]: '#9c27b0',        // Фиолетовый
  [AbilityRank.LEGENDARY]: '#ffd700',   // Золотой
};

export default novaPlayerTemplate; 