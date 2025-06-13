import { CharacterTemplate } from '../character';
import { novaPlayerTemplate } from './nova-player';
import { BASE_TEMPLATE } from './base';
import { EQUIPMENT_TEMPLATE } from './equipment';

export const TEMPLATES: Record<string, CharacterTemplate> = {
  'base': BASE_TEMPLATE,
  'equipment': EQUIPMENT_TEMPLATE,
  'nova-player': novaPlayerTemplate
};

export default TEMPLATES; 