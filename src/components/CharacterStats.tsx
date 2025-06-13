import { Box, IconButton } from "@mui/material";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Character, StatMultipliers } from "../types/character";
import { RACES } from "../constants/races";
import { STAT_NAMES, BASE_STATS } from '../constants/stats';

interface CharacterStatsComponentProps {
  character: Character;
  onCharacterChange: (character: Character) => void;
  readonly?: boolean;
}

export const CharacterStatsComponent = ({
  character,
  onCharacterChange,
  readonly = false,
}: CharacterStatsComponentProps) => {
  const handleFreePointsChange = (delta: number) => {
    if (readonly) return;

    onCharacterChange({
      ...character,
      freePoints: Math.max(0, character.freePoints + delta),
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const renderStatRow = (stat: keyof StatMultipliers) => {
    const baseValue = character.stats?.[stat] ?? BASE_STATS[stat];
    const raceMultiplier = character.race ? RACES[character.race]?.multipliers[stat] ?? 1 : 1;
    const totalValue = Number((baseValue * raceMultiplier).toFixed(1));

    return (
      <Box key={stat} sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        height: '40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative'
      }}>
        {/* Название характеристики */}
        <Box sx={{ flex: 1 }}>
          <Typography>{STAT_NAMES[stat as keyof StatMultipliers]}</Typography>
        </Box>

        {/* Базовое значение и кнопки изменения */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
            <IconButton
              size="small"
              onClick={() => handleStatChange(stat, -1)}
            disabled={readonly || baseValue <= 1}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
          <Typography sx={{ minWidth: '30px', textAlign: 'center' }}>
            {baseValue}
          </Typography>
            <IconButton
              size="small"
              onClick={() => handleStatChange(stat, 1)}
            disabled={readonly || character.freePoints <= 0}
            >
              <AddIcon fontSize="small" />
            </IconButton>
        </Box>

        {/* Множитель расы */}
        <Typography sx={{ 
          minWidth: '60px', 
          textAlign: 'center',
          color: raceMultiplier > 1 ? 'success.main' : raceMultiplier < 1 ? 'error.main' : 'text.primary'
        }}>
          ×{raceMultiplier.toFixed(2)}
        </Typography>

        {/* Итоговое значение */}
        <Typography sx={{ minWidth: '50px', textAlign: 'right' }}>
          {totalValue.toFixed(1)}
          </Typography>
      </Box>
    );
  };

  const handleStatChange = (stat: keyof StatMultipliers, delta: number) => {
    if (readonly) return;
    if (delta > 0 && character.freePoints <= 0) return;
    if (delta < 0 && character.stats[stat] <= 1) return;

    const newStats = {
      ...character.stats,
      [stat]: (character.stats[stat] || BASE_STATS[stat]) + delta
    };

    onCharacterChange({
      ...character,
      stats: newStats,
      freePoints: character.freePoints - delta,
      lastModifiedAt: new Date().toISOString(),
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {Object.keys(BASE_STATS)
        .filter(key => key !== 'freePoints')
        .map((stat) => renderStatRow(stat as keyof StatMultipliers))}
      
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>
            Свободные очки: {character.freePoints}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
          size="small"
          onClick={() => handleFreePointsChange(-10)}
              disabled={readonly}
        >
              -10
            </Button>
            <Button
              variant="outlined"
          size="small"
          onClick={() => handleFreePointsChange(-1)}
              disabled={readonly}
        >
              -1
            </Button>
            <Button
              variant="outlined"
          size="small"
          onClick={() => handleFreePointsChange(1)}
          disabled={readonly}
        >
              +1
            </Button>
            <Button
              variant="outlined"
          size="small"
          onClick={() => handleFreePointsChange(10)}
          disabled={readonly}
            >
              +10
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};