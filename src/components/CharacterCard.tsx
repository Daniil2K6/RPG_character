import { Box, Paper, Typography, Button } from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Character } from '../types/character';
import { BaseTemplate } from '../types/templates/base/BaseTemplate';
import { NovaTemplate } from '../types/templates/nova-player/NovaTemplate';

interface CharacterCardProps {
  character: Character;
  onCharacterChange: (character: Character) => void;
  onBack: () => void;
  onSave: () => void;
  readonly?: boolean;
}

export const CharacterCard = ({
  character,
  onCharacterChange,
  onBack,
  onSave,
  readonly = false,
}: CharacterCardProps) => {
  const renderTemplate = () => {
    switch (character.templateType) {
      case 'nova-player':
        return (
          <NovaTemplate
            character={character}
            onCharacterChange={onCharacterChange}
            onBack={onBack}
            onSave={onSave}
            readonly={readonly}
          />
        );
      case 'base':
      default:
        return (
          <BaseTemplate
            character={character}
            onCharacterChange={onCharacterChange}
            readonly={readonly}
          />
        );
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ mr: 'auto' }}
        >
          Назад
        </Button>
        {!readonly && (
        <Button
          variant="contained"
            startIcon={<SaveIcon />}
            color="primary"
          onClick={() => {
              // Здесь будет логика сохранения
          }}
        >
          Сохранить
        </Button>
        )}
      </Box>

      {renderTemplate()}
    </Box>
  );
}; 