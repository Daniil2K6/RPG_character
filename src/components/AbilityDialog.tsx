import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import type { Ability, AbilityRarity } from '../types/character';
import { RARITY_ORDER, RARITY_LABELS } from '../constants';

interface AbilityDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, description: string, level: number, maxLevel: number, rarity: AbilityRarity) => void;
  ability?: Ability;
}

export const AbilityDialog: React.FC<AbilityDialogProps> = ({
  open,
  onClose,
  onSave,
  ability
}) => {
  const [name, setName] = useState(ability?.name || '');
  const [description, setDescription] = useState(ability?.description || '');
  const [rarity, setRarity] = useState<AbilityRarity>(ability?.rarity || 'common');
  const maxLevel = rarity === 'phantasm' || rarity === 'oversystem' ? 20 : 10;

  const handleSave = () => {
    onSave(name, description, 1, maxLevel, rarity);
    setName('');
    setDescription('');
    setRarity('common');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{ability ? 'Редактировать способность' : 'Новая способность'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            label="Название способности"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Описание способности"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Редкость</InputLabel>
            <Select
              value={rarity}
              onChange={(e) => {
                const newRarity = e.target.value as AbilityRarity;
                setRarity(newRarity);
              }}
              label="Редкость"
            >
              {RARITY_ORDER.map((r) => (
                <MenuItem key={r} value={r}>
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
          {ability ? 'Сохранить' : 'Создать'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 