import { Box, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { NovaPoints } from '../types/character';

interface NovaPointsComponentProps {
  points: NovaPoints;
  onPointsChange: (points: NovaPoints) => void;
  readonly?: boolean;
}

export const NovaPointsComponent = ({
  points,
  onPointsChange,
  readonly = false
}: NovaPointsComponentProps) => {
  const handlePointsChange = (field: keyof NovaPoints, value: number) => {
    const newPoints = { ...points };
    newPoints[field] = Math.max(0, value);
    onPointsChange(newPoints);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ minWidth: 120 }}>Текущие очки:</Typography>
        <IconButton
          size="small"
          onClick={() => handlePointsChange('current', points.current - 1)}
          disabled={readonly || points.current <= 0}
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          size="small"
          type="number"
          value={points.current}
          onChange={(e) => handlePointsChange('current', parseInt(e.target.value) || 0)}
          disabled={readonly}
          sx={{ width: 80 }}
        />
        <IconButton
          size="small"
          onClick={() => handlePointsChange('current', points.current + 1)}
          disabled={readonly}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ minWidth: 120 }}>Максимум очков:</Typography>
        <IconButton
          size="small"
          onClick={() => handlePointsChange('max', points.max - 1)}
          disabled={readonly || points.max <= 0}
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          size="small"
          type="number"
          value={points.max}
          onChange={(e) => handlePointsChange('max', parseInt(e.target.value) || 0)}
          disabled={readonly}
          sx={{ width: 80 }}
        />
        <IconButton
          size="small"
          onClick={() => handlePointsChange('max', points.max + 1)}
          disabled={readonly}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}; 