import type { CharacterTemplate } from '../../character';

export const BASE_TEMPLATE: CharacterTemplate = {
  type: 'base',
  name: 'Базовый',
  description: 'Базовый шаблон персонажа',
  initialStats: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    magic: 10,
    freePoints: 5
  }
};

export default BASE_TEMPLATE; 