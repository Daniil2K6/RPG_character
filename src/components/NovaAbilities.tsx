import { Box, Paper, Typography, Button } from '@mui/material';
import { Character, Ability, NovaPoints } from '../types/character';

interface NovaAbilitiesProps {
  character: Character;
  onCharacterChange?: (character: Character) => void;
  onAbilityChange?: (abilities: Ability[]) => void;
  onNovaPointsChange?: (points: NovaPoints) => void;
  readonly?: boolean;
}

export const NovaAbilities = ({
  character,
  onCharacterChange,
  readonly = false
}: NovaAbilitiesProps) => {
  const handleNovaPointsChange = (newPoints: NovaPoints) => {
    if (onCharacterChange) {
      onCharacterChange({
        ...character,
        novaPoints: newPoints,
        lastModifiedAt: new Date().toISOString(),
      });
    }
  };

  const novaPoints = character.novaPoints || { current: 0, max: 0 };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Нова-способности
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const newPoints = { ...novaPoints, current: Math.max(0, novaPoints.current - 1) };
            handleNovaPointsChange(newPoints);
          }}
          disabled={readonly || novaPoints.current <= 0}
        >
          Использовать очко Нова
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            const newPoints = { ...novaPoints, current: Math.min(novaPoints.max, novaPoints.current + 1) };
            handleNovaPointsChange(newPoints);
          }}
          disabled={readonly || novaPoints.current >= novaPoints.max}
        >
          Восстановить очко Нова
        </Button>
      </Box>
    </Paper>
  );
}; 