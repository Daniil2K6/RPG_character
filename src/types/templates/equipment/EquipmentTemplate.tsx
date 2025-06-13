import { Box, Button, Paper, TextField, Typography, IconButton } from "@mui/material";
import { Character, EquipmentSlot, EquipmentItem, CharacterStats, StatMultipliers, StatKey } from "../../../types/character";
import { CharacterStatsComponent } from "../../../components/CharacterStats";
import { BaseAbilities } from "../../../components/BaseAbilities";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DownloadIcon from '@mui/icons-material/Download';
import { RaceAndClassSelector } from '../../../components/RaceAndClassSelector';
import { CLASSES } from '../../../constants/classes';
import { RACES } from '../../../constants/races';
import { STAT_NAMES, BASE_STATS } from '../../../constants/stats';
import { TabPanel } from '../../../components/TabPanel';

interface EquipmentTemplateProps {
  character: Character;
  onCharacterChange: (character: Character) => void;
  readonly?: boolean;
}

const LEFT_SLOTS: Array<{ id: EquipmentSlot; label: string }> = [
  { id: 'head', label: 'Голова' },
  { id: 'chest', label: 'Грудь' },
  { id: 'legs', label: 'Ноги' }
];

const RIGHT_SLOTS: Array<{ id: EquipmentSlot; label: string }> = [
  { id: 'neck', label: 'Шея' },
  { id: 'shoulders', label: 'Плечи' },
  { id: 'feet', label: 'Ботинки' }
];

const calculateEquipmentBonuses = (character: Character): StatMultipliers => {
  const totalBonuses: StatMultipliers = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    magic: 0
  };
  Object.values(character.equipment).forEach(item => {
    if (item?.bonuses) {
      Object.entries(item.bonuses).forEach(([stat, bonus]) => {
        totalBonuses[stat as keyof StatMultipliers] += bonus;
      });
    }
  });
  return totalBonuses;
};

export const EquipmentTemplate = ({
  character,
  onCharacterChange,
  readonly = false,
}: EquipmentTemplateProps) => {
  // Получаем множители класса
  const classMultipliers = CLASSES[character.class]?.multipliers || {
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
    magic: 1
  };

  // Получаем суммарные бонусы снаряжения
  const equipmentBonuses = calculateEquipmentBonuses(character);

  const handleImageUpload = (slot: EquipmentSlot) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onCharacterChange({
          ...character,
          equipment: {
            ...character.equipment,
            [slot]: {
              ...character.equipment?.[slot],
              image: event.target?.result as string,
              name: character.equipment?.[slot]?.name || '',
              description: character.equipment?.[slot]?.description || '',
              bonuses: character.equipment?.[slot]?.bonuses || {
                strength: 0,
                dexterity: 0,
                constitution: 0,
                intelligence: 0,
                wisdom: 0,
                charisma: 0,
                magic: 0
              }
            }
          },
          lastModifiedAt: new Date().toISOString(),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEquipmentChange = (slot: EquipmentSlot, field: keyof EquipmentItem, value: string) => {
    onCharacterChange({
      ...character,
      equipment: {
        ...character.equipment,
        [slot]: {
          ...character.equipment?.[slot],
          [field]: value,
          bonuses: character.equipment?.[slot]?.bonuses || {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
            magic: 0
          }
        }
      },
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const handleBonusChange = (slot: EquipmentSlot, stat: keyof CharacterStats, value: number) => {
    if (value < 0) return;
    const currentItem = character.equipment?.[slot] || {
      name: '',
      description: '',
      bonuses: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
        magic: 0
      }
    };
    onCharacterChange({
      ...character,
      equipment: {
        ...character.equipment,
        [slot]: {
          ...currentItem,
          bonuses: {
            ...currentItem.bonuses,
            [stat]: value
          }
        }
      },
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const handleRemoveEquipment = (slot: EquipmentSlot) => {
    const newEquipment = { ...character.equipment };
    delete newEquipment[slot];
    onCharacterChange({
      ...character,
      equipment: newEquipment,
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const renderEquipmentInfo = (item: { id: EquipmentSlot; label: string }) => {
    const bonuses = character.equipment?.[item.id]?.bonuses || {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
      magic: 0
    };
    return (
      <Paper
        sx={{
          p: 1.5,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: (theme) => theme.shadows[4]
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <TextField
          size="small"
          label="Название предмета"
          value={character.equipment?.[item.id]?.name || ''}
          onChange={(e) => handleEquipmentChange(item.id, 'name', e.target.value)}
          disabled={readonly}
          sx={{ 
              flex: 1,
              mr: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)'
            }
          }}
        />
          <IconButton
            size="small"
            onClick={() => handleRemoveEquipment(item.id)}
            disabled={readonly}
            sx={{ 
              color: '#ec407a',
              '&:hover': { 
                backgroundColor: 'rgba(236, 64, 122, 0.1)'
              }
            }}
          >
            <RemoveIcon />
          </IconButton>
        </Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Бонусы:</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {Object.entries(bonuses).map(([stat, value]) => (
            <Box key={stat} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ flex: 1, color: 'text.secondary' }}>
                {STAT_NAMES[stat as keyof CharacterStats]}:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={() => handleBonusChange(item.id, stat as keyof CharacterStats, Math.max(0, Number(value) - 1))}
                  disabled={readonly || value <= 0}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography sx={{ minWidth: '24px', textAlign: 'center' }}>
                  {Number(value)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleBonusChange(item.id, stat as keyof CharacterStats, Number(value) + 1)}
                  disabled={readonly}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    );
  };

  const renderEquipmentSlot = (item: { id: EquipmentSlot; label: string }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      {/* Slot Label */}
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        {item.label}
      </Typography>
      {/* Equipment Image or Empty Slot */}
      <Paper
        sx={{
          width: '100%',
          aspectRatio: '1/1',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      >
        {character.equipment?.[item.id]?.image ? (
          <Box
            component="img"
            src={character.equipment?.[item.id]?.image || ''}
            alt={character.equipment?.[item.id]?.name || ''}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <Box sx={{ textAlign: 'center', opacity: 0.5 }}>
            <AddPhotoAlternateIcon sx={{ fontSize: 24, mb: 0.5 }} />
            <Typography variant="caption">Пусто</Typography>
          </Box>
        )}
      </Paper>
      {/* Control Buttons */}
      <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
        {/* Upload Button */}
        <Button
          component="label"
          variant="outlined"
          size="small"
          disabled={readonly}
          sx={{ 
            flex: 1,
            minWidth: 0,
            fontSize: '0.75rem',
            height: '24px'
          }}
        >
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload(item.id)}
            disabled={readonly}
          />
          Загрузить
        </Button>
        {/* Remove Button */}
        <Button
          variant="outlined"
          size="small"
          color="error"
          disabled={readonly || !character.equipment?.[item.id]?.image}
          onClick={() => handleRemoveEquipment(item.id)}
          sx={{ 
            flex: 1,
            minWidth: 0,
            fontSize: '0.75rem',
            height: '24px'
          }}
        >
          Удалить
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '90vh', display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Верхняя часть */}
      <Box sx={{ display: "flex", gap: 2, minHeight: '600px', flex: 3 }}>
        {/* Основная информация */}
        <Box sx={{ width: "25%" }}>
          <Paper sx={{ p: 2, height: "100%", display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}>
                1
              </Box>
              Основная информация
            </Typography>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => {
                const characterData = JSON.stringify(character, null, 2);
                const blob = new Blob([characterData], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${character.name || 'character'}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1
              }}
            >
              Скачать
            </Button>
            <TextField
              fullWidth
              label="Имя"
              value={character.name}
              onChange={(e) =>
                onCharacterChange({
                  ...character,
                  name: e.target.value,
                  lastModifiedAt: new Date().toISOString(),
                })
              }
              disabled={readonly}
              sx={{ mb: 2 }}
            />
            <RaceAndClassSelector
              character={character}
              onCharacterChange={onCharacterChange}
              readonly={readonly}
            />
            <TextField
              fullWidth
              type="number"
              label="Уровень"
              value={character.level}
              onChange={(e) =>
                onCharacterChange({
                  ...character,
                  level: parseInt(e.target.value) || 1,
                  lastModifiedAt: new Date().toISOString(),
                })
              }
              disabled={readonly}
              sx={{ mt: 2, mb: 2 }}
            />
            {/* Итоговые характеристики */}
            <Box sx={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: 1,
              p: 2
            }}>
              <Typography variant="subtitle2" sx={{ 
                mb: 2,
                color: '#81d4fa',
                textAlign: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                pb: 1
              }}>
                Итоговые характеристики
              </Typography>
              {(Object.keys(character.stats || {})
                .filter(key => key !== 'freePoints') as StatKey[])
                .map((stat) => {
                  const baseValue = character.stats?.[stat] ?? BASE_STATS[stat];
                  const raceMultiplier = character.race ? RACES[character.race]?.multipliers[stat] ?? 1 : 1;
                  const classMultiplier = character.class ? CLASSES[character.class]?.multipliers[stat] ?? 1 : 1;
                  const equipmentBonuses = calculateEquipmentBonuses(character);
                  const equipmentBonus = equipmentBonuses[stat] || 0;
                  const finalValue = Number((baseValue * raceMultiplier + equipmentBonus * classMultiplier).toFixed(1));

                  return (
                    <Box key={stat} sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: '32px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <Typography sx={{ flex: 1 }}>
                        {STAT_NAMES[stat] || stat}
                      </Typography>
                      <Typography>
                        {finalValue}
                      </Typography>
                    </Box>
                  );
                })}
            </Box>
          </Paper>
        </Box>
        {/* Внешний вид */}
        <Box sx={{ width: "75%" }}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}>
                2
              </Box>
              Внешний вид
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              height: 'calc(100% - 40px)',
              gap: 2,
              alignItems: 'flex-start'
            }}>
              {/* Информация о левых предметах */}
              <Box sx={{ 
                width: '22%', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                maxHeight: 'calc(100% - 40px)', 
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                  },
                },
              }}>
                {LEFT_SLOTS.map(renderEquipmentInfo)}
              </Box>
              {/* Левые ячейки предметов */}
              <Box sx={{ width: '10%', display: 'flex', flexDirection: 'column', gap: 6, mt: -2 }}>
                {LEFT_SLOTS.map((slot, index) => (
                  <div key={slot.id}>
                    {renderEquipmentSlot(slot)}
                    <Box sx={{ 
                      position: 'relative',
                      height: '150px',
                      display: 'flex',
                      alignItems: 'center',
                      ...(index === LEFT_SLOTS.length - 1 ? {
                        position: 'absolute',
                        height: 'auto',
                        left: '-190px',
                        bottom: '0px',
                      } : {})
                    }}>
                      <TextField
                        multiline
                        rows={5}
                        placeholder="Описание предмета..."
                        value={character.equipment?.[slot.id]?.description || ''}
                        onChange={(e) => {
                          onCharacterChange({
                            ...character,
                            equipment: {
                              ...character.equipment,
                              [slot.id]: {
                                ...character.equipment?.[slot.id],
                                description: e.target.value
                              }
                            },
                            lastModifiedAt: new Date().toISOString(),
                          });
                        }}
                        disabled={readonly}
                        sx={{ 
                          position: 'absolute',
                          left: '50%',
                          width: '180px',
                          transform: 'translateX(-50%)',
                          '& .MuiInputBase-root': {
                            fontSize: '0.875rem',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                          }
                        }}
                      />
                    </Box>
                  </div>
                ))}
              </Box>
              {/* Основное изображение */}
              <Box sx={{ width: '36%', display: 'flex', alignItems: 'center', mt: -2 }}>
                <Paper
                  component="label"
                  sx={{
                    width: '100%',
                    aspectRatio: '3/4',
                    border: '2px dashed rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'scale(1.02)',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)'
                    }
                  }}
                >
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          onCharacterChange({
                            ...character,
                            mainImage: event.target?.result as string,
                            lastModifiedAt: new Date().toISOString(),
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    disabled={readonly}
                  />
                  {character.mainImage ? (
                    <Box
                      component="img"
                      src={character.mainImage}
                      alt="Character"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <Box sx={{ textAlign: 'center', opacity: 0.5 }}>
                      <AddPhotoAlternateIcon sx={{ fontSize: 40, mb: 1 }} />
                      <Typography>ЗАГРУЗИТЬ</Typography>
                    </Box>
                  )}
                </Paper>
              </Box>
              {/* Правые ячейки предметов */}
              <Box sx={{ width: '10%', display: 'flex', flexDirection: 'column', gap: 6, mt: -2 }}>
                {RIGHT_SLOTS.map((slot, index) => (
                  <div key={slot.id}>
                    {renderEquipmentSlot(slot)}
                    <Box sx={{ 
                      position: 'relative',
                      height: '150px',
                      display: 'flex',
                      alignItems: 'center',
                      ...(index === RIGHT_SLOTS.length - 1 ? {
                        position: 'absolute',
                        height: 'auto',
                        right: '-190px',
                        bottom: '0px',
                      } : {})
                    }}>
                      <TextField
                        multiline
                        rows={5}
                        placeholder="Описание предмета..."
                        value={character.equipment?.[slot.id]?.description || ''}
                        onChange={(e) => {
                          onCharacterChange({
                            ...character,
                            equipment: {
                              ...character.equipment,
                              [slot.id]: {
                                ...character.equipment?.[slot.id],
                                description: e.target.value
                              }
                            },
                            lastModifiedAt: new Date().toISOString(),
                          });
                        }}
                        disabled={readonly}
                        sx={{ 
                          position: 'absolute',
                          left: '50%',
                          width: '180px',
                          transform: 'translateX(-50%)',
                          '& .MuiInputBase-root': {
                            fontSize: '0.875rem',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                          }
                        }}
                      />
                    </Box>
                  </div>
                ))}
              </Box>
              {/* Информация о правых предметах */}
              <Box sx={{ 
                width: '22%', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                maxHeight: 'calc(100% - 40px)', 
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                  },
                },
              }}>
                {RIGHT_SLOTS.map(renderEquipmentInfo)}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
      {/* Средняя часть */}
      <Box sx={{ display: 'flex', gap: 2, minHeight: '400px', flex: 2 }}>
        {/* Заготовка */}
        <Box sx={{ width: '30%' }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}>
                3
              </Box>
              Заготовка
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Описание"
              value={character.description}
              onChange={(e) =>
                onCharacterChange({
                  ...character,
                  description: e.target.value,
                  lastModifiedAt: new Date().toISOString(),
                })
              }
              disabled={readonly}
            />
          </Paper>
        </Box>
        {/* Дополнительные характеристики */}
        <Box sx={{ width: '37%' }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}>
                4
              </Box>
              Дополнительные характеристики
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* Названия характеристик */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Характеристика</Typography>
                {(Object.keys(character.stats || {}).filter(key => key !== 'freePoints') as StatKey[]).map((key) => (
                  <Typography key={key} sx={{ 
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
                    minWidth: 120 
                  }}>
                    {STAT_NAMES[key as keyof CharacterStats] || key}:
                  </Typography>
                ))}
              </Box>
              {/* Бонусы */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center' }}>Снаряжение</Typography>
                {(Object.keys(character.stats || {}).filter(key => key !== 'freePoints') as StatKey[]).map((key) => (
                  <Box key={key} sx={{ 
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography sx={{ 
                      width: '90%',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}>
                      {(equipmentBonuses[key] || 0).toFixed(1)}
                    </Typography>
                  </Box>
                ))}
              </Box>
              {/* Множители */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center' }}>Класс</Typography>
                {(Object.keys(character.stats || {}).filter(key => key !== 'freePoints') as StatKey[]).map((key) => (
                  <Box key={key} sx={{ 
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography sx={{ 
                      width: '90%',
                      textAlign: 'center',
                      color: (classMultipliers[key] || 1) < 1 ? 'error.main' : 
                             (classMultipliers[key] || 1) > 1 ? 'success.main' : 
                             'text.secondary'
                    }}>
                      ×{(classMultipliers[key] || 1).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>
              {/* Итоговые значения */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center' }}>Итого</Typography>
                {(Object.entries(character.stats || {})
                  .filter(([key]) => key !== 'freePoints')
                  .map(([key]) => key) as StatKey[])
                  .map((key) => (
                  <Typography key={key} sx={{ 
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                      justifyContent: 'center',
                    color: 'text.secondary', 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
                    minWidth: 30 
                  }}>
                      {(equipmentBonuses[key] * (classMultipliers[key] || 1)).toFixed(1)}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Paper>
        </Box>
        {/* Основные характеристики */}
        <Box sx={{ width: '33%' }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}>
                5
              </Box>
              Основные характеристики
            </Typography>
            <Box sx={{ mt: 2 }}>
            <CharacterStatsComponent
              character={character}
              onCharacterChange={onCharacterChange}
              readonly={readonly}
            />
            </Box>
          </Paper>
        </Box>
      </Box>
      {/* Нижняя часть */}
      <Box sx={{ display: 'flex', gap: 2, minHeight: '400px', flex: 1, mt: 2 }}>
        {/* Способности */}
        <Box sx={{ width: '70%' }}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}>
                6
              </Box>
              Способности
            </Typography>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <BaseAbilities
              character={character}
              onCharacterChange={onCharacterChange}
              readonly={readonly}
            />
            </Box>
          </Paper>
        </Box>
        {/* Вкладки */}
        <Box sx={{ width: '30%' }}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}>
                7
              </Box>
              Вкладки
            </Typography>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <TabPanel
                tabs={character.customTabs}
                onTabsChange={(newTabs) => {
                onCharacterChange({
                  ...character,
                    customTabs: newTabs,
                  lastModifiedAt: new Date().toISOString(),
                });
              }}
                readonly={readonly}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}; 