import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stack, IconButton, Tab, Tabs } from '@mui/material';
import { NovaPointsComponent } from './NovaPoints';
import type { Character, Ability } from '../../../types/character';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { v4 as uuidv4 } from 'uuid';
import { AbilityDialog, AbilityData } from './AbilityDialog';
import { AbilityRank, AbilityRankColor } from './index';
import { RARITY_COLORS, RARITY_LABELS, RARITY_ORDER } from '../../../constants';

interface NovaTemplateProps {
  character: Character;
  onCharacterChange: (character: Character) => void;
  readonly?: boolean;
}

export const NovaTemplate: React.FC<NovaTemplateProps> = ({ character, onCharacterChange, readonly = false }) => {
  // Локальное состояние для очков и уровня
  const [points, setPoints] = useState(character.points || { on: 0, son: 1, lon: 0 });
  const [level, setLevel] = useState(character.level || 1);
  const [tabIndex, setTabIndex] = useState(0);
  const [tabs, setTabs] = useState(character.customTabs && character.customTabs.length > 0
    ? character.customTabs
    : [{ id: uuidv4(), title: 'ЗАДАНИЯ', content: '' }]);
  const [abilities, setAbilities] = useState<Ability[]>(character.abilities || []);
  const [isAbilityDialogOpen, setIsAbilityDialogOpen] = useState(false);
  const [creatingAbilityType, setCreatingAbilityType] = useState<'son' | 'lon' | 'free' | null>(null);
  const [editingAbility, setEditingAbility] = useState<AbilityData | null>(null);

  // Обработка загрузки изображения
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onCharacterChange({
          ...character,
          mainImage: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Обновление очков и уровня
  const handlePointsChange = (newPoints: any) => {
    setPoints(newPoints);
    onCharacterChange({ ...character, points: newPoints });
  };
  const handleLevelChange = (newLevel: number) => {
    setLevel(newLevel);
    onCharacterChange({ ...character, level: newLevel });
  };

  // Работа с вкладками
  const handleTabChange = (_: any, newIndex: number) => setTabIndex(newIndex);
  const handleTabTitleChange = (index: number, value: string) => {
    const newTabs = tabs.map((tab, i) => i === index ? { ...tab, title: value } : tab);
    setTabs(newTabs);
    onCharacterChange({ ...character, customTabs: newTabs });
  };
  const handleTabContentChange = (index: number, value: string) => {
    const newTabs = tabs.map((tab, i) => i === index ? { ...tab, content: value } : tab);
    setTabs(newTabs);
    onCharacterChange({ ...character, customTabs: newTabs });
  };
  const handleAddTab = () => {
    const newTabs = [...tabs, { id: uuidv4(), title: 'НОВАЯ ВКЛАДКА', content: '' }];
    setTabs(newTabs);
    setTabIndex(newTabs.length - 1);
    onCharacterChange({ ...character, customTabs: newTabs });
  };
  const handleRemoveTab = (index: number) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);
    setTabIndex(Math.max(0, tabIndex - (index === tabIndex ? 1 : 0)));
    onCharacterChange({ ...character, customTabs: newTabs });
  };

  // Открытие модалки создания способности
  const handleCreateAbility = (type: 'son' | 'lon' | 'free') => {
    setCreatingAbilityType(type);
    setEditingAbility(null);
    setIsAbilityDialogOpen(true);
  };

  // Сохранение новой или изменённой способности
  const handleSaveAbility = (data: AbilityData) => {
    let newAbilities;
    const ability: Ability = {
      id: editingAbility?.id || uuidv4(),
      name: data.name,
      description: data.description,
      rarity: data.rank as any, // rank -> rarity
      level: data.level,
      maxLevel: data.maxLevel,
    };
    if (editingAbility) {
      newAbilities = abilities.map(a => a.id === ability.id ? ability : a);
    } else {
      newAbilities = [...abilities, ability];
      if (creatingAbilityType === 'son') {
        const newPoints = { ...points, son: Math.max(0, points.son - 1) };
        setPoints(newPoints);
        onCharacterChange({ ...character, points: newPoints, abilities: newAbilities });
        setAbilities(newAbilities);
        return;
      }
      if (creatingAbilityType === 'lon') {
        const newPoints = { ...points, lon: Math.max(0, points.lon - 1) };
        setPoints(newPoints);
        onCharacterChange({ ...character, points: newPoints, abilities: newAbilities });
        setAbilities(newAbilities);
        return;
      }
    }
    setAbilities(newAbilities);
    onCharacterChange({ ...character, abilities: newAbilities });
  };

  // Открытие модалки редактирования
  const handleEditAbility = (ability: AbilityData) => {
    setEditingAbility(ability);
    setIsAbilityDialogOpen(true);
  };

  // Удаление способности
  const handleDeleteAbility = (id: string) => {
    const newAbilities = abilities.filter(a => a.id !== id);
    setAbilities(newAbilities);
    onCharacterChange({ ...character, abilities: newAbilities });
  };

  // Добавляю функции для прокачки
  const handleLevelUpAbility = (ability: Ability) => {
    if (readonly || points.on <= 0 || ability.level >= ability.maxLevel) return;
    const newAbilities = abilities.map(a =>
      a.id === ability.id
        ? { ...a, level: Math.min(a.level + 1, a.maxLevel) }
        : a
    );
    setAbilities(newAbilities);
    const newPoints = { ...points, on: points.on - 1 };
    setPoints(newPoints);
    onCharacterChange({ ...character, abilities: newAbilities, points: newPoints });
  };
  const handleLevelUp10Ability = (ability: Ability) => {
    if (readonly || points.lon <= 0 || ability.level >= ability.maxLevel) return;
    const newAbilities = abilities.map(a =>
      a.id === ability.id
        ? { ...a, level: Math.min(a.level + 10, a.maxLevel) }
        : a
    );
    setAbilities(newAbilities);
    const newPoints = { ...points, lon: points.lon - 1 };
    setPoints(newPoints);
    onCharacterChange({ ...character, abilities: newAbilities, points: newPoints });
  };

  const handleEvolveAbility = (ability: Ability) => {
    if (readonly || points.lon <= 0) return;
    const currentRarityIndex = RARITY_ORDER.indexOf(ability.rarity);
    if (currentRarityIndex === -1 || currentRarityIndex === RARITY_ORDER.length - 1) return; // уже максимальная редкость
    const newRarity = RARITY_ORDER[currentRarityIndex + 1];
    // maxLevel для новой редкости (по аналогии с getMaxLevelForRank)
    const newMaxLevel = newRarity === 'phantasm' || newRarity === 'oversystem' ? 20 : 10;
    const newAbilities = abilities.map(a =>
      a.id === ability.id
        ? { ...a, rarity: newRarity, level: 1, maxLevel: newMaxLevel }
        : a
    );
    setAbilities(newAbilities);
    const newPoints = { ...points, lon: points.lon - 1 };
    setPoints(newPoints);
    onCharacterChange({ ...character, abilities: newAbilities, points: newPoints });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%' }}>
      {/* Левая колонка: уровень, очки, способности */}
      <Box sx={{ width: '30%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <NovaPointsComponent
          points={points}
          level={level}
          onChange={handlePointsChange}
          onLevelChange={handleLevelChange}
          readonly={readonly}
        />
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Способности</Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Button variant="contained" color="primary" onClick={() => handleCreateAbility('son')} disabled={readonly || points.son <= 0}>СОЗДАТЬ ЗА СОН</Button>
            <Button variant="contained" onClick={() => handleCreateAbility('lon')} disabled={readonly || points.lon <= 0}>СОЗДАТЬ ЗА ЛОН (10 УР)</Button>
            <Button variant="contained" color="info" onClick={() => handleCreateAbility('free')} disabled={readonly}>СОЗДАТЬ БЕЗ ОЧКОВ</Button>
          </Stack>
          <Stack spacing={1}>
            {abilities.map(ability => (
              <Paper
                key={ability.id}
                sx={{
                  p: 1,
                  mb: 1,
                  borderLeft: `6px solid ${ability.rarity === 'extrasystem' ? 'transparent' : RARITY_COLORS[ability.rarity]}`,
                  borderImage: ability.rarity === 'extrasystem'
                    ? 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet) 1'
                    : undefined,
                  borderLeftWidth: '6px',
                  borderStyle: 'solid',
                  borderRadius: 1,
                  background: 'rgba(30,30,30,0.7)',
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={
                        ability.rarity === 'extrasystem'
                          ? {
                              background: 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              fontWeight: 'bold',
                            }
                          : { color: RARITY_COLORS[ability.rarity], fontWeight: 'bold' }
                      }
                    >
                      {ability.name} (Ур. {ability.level}/{ability.maxLevel})
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={
                        ability.rarity === 'extrasystem'
                          ? {
                              background: 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              fontWeight: 'bold',
                            }
                          : { color: RARITY_COLORS[ability.rarity] }
                      }
                    >
                      {RARITY_LABELS[ability.rarity]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ability.description}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    {ability.rarity !== 'extrasystem' && (
                      <>
                        <IconButton
                          size="small"
                          onClick={() => handleLevelUpAbility(ability)}
                          disabled={readonly || points.on <= 0 || ability.level >= ability.maxLevel}
                        >+1 ОН</IconButton>
                        {ability.level < ability.maxLevel ? (
                          <IconButton
                            size="small"
                            onClick={() => handleLevelUp10Ability(ability)}
                            disabled={readonly || points.lon <= 0 || ability.level >= ability.maxLevel}
                          >+10 ЛОН</IconButton>
                        ) : (
                          <IconButton
                            size="small"
                            onClick={() => handleEvolveAbility(ability)}
                            disabled={readonly || points.lon <= 0 || RARITY_ORDER.indexOf(ability.rarity) === RARITY_ORDER.length - 1}
                          >ЭВО ЛОН</IconButton>
                        )}
                        <IconButton size="small" onClick={() => handleEditAbility({
                          id: ability.id,
                          name: ability.name,
                          description: ability.description,
                          rank: ability.rarity as any,
                          level: ability.level,
                          maxLevel: ability.maxLevel
                        })} disabled={readonly}>✎</IconButton>
                        <IconButton size="small" onClick={() => handleDeleteAbility(ability.id!)} disabled={readonly}>🗑</IconButton>
                      </>
                    )}
                    {ability.rarity === 'extrasystem' && (
                      <>
                        <IconButton size="small" onClick={() => handleEditAbility({
                          id: ability.id,
                          name: ability.name,
                          description: ability.description,
                          rank: ability.rarity as any,
                          level: ability.level,
                          maxLevel: ability.maxLevel
                        })} disabled={readonly}>✎</IconButton>
                        <IconButton size="small" onClick={() => handleDeleteAbility(ability.id!)} disabled={readonly}>🗑</IconButton>
                      </>
                    )}
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Paper>
        <AbilityDialog
          open={isAbilityDialogOpen}
          onClose={() => { setIsAbilityDialogOpen(false); setEditingAbility(null); setCreatingAbilityType(null); }}
          onSave={handleSaveAbility}
          initialData={editingAbility || undefined}
          readonly={readonly}
        />
      </Box>
      {/* Центральная/правая часть: инфо, описание, вкладки, картинка */}
      <Box sx={{ width: '70%', display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Имя персонажа</Typography>
            <TextField
              fullWidth
              value={character.name}
              onChange={e => onCharacterChange({ ...character, name: e.target.value })}
              disabled={readonly}
              sx={{ mb: 2 }}
            />
            <Typography variant="body2">Раса</Typography>
            <TextField
              fullWidth
              value={character.race || ''}
              onChange={e => onCharacterChange({ ...character, race: e.target.value })}
              disabled={readonly}
              sx={{ mb: 2 }}
            />
            <Typography variant="body2">Шаблон: Nova Игрок</Typography>
            <Typography variant="caption" color="text.secondary">
              {/* Здесь можно добавить дату создания и изменения */}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Описание</Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={character.description || ''}
              onChange={e => onCharacterChange({ ...character, description: e.target.value })}
              disabled={readonly}
            />
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Дополнительные вкладки</Typography>
            <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
              {tabs.map((tab, i) => (
                <Tab
                  key={tab.id}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        value={tab.title}
                        onChange={e => handleTabTitleChange(i, e.target.value)}
                        variant="standard"
                        sx={{ width: 80, mr: 1 }}
                        disabled={readonly}
                      />
                      {tabs.length > 1 && !readonly && (
                        <IconButton size="small" onClick={() => handleRemoveTab(i)}>
                          ×
                        </IconButton>
                      )}
                    </Box>
                  }
                  value={i}
                  sx={{ minHeight: 36 }}
                />
              ))}
              {!readonly && (
                <Tab label={'+ ДОБАВИТЬ ВКЛАДКУ'} onClick={handleAddTab} sx={{ minHeight: 36 }} />
              )}
            </Tabs>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={tabs[tabIndex]?.content || ''}
                onChange={e => handleTabContentChange(tabIndex, e.target.value)}
                disabled={readonly}
              />
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Изображение персонажа</Typography>
            <Box sx={{ width: '100%', aspectRatio: '3/4', border: '2px dashed grey', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, position: 'relative', background: '#181818' }}>
              {character.mainImage ? (
                <Box
                  component="img"
                  src={character.mainImage}
                  alt="Character"
                  sx={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', maxHeight: '100%', maxWidth: '100%' }}
                />
              ) : (
                <Box sx={{ textAlign: 'center', opacity: 0.5 }}>
                  <AddPhotoAlternateIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography color="textSecondary">ЗАГРУЗИТЬ</Typography>
                </Box>
              )}
              <input
                type="file"
                hidden
                accept="image/*"
                id="main-image-upload"
                onChange={handleImageUpload}
                disabled={readonly}
              />
              <label htmlFor="main-image-upload" style={{ position: 'absolute', inset: 0, cursor: 'pointer' }} />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}; 