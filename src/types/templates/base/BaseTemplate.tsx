import { Box, Paper, Typography } from '@mui/material';
import { Character } from '../../../types/character';
import { CharacterStatsComponent } from '../../../components/CharacterStats';
import { RaceAndClassSelector } from '../../../components/RaceAndClassSelector';
import { BaseAbilities } from '../../../components/BaseAbilities';

interface BaseTemplateProps {
  character: Character;
  onCharacterChange: (character: Character) => void;
  readonly?: boolean;
}

export const BaseTemplate = ({
  character,
  onCharacterChange,
  readonly = false,
}: BaseTemplateProps) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      {/* Основная информация */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Основная информация
        </Typography>
        <RaceAndClassSelector
          character={character}
          onCharacterChange={onCharacterChange}
          readonly={readonly}
        />
      </Paper>

      {/* Характеристики */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Характеристики
        </Typography>
        <CharacterStatsComponent
          character={character}
          onCharacterChange={onCharacterChange}
          readonly={readonly}
        />
      </Paper>

      {/* Способности */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Способности
        </Typography>
        <BaseAbilities
          character={character}
          onCharacterChange={onCharacterChange}
          readonly={readonly}
        />
      </Paper>
    </Box>
  );
}; 