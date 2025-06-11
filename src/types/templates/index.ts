import type { TemplateType, CharacterTemplate } from '../character';
import { baseTemplate } from './base';
import { novaPlayerTemplate } from './nova-player';

export const TEMPLATES: Record<TemplateType, CharacterTemplate> = {
  base: baseTemplate,
  'nova-player': novaPlayerTemplate,
}; 