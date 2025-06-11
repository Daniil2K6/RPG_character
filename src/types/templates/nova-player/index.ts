import type { CharacterTemplate } from '../../character';

export const novaPlayerTemplate: CharacterTemplate = {
  id: 'nova-player',
  type: 'nova-player',
  name: 'Nova Игрок',
  description: 'Шаблон для создания игрового персонажа в системе Nova',
  initialPoints: {
    on: 0,
    son: 1,
    lon: 0,
  }
}; 