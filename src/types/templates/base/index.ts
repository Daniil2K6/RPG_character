import type { CharacterTemplate } from '../../character';

export const baseTemplate: CharacterTemplate = {
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
}; 