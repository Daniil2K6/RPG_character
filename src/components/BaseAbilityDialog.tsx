import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import { useState } from 'react';
import type { Ability } from '../types/character';

interface BaseAbilityDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
  ability?: Ability;
}

export const BaseAbilityDialog: React.FC<BaseAbilityDialogProps> = ({
  open,
  onClose,
  onSave,
  ability
}) => {
  const [name, setName] = useState(ability?.name || '');
  const [description, setDescription] = useState(ability?.description || '');

  const handleSave = () => {
    onSave(name, description);
    setName('');
    setDescription('');
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