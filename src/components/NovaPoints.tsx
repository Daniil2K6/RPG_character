import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { NovaPoints } from '../types/character';

interface NovaPointsComponentProps {
  points: NovaPoints;
  onChange: (points: NovaPoints) => void;
  readonly?: boolean;
}

export const NovaPointsComponent: React.FC<NovaPointsComponentProps> = ({
  points,
  onChange,
  readonly = false
}) => {
  const handlePointsChange = (field: keyof NovaPoints, value: number) => {
    if (readonly) return;
    
    const newPoints = { ...points };
    newPoints[field] = Math.max(0, value);
    
    // Обновляем current и max при изменении очков
    if (field === 'on' || field === 'son' || field === 'lon') {
      newPoints.current = newPoints.on + newPoints.son * 10 + newPoints.lon * 100;
      newPoints.max = Math.max(newPoints.current, newPoints.max);
    }
    
    onChange(newPoints);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Нова очки</Typography>
      
      {/* ON points */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ minWidth: 100 }}>ON:</Typography>
        <IconButton
          size="small"
          onClick={() => handlePointsChange('on', points.on - 1)}
          disabled={readonly || points.on <= 0}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
          {points.on}
        </Typography>
        <IconButton
          size="small"
          onClick={() => handlePointsChange('on', points.on + 1)}
          disabled={readonly}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* SON points */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ minWidth: 100 }}>SON:</Typography>
        <IconButton
          size="small"
          onClick={() => handlePointsChange('son', points.son - 1)}
          disabled={readonly || points.son <= 0}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
          {points.son}
        </Typography>
        <IconButton
          size="small"
          onClick={() => handlePointsChange('son', points.son + 1)}
          disabled={readonly}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* LON points */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ minWidth: 100 }}>LON:</Typography>
        <IconButton
          size="small"
          onClick={() => handlePointsChange('lon', points.lon - 1)}
          disabled={readonly || points.lon <= 0}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
          {points.lon}
        </Typography>
        <IconButton
          size="small"
          onClick={() => handlePointsChange('lon', points.lon + 1)}
          disabled={readonly}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography>
          Текущая мощь: {points.current}
        </Typography>
        <Typography>
          Максимальная мощь: {points.max}
        </Typography>
      </Box>
    </Box>
  );
};