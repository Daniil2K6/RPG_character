import { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { HomePage } from './components/HomePage';
import { CharacterCard } from './components/CharacterCard';
import { TEMPLATES, type Character, type TemplateType } from './types/character';

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
      id: crypto.randomUUID(),
      name: 'Новый персонаж',
      race: '',
      level: 1,
      imageUrl: 'https://via.placeholder.com/300',
      description: 'Описание персонажа',
      stats: template.defaultStats,
      templateType,
      freePoints: template.initialFreePoints,
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
      abilities: [],
      customTabs: [],
    };
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