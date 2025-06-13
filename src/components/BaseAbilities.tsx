import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Character, Ability, AbilityRarity } from "../types/character";
import { RARITY_COLORS, RARITY_LABELS } from '../constants';

interface BaseAbilitiesProps {
  character: Character;
  onCharacterChange: (character: Character) => void;
  readonly?: boolean;
}

export const BaseAbilities = ({
  character,
  onCharacterChange,
  readonly = false,
}: BaseAbilitiesProps) => {
  const handleAddAbility = () => {
    const newAbility: Ability = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      rarity: 'common',
      level: 1,
      maxLevel: 10
    };

    onCharacterChange({
      ...character,
      abilities: [...(character.abilities || []), newAbility],
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const handleRemoveAbility = (id: string) => {
    onCharacterChange({
      ...character,
      abilities: character.abilities?.filter((ability) => ability.id !== id) || [],
      lastModifiedAt: new Date().toISOString(),
    });
  };

  const handleAbilityChange = (id: string, field: keyof Ability, value: any) => {
    onCharacterChange({
      ...character,
      abilities: character.abilities?.map((ability) =>
        ability.id === id ? { ...ability, [field]: value } : ability
      ) || [],
      lastModifiedAt: new Date().toISOString(),
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {character.abilities?.map((ability) => (
        <Box
          key={ability.id}
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: ability.confirmed ? 'success.main' : 'divider',
            borderRadius: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            position: 'relative',
            '&:hover': {
              borderColor: ability.confirmed ? 'success.main' : 'primary.main',
            },
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Название"
            value={ability.name}
            onChange={(e) => handleAbilityChange(ability.id, 'name', e.target.value)}
              disabled={readonly || ability.confirmed}
              fullWidth
              size="small"
              sx={{ flex: 2 }}
            />
            <FormControl size="small" sx={{ flex: 1 }}>
              <InputLabel>Редкость</InputLabel>
              <Select
                value={ability.rarity}
                onChange={(e) => handleAbilityChange(ability.id, 'rarity', e.target.value)}
                disabled={readonly || ability.confirmed}
                label="Редкость"
                sx={{
                  color: RARITY_COLORS[ability.rarity as AbilityRarity],
                  '& .MuiSelect-icon': {
                    color: RARITY_COLORS[ability.rarity as AbilityRarity],
                  },
                }}
              >
                {Object.entries(RARITY_LABELS).slice(0, 7).map(([value, label]) => (
                  <MenuItem 
                    key={value} 
                    value={value}
                    sx={{ 
                      color: RARITY_COLORS[value as AbilityRarity],
                      '&.Mui-selected': {
                        backgroundColor: `${RARITY_COLORS[value as AbilityRarity]}22`,
                      },
                      '&:hover': {
                        backgroundColor: `${RARITY_COLORS[value as AbilityRarity]}33`,
                      },
                    }}
                  >
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <TextField
            label="Описание"
            value={ability.description}
            onChange={(e) => handleAbilityChange(ability.id, 'description', e.target.value)}
            disabled={readonly || ability.confirmed}
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          {!readonly && (
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              {ability.confirmed ? (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleAbilityChange(ability.id, 'confirmed', false)}
                >
                  Редактировать
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAbilityChange(ability.id, 'confirmed', true)}
                  disabled={!ability.name || !ability.description}
                >
                  Подтвердить
                </Button>
              )}
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleRemoveAbility(ability.id)}
          >
            Удалить
          </Button>
            </Box>
          )}
        </Box>
      ))}

      {!readonly && (
      <Button
        variant="contained"
        onClick={handleAddAbility}
          fullWidth
      >
        Добавить способность
      </Button>
      )}
    </Box>
  );
}; 