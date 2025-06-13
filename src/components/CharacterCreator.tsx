import { Character, TemplateType } from '../types/character';
import { TEMPLATES } from '../types/templates';
import { BASE_STATS } from '../constants/stats';

export const createEmptyCharacter = (templateType: TemplateType = 'base'): Character => {
  const template = TEMPLATES[templateType];

  return {
    id: crypto.randomUUID(),
  name: '',
    race: 'human',
    class: 'warrior',
  level: 1,
    stats: template?.initialStats || {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    magic: 10,
      freePoints: BASE_STATS.freePoints
  },
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
  abilities: [],
  equipment: {},
    novaPoints: template?.initialPoints || {
    current: 0,
    max: 0
  },
  description: '',
    createdAt: new Date().toISOString(),
    lastModifiedAt: new Date().toISOString(),
    templateType: templateType,
    freePoints: template?.initialStats?.freePoints || BASE_STATS.freePoints
  };
}; 