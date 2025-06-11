import { Box, Stack, Paper, Typography, Button, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon, Edit as EditIcon, Add as AddIcon, Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import type { Character, CustomTab, Ability, NovaPoints, AbilityRarity } from '../types/character';
import { CharacterStatsComponent } from './CharacterStats';
import { NovaPointsComponent } from './NovaPoints';
import { TEMPLATES } from '../types/templates';
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
  onSave: (name: string, description: string, level: number, maxLevel: number, rarity: AbilityRarity) => void;
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

const RARITY_ORDER: AbilityRarity[] = [
  'common',
  'uncommon',
  'rare',
  'epic',
  'legendary',
  'mythical',
  'divine',
  'phantasm',
  'oversystem',
  'extrasystem'
];

const RARITY_COLORS: Record<AbilityRarity, string> = {
  common: '#808080', // Серый
  uncommon: '#00ff00', // Зеленый
  rare: '#0000ff', // Синий
  epic: '#800080', // Фиолетовый
  legendary: '#ffd700', // Золотой
  mythical: '#ff0000', // Красный
  divine: '#ffffff', // Белый
  phantasm: '#ff00ff', // Розовый
  oversystem: '#00ffff', // Голубой
  extrasystem: '#000000' // Черный
};

const RARITY_LABELS: Record<AbilityRarity, string> = {
  common: 'Обычный',
  uncommon: 'Необычный',
  rare: 'Редкий',
  epic: 'Эпический',
  legendary: 'Легендарный',
  mythical: 'Мифический',
  divine: 'Божественный',
  phantasm: 'Фантазм',
  oversystem: 'Надсистемный',
  extrasystem: 'Внесистемный'
};

const getMaxLevelForRarity = (rarity: AbilityRarity): number => {
  if (rarity === 'phantasm' || rarity === 'oversystem') {
    return 20;
  }
  return 10;
};

const AbilityDialog: React.FC<AbilityDialogProps> = ({ open, onClose, onSave, ability }) => {
  const [name, setName] = useState(ability?.name || '');
  const [description, setDescription] = useState(ability?.description || '');
  const [rarity, setRarity] = useState<AbilityRarity>(ability?.rarity || 'common');
  const maxLevel = getMaxLevelForRarity(rarity);

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
  const [creatingAbilityType, setCreatingAbilityType] = useState<{ useSON: boolean; useLON: boolean } | null>(null);

  const handleStatsChange = (newStats: Character['stats'], newFreePoints: number) => {
    onCharacterChange({
      ...character,
      stats: newStats,
      freePoints: newFreePoints,
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const handleNovaPointsChange = (newPoints: NovaPoints) => {
    onCharacterChange({
      ...character,
      novaPoints: newPoints,
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
    const oldLevel = character.level;
    const delta = newLevel - oldLevel;
    
    if (delta === 0 || (delta < 0 && oldLevel === 1)) return;

    // Создаем новые очки на основе текущих
    const newPoints = { ...character.novaPoints! };

    if (delta > 0) {
      // Повышение уровня
      if (oldLevel < 5) {
        // До 5 уровня получаем СОН
        newPoints.son += 1;
      } else {
        // После 5 уровня получаем ОН
        newPoints.on += 1;
      }
      // Если новый уровень кратен 10, получаем ЛОН
      if (newLevel % 10 === 0) {
        newPoints.lon += 1;
      }
    } else {
      // Понижение уровня
      if (oldLevel <= 5) {
        // До 5 уровня теряем СОН
        newPoints.son = Math.max(0, newPoints.son - 1);
      } else {
        // После 5 уровня теряем ОН
        newPoints.on = Math.max(0, newPoints.on - 1);
      }
      // Если понижаем с 10 уровня, теряем ЛОН
      if (oldLevel % 10 === 0) {
        newPoints.lon = Math.max(0, newPoints.lon - 1);
      }
    }

    // Сначала обновляем очки, потом уровень
    onCharacterChange({
      ...character,
      novaPoints: newPoints,
      lastModifiedAt: new Date().toISOString(),
    });

    onCharacterChange({
      ...character,
      level: newLevel,
      novaPoints: newPoints,
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
    if (window.confirm('Вы уверены, что хотите удалить эту вкладку?')) {
      onCharacterChange({
        ...character,
        customTabs: character.customTabs.filter(tab => tab.id !== tabId),
        lastModifiedAt: new Date().toISOString(),
      });
      // Если удаляем текущую вкладку, закрываем её
      if (selectedTab === tabId) {
        setSelectedTab(null);
      }
    }
  };

  const handleCloseTab = () => {
    setSelectedTab(null);
  };

  const handleAddAbility = (
    name: string,
    description: string,
    level: number,
    maxLevel: number,
    rarity: AbilityRarity
  ) => {
    if (editingAbility) {
      onCharacterChange({
        ...character,
        abilities: character.abilities.map(ability =>
          ability.id === editingAbility.id
            ? { ...ability, name, description, level, maxLevel, rarity }
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
        level,
        maxLevel,
        rarity,
      };
      onCharacterChange({
        ...character,
        abilities: [...character.abilities, newAbility],
        lastModifiedAt: new Date().toISOString(),
      });
    }
  };

  const handleDeleteAbility = (abilityId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту способность?')) {
      onCharacterChange({
        ...character,
        abilities: character.abilities.filter(ability => ability.id !== abilityId),
        lastModifiedAt: new Date().toISOString(),
      });
    }
  };

  const handleEditAbility = (ability: Ability) => {
    setEditingAbility(ability);
    setIsAbilityDialogOpen(true);
  };

  const handleLevelUpAbility = (ability: Ability) => {
    // Проверяем наличие очков навыков
    if (!character.novaPoints) return;

    // Определяем, какие очки нужно использовать
    const useLON = (ability.rarity === 'phantasm' || ability.rarity === 'oversystem') && ability.level >= 10;

    // Проверяем наличие необходимых очков
    if (useLON && character.novaPoints.lon <= 0) return;
    if (!useLON && character.novaPoints.on <= 0) return;

    // Проверяем, не достигнут ли максимальный уровень
    if (ability.level >= ability.maxLevel) return;

    // Создаем обновленные очки навыков
    const newNovaPoints = { ...character.novaPoints };
    if (useLON) {
      newNovaPoints.lon -= 1;
      // При использовании ЛОН увеличиваем на 10 уровней
      const newLevel = Math.min(ability.level + 10, ability.maxLevel);
      onCharacterChange({
        ...character,
        abilities: character.abilities.map(a =>
          a.id === ability.id
            ? { ...a, level: newLevel }
            : a
        ),
        novaPoints: newNovaPoints,
        lastModifiedAt: new Date().toISOString(),
      });
    } else {
      newNovaPoints.on -= 1;
      // При использовании ОН увеличиваем на 1 уровень
      onCharacterChange({
        ...character,
        abilities: character.abilities.map(a =>
          a.id === ability.id
            ? { ...a, level: a.level + 1 }
            : a
        ),
        novaPoints: newNovaPoints,
        lastModifiedAt: new Date().toISOString(),
      });
    }
  };

  const handleEvolveAbility = (ability: Ability) => {
    // Проверяем наличие ЛОН
    if (!character.novaPoints?.lon || character.novaPoints.lon <= 0) return;

    // Создаем обновленные очки навыков
    const newNovaPoints = {
      ...character.novaPoints,
      lon: character.novaPoints.lon - 1
    };

    if (ability.level >= ability.maxLevel) {
      // Если уровень максимальный, повышаем редкость
      const currentRarityIndex = RARITY_ORDER.indexOf(ability.rarity);
      if (currentRarityIndex < RARITY_ORDER.length - 1) {
        const newRarity = RARITY_ORDER[currentRarityIndex + 1];
        onCharacterChange({
          ...character,
          abilities: character.abilities.map(a =>
            a.id === ability.id
              ? {
                  ...a,
                  level: 1,
                  maxLevel: getMaxLevelForRarity(newRarity),
                  rarity: newRarity
                }
              : a
          ),
          novaPoints: newNovaPoints,
          lastModifiedAt: new Date().toISOString(),
        });
      }
    } else {
      // Если уровень не максимальный, добавляем 10 уровней без ограничения максимальным уровнем
      const newLevel = ability.level + 10;
      onCharacterChange({
        ...character,
        abilities: character.abilities.map(a =>
          a.id === ability.id
            ? { ...a, level: newLevel }
            : a
        ),
        novaPoints: newNovaPoints,
        lastModifiedAt: new Date().toISOString(),
      });
    }
  };

  const handleCreateAbility = (useSON: boolean = false, useLON: boolean = false) => {
    if (!character.novaPoints) return;
    
    // Проверяем наличие необходимых очков
    if (useSON && character.novaPoints.son <= 0) return;
    if (useLON && character.novaPoints.lon <= 0) return;
    
    setEditingAbility(undefined);
    setIsAbilityDialogOpen(true);
    
    // Сохраняем информацию о типе создаваемой способности
    setCreatingAbilityType({ useSON, useLON });
  };

  const handleSaveAbility = (name: string, description: string, _level: number, maxLevel: number, rarity: AbilityRarity) => {
    if (!character.novaPoints) return;

    const newNovaPoints = { ...character.novaPoints };
    
    // Определяем начальный уровень и вычитаем очки
    const initialLevel = creatingAbilityType?.useLON ? 10 : 1;
    
    // Вычитаем очки только если создаем способность за очки
    if (creatingAbilityType) {
      if (creatingAbilityType.useLON) {
        newNovaPoints.lon -= 1;
      } else if (creatingAbilityType.useSON) {
        newNovaPoints.son -= 1;
      }
    }

    const newAbility: Ability = {
      id: crypto.randomUUID(),
      name,
      description,
      level: initialLevel,
      maxLevel,
      rarity,
    };

    onCharacterChange({
      ...character,
      abilities: [...character.abilities, newAbility],
      novaPoints: newNovaPoints,
      lastModifiedAt: new Date().toISOString(),
    });
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
        {/* Левая колонка - характеристики/очки навыков и способности */}
        <Stack spacing={2} sx={{ width: '40%' }}>
          {character.templateType === 'base' ? (
            <CharacterStatsComponent
              stats={character.stats!}
              level={character.level}
              freePoints={character.freePoints!}
              onChange={handleStatsChange}
              onLevelChange={handleLevelChange}
              onFreePointsChange={handleFreePointsChange}
              readonly={readonly}
            />
          ) : (
            <NovaPointsComponent
              points={character.novaPoints!}
              level={character.level}
              onChange={handleNovaPointsChange}
              onLevelChange={handleLevelChange}
              readonly={readonly}
            />
          )}

          {/* Способности */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Способности
            </Typography>

            {/* Кнопки создания способностей */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={() => handleCreateAbility(true, false)}
                disabled={readonly || !character.novaPoints?.son}
                startIcon={<AddIcon />}
              >
                Создать за СОН
              </Button>
              <Button
                variant="contained"
                onClick={() => handleCreateAbility(false, true)}
                disabled={readonly || !character.novaPoints?.lon}
                startIcon={<AddIcon />}
              >
                Создать за ЛОН (10 ур.)
              </Button>
              <Button
                variant="contained"
                onClick={() => handleCreateAbility(false, false)}
                disabled={readonly}
                startIcon={<AddIcon />}
                sx={{ bgcolor: 'info.main', '&:hover': { bgcolor: 'info.dark' } }}
              >
                Создать без очков
              </Button>
            </Stack>

            <Stack spacing={1}>
              {character.abilities.map(ability => (
                <Paper key={ability.id} elevation={1} sx={{ p: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1">
                        {ability.name} (Ур. {ability.level}/{ability.maxLevel})
                      </Typography>
                      <Typography variant="caption" sx={{ color: RARITY_COLORS[ability.rarity] }}>
                        {RARITY_LABELS[ability.rarity]}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {ability.description}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleLevelUpAbility(ability)}
                        disabled={
                          readonly || 
                          ability.level >= ability.maxLevel ||
                          (!character.novaPoints?.on || character.novaPoints.on <= 0)
                        }
                      >
                        +1 ОН
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEvolveAbility(ability)}
                        disabled={readonly || !character.novaPoints?.lon}
                      >
                        {ability.level >= ability.maxLevel ? 'Эво ЛОН' : '+10 ЛОН'}
                      </Button>
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
          <Stack direction="row" spacing={2}>
            {/* Основная информация */}
            <Stack spacing={2} sx={{ flex: 1 }}>
              <Paper sx={{ p: 2 }}>
                <Stack spacing={2}>
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
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Описание
                </Typography>
                <TextField
                  multiline
                  fullWidth
                  minRows={3}
                  maxRows={5}
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
                        <Stack direction="row" spacing={0.5}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCloseTab();
                            }}
                            disabled={readonly}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTab(tab.id);
                            }}
                            disabled={readonly}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
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
                    minRows={3}
                    maxRows={5}
                    value={character.customTabs.find(tab => tab.id === selectedTab)?.content || ''}
                    onChange={(e) => handleTabContentChange(selectedTab, e.target.value)}
                    disabled={readonly}
                    variant="outlined"
                  />
                )}
              </Paper>
            </Stack>

            {/* Изображение персонажа */}
            <Paper sx={{ p: 2, height: 'fit-content' }}>
              <Box sx={{ position: 'relative', width: '300px', height: '475px', display: 'flex', flexDirection: 'column' }}> 
                <Box
                  component="img"
                  src={character.imageUrl}
                  alt={character.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                  }}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={readonly}
                  startIcon={<AddIcon />}
                  sx={{
                    position: 'absolute',
                    bottom: -40,
                    left: 0,
                    minWidth: '140px',
                  }}
                >
                  Загрузить
                </Button>
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Box>
            </Paper>
          </Stack>
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
        onSave={handleSaveAbility}
        ability={editingAbility}
      />
    </Box>
  );
}; 