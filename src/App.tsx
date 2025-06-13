import { useState } from 'react';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Character, TemplateType } from './types/character';
import { EquipmentCharacter } from './components/EquipmentCharacter';
import { HomePage } from './components/HomePage';
import { createEmptyCharacter } from './components/CharacterCreator';
import { CharacterCard } from './components/CharacterCard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [character, setCharacter] = useState<Character | null>(null);

  const handleCharacterChange = (updatedCharacter: Character) => {
    setCharacter(updatedCharacter);
  };

  const handleCreateCharacter = (templateType: TemplateType) => {
    const newCharacter = createEmptyCharacter(templateType);
    setCharacter(newCharacter);
  };

  const handleLoadCharacter = (loadedCharacter: Character) => {
    setCharacter(loadedCharacter);
  };

  const renderCharacter = () => {
    if (!character) return null;

    switch (character.templateType) {
      case 'equipment':
        return (
          <EquipmentCharacter
            character={character}
            onCharacterChange={handleCharacterChange}
          />
        );
      case 'base':
      case 'nova-player':
        return (
          <CharacterCard
            character={character}
            onCharacterChange={handleCharacterChange}
            onBack={() => setCharacter(null)}
            onSave={() => console.log('Saving character:', character)}
          />
        );
      default:
        return <div>Неизвестный тип шаблона</div>;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container 
        maxWidth={false} 
        sx={{ 
          minHeight: '100vh',
          height: 'auto',
          py: 4,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ 
          flex: 1,
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {character ? (
            renderCharacter()
          ) : (
            <HomePage
              onCreateCharacter={handleCreateCharacter}
              onLoadCharacter={handleLoadCharacter}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;