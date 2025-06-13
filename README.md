# RPG Character Creator

A React-based RPG character creation application with support for multiple templates, equipment management, and Nova points system.

## Features

- Basic character stats and abilities
- Equipment management system
- Nova points system
- Race and class selection
- Character templates
- Custom tabs for additional information

## Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Building and Deployment

The application is configured to deploy to GitHub Pages automatically when changes are pushed to the main branch.

To build manually:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Technology Stack

- React
- TypeScript
- Material-UI
- Vite
- GitHub Actions for CI/CD

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Возможности

- 🎭 Создание персонажей с настраиваемыми характеристиками
- 📝 Редактируемое имя, описание и раса персонажа
- 🖼️ Загрузка изображения персонажа
- ⚡ Гибкая система характеристик с свободными очками
- 🎯 Управление способностями персонажа
- 📑 Пользовательские вкладки для дополнительной информации
- 💾 Сохранение и загрузка персонажей в формате JSON
- 📋 Два типа шаблонов персонажей: базовый и nova

## Технологии

- React
- TypeScript
- Material-UI (MUI)
- Vite

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/Daniil2K6/RPG_character.git
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите приложение:
```bash
npm run dev
```

## Структура интерфейса

Приложение разделено на две основные колонки:
- **Левая колонка**: характеристики и способности персонажа
- **Правая колонка**: информация о персонаже, описание и пользовательские вкладки

## Особенности

### Система характеристик
- Свободный ввод значений
- Управление через кнопки +/-
- Настраиваемое количество свободных очков

### Способности
- Раскрывающийся список способностей
- Добавление, редактирование и удаление
- Анимированное отображение описаний

### Пользовательские вкладки
- Создание собственных вкладок
- Редактируемое содержимое
- Гибкая система управления

## Лицензия

MIT