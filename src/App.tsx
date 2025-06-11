import { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { HomePage } from './components/HomePage';
import { CharacterCard } from './components/CharacterCard';
import { type Character, type TemplateType, DEFAULT_CHARACTER } from './types/character';
import { TEMPLATES } from './types/templates';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [character, setCharacter] = useState<Character | null>(null);

  const handleCreateCharacter = (templateType: TemplateType) => {
    const template = TEMPLATES[templateType];
    const newCharacter: Character = {
      ...DEFAULT_CHARACTER,
      id: crypto.randomUUID(),
      templateType,
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
    };

    // Добавляем специфичные для шаблона свойства
    if (templateType === 'base') {
      newCharacter.stats = template.defaultStats;
      newCharacter.freePoints = template.initialFreePoints;
      newCharacter.novaPoints = undefined;
    } else if (templateType === 'nova-player') {
      newCharacter.novaPoints = template.initialPoints;
      newCharacter.stats = undefined;
      newCharacter.freePoints = undefined;
    }

    setCharacter(newCharacter);
  };

  const handleLoadCharacter = (loadedCharacter: Character) => {
    setCharacter(loadedCharacter);
  };

  const handleBack = () => {
    setCharacter(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {character ? (
        <CharacterCard
          character={character}
          onCharacterChange={setCharacter}
          onBack={handleBack}
        />
      ) : (
        <HomePage
          onCreateCharacter={handleCreateCharacter}
          onLoadCharacter={handleLoadCharacter}
        />
      )}
    </ThemeProvider>
  );
}

export default App; 