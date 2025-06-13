import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { AbilityRank } from './index';
import { RARITY_ORDER, RARITY_COLORS, RARITY_LABELS } from '../../../constants';

export interface AbilityData {
  id?: string;
  name: string;
  description: string;
  rank: AbilityRank;
  level: number;
  maxLevel: number;
}

interface AbilityDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: AbilityData) => void;
  initialData?: AbilityData;
  readonly?: boolean;
}

const getMaxLevelForRank = (rank: AbilityRank): number => {
  if (rank === AbilityRank.LEGENDARY) return 20;
  return 10;
};

export const AbilityDialog: React.FC<AbilityDialogProps> = ({ open, onClose, onSave, initialData, readonly }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [rank, setRank] = useState<AbilityRank>(initialData?.rank || AbilityRank.COMMON);
  const [level, setLevel] = useState(initialData?.level || 1);
  const [, setMaxLevel] = useState(getMaxLevelForRank(rank));

  useEffect(() => {
    setMaxLevel(getMaxLevelForRank(rank));
    if (level > getMaxLevelForRank(rank)) setLevel(getMaxLevelForRank(rank));
  }, [rank]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setRank(initialData.rank);
      setLevel(initialData.level);
      setMaxLevel(getMaxLevelForRank(initialData.rank));
    } else {
      setName('');
      setDescription('');
      setRank(AbilityRank.COMMON);
      setLevel(1);
      setMaxLevel(getMaxLevelForRank(AbilityRank.COMMON));
    }
  }, [open, initialData]);

  const handleSave = () => {
    onSave({
      id: initialData?.id,
      name,
      description,
      rank,
      level,
      maxLevel: getMaxLevelForRank(rank),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Редактировать способность' : 'Новая способность'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            label="Название способности"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={readonly}
          />
          <TextField
            label="Описание способности"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={readonly}
          />
          <FormControl fullWidth>
            <InputLabel>Редкость</InputLabel>
            <Select
              value={rank}
              onChange={e => setRank(e.target.value as any)}
              label="Редкость"
              disabled={readonly}
            >
              {RARITY_ORDER.map(r => (
                <MenuItem key={r} value={r} style={
                  r === 'extrasystem'
                    ? { background: 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)', color: '#fff', fontWeight: 'bold' }
                    : { color: RARITY_COLORS[r] }
                }>
                  {RARITY_LABELS[r]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave} disabled={!name.trim() || !description.trim()}>
          {initialData ? 'Сохранить' : 'Создать'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};