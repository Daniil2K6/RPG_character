import React from 'react';
import { Box, Paper, Typography, TextField, Stack, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import type { NovaPoints } from '../../../types/character';

interface NovaPointsComponentProps {
  points: NovaPoints;
  level: number;
  onChange: (newPoints: NovaPoints) => void;
  onLevelChange: (newLevel: number) => void;
  readonly?: boolean;
}

export const NovaPointsComponent: React.FC<NovaPointsComponentProps> = ({
  points,
  level,
  onChange,
  onLevelChange,
  readonly = false,
}) => {
  const handleFastLevelUp = () => {
    const newLevel = level + 10;
    const newPoints = { ...points };
    newPoints.on += 10;
    newPoints.lon += 1;
    onChange(newPoints);
    onLevelChange(newLevel);
  };
  const handleFastLevelDown = () => {
    if (level < 10) return;
    const newLevel = level - 10;
    const newPoints = { ...points };
    newPoints.on = Math.max(0, newPoints.on - 10);
    newPoints.lon = Math.max(0, newPoints.lon - 1);
    onChange(newPoints);
    onLevelChange(newLevel);
  };
  const handleLevelChange = (delta: number) => {
    const newLevel = Math.max(1, level + delta);
    if (newLevel === level || (delta < 0 && level === 1)) return;
    const newPoints = { ...points };
    if (delta > 0) {
      if (level < 5) {
        newPoints.son += 1;
      } else {
        newPoints.on += 1;
      }
      if (newLevel % 10 === 0) {
        newPoints.lon += 1;
      }
    } else {
      if (level <= 5) {
        newPoints.son = Math.max(0, newPoints.son - 1);
      } else {
        newPoints.on = Math.max(0, newPoints.on - 1);
      }
      if (level % 10 === 0) {
        newPoints.lon = Math.max(0, newPoints.lon - 1);
      }
    }
    onChange(newPoints);
    onLevelChange(newLevel);
  };
  const handlePointsChange = (field: keyof NovaPoints, value: number) => {
    const newPoints = {
      ...points,
      [field]: Math.max(0, value)
    };
    onChange(newPoints);
  };
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" sx={{ flex: 1 }}>
            Уровень персонажа
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={handleFastLevelDown}
              disabled={readonly || level < 10}
              sx={{ color: 'info.main', '&.Mui-disabled': { color: 'info.main', opacity: 0.5 } }}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleLevelChange(-1)}
              disabled={readonly || level <= 1}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6" sx={{ mx: 2, minWidth: '40px', textAlign: 'center' }}>
              {level}
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleLevelChange(1)}
              disabled={readonly}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleFastLevelUp}
              disabled={readonly}
              sx={{ color: 'info.main', '&.Mui-disabled': { color: 'info.main', opacity: 0.5 } }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          Очки навыков
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ minWidth: 200 }}>Обычные очки (ОН):</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={() => handlePointsChange('on', points.on - 1)}
              disabled={readonly || points.on <= 0}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              size="small"
              type="number"
              value={points.on}
              onChange={(e) => handlePointsChange('on', parseInt(e.target.value) || 0)}
              disabled={readonly}
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              sx={{ width: 80 }}
            />
            <IconButton
              size="small"
              onClick={() => handlePointsChange('on', points.on + 1)}
              disabled={readonly}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Typography variant="caption" color="text.secondary">
            +1 за каждый уровень после 5-го
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ minWidth: 200 }}>Свободные очки (СОН):</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={() => handlePointsChange('son', points.son - 1)}
              disabled={readonly || points.son <= 0}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              size="small"
              type="number"
              value={points.son}
              onChange={(e) => handlePointsChange('son', parseInt(e.target.value) || 0)}
              disabled={readonly}
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              sx={{ width: 80 }}
            />
            <IconButton
              size="small"
              onClick={() => handlePointsChange('son', points.son + 1)}
              disabled={readonly}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Typography variant="caption" color="text.secondary">
            +1 на 2-5 уровнях
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ minWidth: 200 }}>Легендарные очки (ЛОН):</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={() => handlePointsChange('lon', points.lon - 1)}
              disabled={readonly || points.lon <= 0}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              size="small"
              type="number"
              value={points.lon}
              onChange={(e) => handlePointsChange('lon', parseInt(e.target.value) || 0)}
              disabled={readonly}
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              sx={{ width: 80 }}
            />
            <IconButton
              size="small"
              onClick={() => handlePointsChange('lon', points.lon + 1)}
              disabled={readonly}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Typography variant="caption" color="text.secondary">
            +1 каждые 10 уровней
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}; 