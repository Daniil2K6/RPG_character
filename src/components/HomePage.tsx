import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { Add as AddIcon, Upload as UploadIcon } from '@mui/icons-material';
import { TEMPLATES, type Character, type TemplateType } from '../types/character';
import { Timer } from './Timer';

interface HomePageProps {
  onCreateCharacter: (templateType: TemplateType) => void;
  onLoadCharacter: (character: Character) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onCreateCharacter,
  onLoadCharacter,
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const character = JSON.parse(e.target?.result as string) as Character;
          // Проверяем, что загруженный персонаж имеет правильный шаблон
          if (!TEMPLATES[character.templateType]) {
            throw new Error('Неизвестный тип шаблона');
          }
          onLoadCharacter(character);
        } catch (error) {
          alert('Ошибка при загрузке файла. Убедитесь, что файл содержит корректные данные персонажа.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Создание персонажа RPG
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Создать нового персонажа:
          </Typography>
          <Stack spacing={2}>
            {Object.values(TEMPLATES).map((template) => (
              <Button
                key={template.type}
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => onCreateCharacter(template.type)}
                fullWidth
              >
                Шаблон ({template.name})
                <Typography
                  variant="caption"
                  component="span"
                  sx={{ ml: 2, opacity: 0.8 }}
                >
                  {template.description}
                </Typography>
              </Button>
            ))}
          </Stack>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Загрузить существующего персонажа:
          </Typography>
          <Button
            variant="outlined"
            component="label"
            size="large"
            startIcon={<UploadIcon />}
            fullWidth
          >
            Выбрать файл
            <input
              type="file"
              hidden
              accept=".json"
              onChange={handleFileUpload}
            />
          </Button>
        </Box>
      </Paper>
      <Timer />
    </Container>
  );
}; 