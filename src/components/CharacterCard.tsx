import { Box, Stack, Paper, Typography, Button, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon, Edit as EditIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Character, CustomTab, Ability } from '../types/character';
import { CharacterStatsComponent } from './CharacterStats';
import { TEMPLATES } from '../types/character';
import { useState, useRef } from 'react';

interface CharacterCardProps {
  character: Character;
  onCharacterChange: (newCharacter: Character) => void;
  onBack: () => void;
  readonly?: boolean;
}

interface TabDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
}

interface AbilityDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
  ability?: Ability;
}

const TabDialog: React.FC<TabDialogProps> = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    onSave(title);
    setTitle('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Новая вкладка</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Название вкладки"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave} disabled={!title.trim()}>Создать</Button>
      </DialogActions>
    </Dialog>
  );
};

const AbilityDialog: React.FC<AbilityDialogProps> = ({ open, onClose, onSave, ability }) => {
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

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onCharacterChange,
  onBack,
  readonly = false,
}) => {
  const template = TEMPLATES[character.templateType];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>(
    character.customTabs[0]?.id || null
  );
  const [isTabDialogOpen, setIsTabDialogOpen] = useState(false);
  const [isAbilityDialogOpen, setIsAbilityDialogOpen] = useState(false);
  const [editingAbility, setEditingAbility] = useState<Ability | undefined>(undefined);

  const handleStatsChange = (newStats: Character['stats'], newFreePoints: number) => {
    onCharacterChange({
      ...character,
      stats: newStats,
      freePoints: newFreePoints,
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCharacterChange({
      ...character,
      name: event.target.value,
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const handleRaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCharacterChange({
      ...character,
      race: event.target.value,
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const handleLevelChange = (newLevel: number) => {
    onCharacterChange({
      ...character,
      level: newLevel,
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const handleFreePointsChange = (newFreePoints: number) => {
    onCharacterChange({
      ...character,
      freePoints: newFreePoints,
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onCharacterChange({
      ...character,
      description: event.target.value,
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onCharacterChange({
          ...character,
          imageUrl: e.target?.result as string,
          lastModifiedAt: new Date().toISOString(),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTabContentChange = (tabId: string, content: string) => {
    onCharacterChange({
      ...character,
      customTabs: character.customTabs.map(tab =>
        tab.id === tabId ? { ...tab, content } : tab
      ),
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const handleAddTab = (title: string) => {
    const newTab: CustomTab = {
      id: crypto.randomUUID(),
      title,
      content: '',
    };
    onCharacterChange({
      ...character,
      customTabs: [...character.customTabs, newTab],
      lastModifiedAt: new Date().toISOString(),
    });
    setSelectedTab(newTab.id);
  };

  const handleDeleteTab = (tabId: string) => {
    onCharacterChange({
      ...character,
      customTabs: character.customTabs.filter(tab => tab.id !== tabId),
      lastModifiedAt: new Date().toISOString(),
    });
    setSelectedTab(character.customTabs[0]?.id || null);
  };

  const handleAddAbility = (name: string, description: string) => {
    if (editingAbility) {
      onCharacterChange({
        ...character,
        abilities: character.abilities.map(ability =>
          ability.id === editingAbility.id
            ? { ...ability, name, description }
            : ability
        ),
        lastModifiedAt: new Date().toISOString(),
      });
      setEditingAbility(undefined);
    } else {
      const newAbility: Ability = {
        id: crypto.randomUUID(),
        name,
        description,
      };
      onCharacterChange({
        ...character,
        abilities: [...character.abilities, newAbility],
        lastModifiedAt: new Date().toISOString(),
      });
    }
  };

  const handleDeleteAbility = (abilityId: string) => {
    onCharacterChange({
      ...character,
      abilities: character.abilities.filter(ability => ability.id !== abilityId),
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const handleEditAbility = (ability: Ability) => {
    setEditingAbility(ability);
    setIsAbilityDialogOpen(true);
  };

  const handleSave = () => {
    const characterData = {
      ...character,
      lastModifiedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(characterData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `character-${character.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
        >
          Назад
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={readonly}
        >
          Сохранить персонажа
        </Button>
      </Stack>

      <Stack direction="row" spacing={2}>
        {/* Левая колонка - характеристики и способности */}
        <Stack spacing={2} sx={{ width: '40%' }}>
          <CharacterStatsComponent
            stats={character.stats}
            level={character.level}
            freePoints={character.freePoints}
            onChange={handleStatsChange}
            onLevelChange={handleLevelChange}
            onFreePointsChange={handleFreePointsChange}
            readonly={readonly}
          />

          {/* Способности */}
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">Способности</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setIsAbilityDialogOpen(true)}
                disabled={readonly}
              >
                Добавить
              </Button>
            </Stack>
            <Stack spacing={1}>
              {character.abilities.map((ability) => (
                <Paper key={ability.id} sx={{ p: 1 }} variant="outlined">
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1">{ability.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {ability.description}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleEditAbility(ability)}
                        disabled={readonly}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteAbility(ability.id)}
                        disabled={readonly}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Stack>

        {/* Правая колонка - информация о персонаже */}
        <Stack spacing={2} sx={{ width: '60%' }}>
          <Paper sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Stack spacing={2} sx={{ flex: 1 }}>
                  <TextField
                    label="Имя персонажа"
                    value={character.name}
                    onChange={handleNameChange}
                    disabled={readonly}
                    fullWidth
                  />
                  <TextField
                    label="Раса"
                    value={character.race}
                    onChange={handleRaceChange}
                    disabled={readonly}
                    fullWidth
                  />
                  <Typography variant="subtitle2">
                    Шаблон: {template.name}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Создан: {new Date(character.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Последнее изменение: {new Date(character.lastModifiedAt).toLocaleString()}
                  </Typography>
                </Stack>
                <Box sx={{ position: 'relative', width: '200px', height: '200px' }}>
                  <Box
                    component="img"
                    src={character.imageUrl}
                    alt={character.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      bgcolor: 'background.paper',
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={readonly}
                  >
                    <EditIcon />
                  </IconButton>
                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Box>
              </Box>
            </Stack>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Описание
            </Typography>
            <TextField
              multiline
              fullWidth
              minRows={4}
              maxRows={8}
              value={character.description}
              onChange={handleDescriptionChange}
              disabled={readonly}
              variant="outlined"
              sx={{ mt: 1 }}
            />
          </Paper>

          {/* Пользовательские вкладки */}
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">Дополнительные вкладки</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setIsTabDialogOpen(true)}
                disabled={readonly}
              >
                Добавить вкладку
              </Button>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {character.customTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={selectedTab === tab.id ? 'contained' : 'outlined'}
                  onClick={() => setSelectedTab(tab.id)}
                  size="small"
                  endIcon={
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTab(tab.id);
                      }}
                      disabled={readonly}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  {tab.title}
                </Button>
              ))}
            </Stack>

            {selectedTab && (
              <TextField
                multiline
                fullWidth
                minRows={4}
                maxRows={8}
                value={character.customTabs.find(tab => tab.id === selectedTab)?.content || ''}
                onChange={(e) => handleTabContentChange(selectedTab, e.target.value)}
                disabled={readonly}
                variant="outlined"
                placeholder="Введите содержимое вкладки..."
              />
            )}
          </Paper>
        </Stack>
      </Stack>

      <TabDialog
        open={isTabDialogOpen}
        onClose={() => setIsTabDialogOpen(false)}
        onSave={handleAddTab}
      />

      <AbilityDialog
        open={isAbilityDialogOpen}
        onClose={() => {
          setIsAbilityDialogOpen(false);
          setEditingAbility(undefined);
        }}
        onSave={handleAddAbility}
        ability={editingAbility}
      />
    </Box>
  );
}; 