import { Box, FormControl, InputLabel, Select, MenuItem, Typography, IconButton } from '@mui/material';
import { Character } from '../types/character';
import { RACES } from '../constants/races';
import { CLASSES } from '../constants/classes';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface RaceAndClassSelectorProps {
  character: Character;
  onCharacterChange: (character: Character) => void;
  readonly?: boolean;
}

export const RaceAndClassSelector = ({
  character,
  onCharacterChange,
  readonly = false
}: RaceAndClassSelectorProps) => {
  const handleRaceChange = (race: string) => {
    if (RACES[race]) {
    onCharacterChange({
      ...character,
      race,
      lastModifiedAt: new Date().toISOString()
    });
    }
  };

  const handleClassChange = (characterClass: string) => {
    if (CLASSES[characterClass]) {
      onCharacterChange({
        ...character,
        class: characterClass,
        statMultipliers: CLASSES[characterClass].multipliers,
        lastModifiedAt: new Date().toISOString()
      });
    }
  };

  const handleLevelChange = (increment: number) => {
    if (readonly) return;

    // Проверяем, не опустится ли уровень ниже 1
    const newLevel = Math.max(1, character.level + increment);
    if (newLevel === character.level) return;

    // При повышении уровня даём +1 свободное очко
    // При понижении уровня отнимаем 1 свободное очко
    const newFreePoints = Math.max(0, character.freePoints + increment);

    onCharacterChange({
      ...character,
      level: newLevel,
      freePoints: newFreePoints,
      lastModifiedAt: new Date().toISOString()
    });
  };

  const renderMultipliers = (multipliers: Record<string, number>) => {
    const statNames: Record<string, string> = {
      strength: 'Сила',
      dexterity: 'Ловкость',
      constitution: 'Телосложение',
      intelligence: 'Интеллект',
      wisdom: 'Мудрость',
      charisma: 'Харизма',
      magic: 'Магия'
    };

    return (
      <Box sx={{ mt: 1 }}>
        {Object.entries(multipliers).map(([stat, value]) => (
          <Typography key={stat} variant="body2" sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            color: value < 1 ? 'error.main' : value > 1 ? 'success.main' : 'text.secondary',
            fontSize: '0.75rem'
          }}>
            <span>{statNames[stat]}:</span>
            <span>×{value.toFixed(1)}</span>
          </Typography>
        ))}
      </Box>
    );
  };

  // Проверяем существование расы и класса в константах
  const validRace = character.race && RACES[character.race];
  const validClass = character.class && CLASSES[character.class];

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <Box sx={{ flex: 1 }}>
        <FormControl fullWidth>
          <InputLabel>Раса</InputLabel>
          <Select
              value={validRace ? character.race : ''}
            label="Раса"
              onChange={(e) => handleRaceChange(e.target.value)}
            disabled={readonly}
          >
            {Object.entries(RACES).map(([key, race]) => (
              <MenuItem key={key} value={key}>{race.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
          {validRace && renderMultipliers(RACES[character.race].multipliers)}
      </Box>

      <Box sx={{ flex: 1 }}>
        <FormControl fullWidth>
          <InputLabel>Класс</InputLabel>
          <Select
              value={validClass ? character.class : ''}
            label="Класс"
              onChange={(e) => handleClassChange(e.target.value)}
            disabled={readonly}
          >
            {Object.entries(CLASSES).map(([key, characterClass]) => (
              <MenuItem key={key} value={key}>{characterClass.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
          {validClass && renderMultipliers(CLASSES[character.class].multipliers)}
        </Box>
      </Box>

      {/* Управление уровнем */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 1,
        p: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 1
      }}>
        <Typography sx={{ mr: 2 }}>Уровень:</Typography>
        
        {/* Кнопки -10 и -1 */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={() => handleLevelChange(-10)}
            disabled={readonly || character.level <= 10}
            sx={{ 
              color: '#ec407a',
              '&:hover': { 
                backgroundColor: 'rgba(236, 64, 122, 0.1)'
              }
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>-10</Typography>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleLevelChange(-1)}
            disabled={readonly || character.level <= 1}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography sx={{ 
          minWidth: '40px', 
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          {character.level}
        </Typography>

        {/* Кнопки +1 и +10 */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={() => handleLevelChange(1)}
            disabled={readonly}
          >
            <AddIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleLevelChange(10)}
            disabled={readonly}
            sx={{ 
              color: '#8bc34a',
              '&:hover': { 
                backgroundColor: 'rgba(139, 195, 74, 0.1)'
              }
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>+10</Typography>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}; 