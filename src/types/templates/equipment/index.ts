import { CharacterTemplate } from '../../character';

export const EQUIPMENT_TEMPLATE: CharacterTemplate = {
  type: 'equipment',
  name: 'Снаряжение',
  description: 'Шаблон с базовым снаряжением',
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