import { Box, Paper, Typography, TextField, IconButton, Stack } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import type { CharacterStats } from '../types/character';

const STAT_LABELS: Record<keyof CharacterStats, string> = {
  strength: 'Сила',
  dexterity: 'Ловкость',
  constitution: 'Телосложение',
  intelligence: 'Интеллект',
  wisdom: 'Мудрость',
  charisma: 'Харизма',
};

interface CharacterStatsComponentProps {
  stats: CharacterStats;
  level: number;
  freePoints: number;
  onChange: (newStats: CharacterStats, newFreePoints: number) => void;
  onLevelChange: (newLevel: number) => void;
  onFreePointsChange: (newFreePoints: number) => void;
  readonly?: boolean;
}

export const CharacterStatsComponent: React.FC<CharacterStatsComponentProps> = ({
  stats,
  level,
  freePoints,
  onChange,
  onLevelChange,
  onFreePointsChange,
  readonly = false,
}) => {
  const handleStatChange = (stat: keyof CharacterStats, value: number, useFreePoints: boolean = false) => {
    const oldValue = stats[stat];
    const newStats = { ...stats, [stat]: value };
    
    // Если используем очки характеристик
    if (useFreePoints) {
      const pointDiff = oldValue - value;
      const newFreePoints = freePoints + pointDiff;
      if (newFreePoints >= 0) {
        onChange(newStats, newFreePoints);
      }
    } else {
      // Просто меняем значение без учета очков
      onChange(newStats, freePoints);
    }
  };

  const handleManualInput = (stat: keyof CharacterStats, value: string) => {
    const numValue = parseInt(value) || 0;
    handleStatChange(stat, numValue, false);
  };

  const handleIncrement = (stat: keyof CharacterStats, useFreePoints: boolean = false) => {
    if (!useFreePoints || freePoints > 0) {
      handleStatChange(stat, stats[stat] + 1, useFreePoints);
    }
  };

  const handleDecrement = (stat: keyof CharacterStats, useFreePoints: boolean = false) => {
    handleStatChange(stat, stats[stat] - 1, useFreePoints);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        {/* Уровень */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ minWidth: 120 }}>Уровень:</Typography>
          <TextField
            size="small"
            type="number"
            value={level}
            onChange={(e) => onLevelChange(parseInt(e.target.value) || 1)}
            disabled={readonly}
            inputProps={{
              min: 1,
              style: { textAlign: 'center' }
            }}
            sx={{ width: 80 }}
          />
        </Box>

        {/* Характеристики */}
        {(Object.keys(STAT_LABELS) as Array<keyof CharacterStats>).map((stat) => (
          <Box key={stat} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ minWidth: 120 }}>{STAT_LABELS[stat]}:</Typography>
            <TextField
              size="small"
              type="number"
              value={stats[stat]}
              onChange={(e) => handleManualInput(stat, e.target.value)}
              disabled={readonly}
              inputProps={{
                style: { textAlign: 'center' }
              }}
              sx={{ width: 80 }}
            />
            <IconButton
              size="small"
              onClick={() => handleDecrement(stat, true)}
              disabled={readonly}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleIncrement(stat, true)}
              disabled={readonly || freePoints <= 0}
            >
              <AddIcon />
            </IconButton>
          </Box>
        ))}

        {/* Свободные очки */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ minWidth: 120 }}>Свободные очки:</Typography>
          <TextField
            size="small"
            type="number"
            value={freePoints}
            onChange={(e) => onFreePointsChange(parseInt(e.target.value) || 0)}
            disabled={readonly}
            inputProps={{
              min: 0,
              style: { textAlign: 'center' }
            }}
            sx={{ width: 80 }}
          />
        </Box>
      </Stack>
    </Paper>
  );
}; 