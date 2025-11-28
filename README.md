# GymCRM Frontend

Современное фронтенд приложение для CRM системы управления спортивными клубами.

## Технологии

- **React 18** - UI библиотека
- **TypeScript 5** - Типизация
- **Vite** - Сборщик и dev сервер
- **React Router v6** - Роутинг с lazy loading
- **CSS3** - Стилизация с glassmorphism эффектами

## Требования

- Node.js 24.x
- npm или yarn

## Установка и запуск

```bash
# Переключиться на Node.js 24
nvm use

# Установить зависимости
npm install

# Запустить dev сервер
npm run dev

# Собрать для продакшена
npm run build

# Предпросмотр продакшен сборки
npm run preview
```

## Структура проекта

```
src/
├── components/        # Переиспользуемые компоненты
│   ├── Layout/       # Header, Footer
│   ├── ui/           # Button, Card, Input, Modal
│   └── ProtectedRoute.tsx
├── contexts/         # React контексты
│   └── AuthContext.tsx
├── data/            # Mock данные
│   ├── mockClubs.ts
│   ├── mockApplications.ts
│   └── mockCRMData.ts
├── pages/           # Страницы приложения
│   ├── Home.tsx
│   ├── ApplicationForm.tsx
│   ├── ClubCRM.tsx
│   └── AdminPanel.tsx
├── styles/          # Глобальные стили
│   ├── globals.css
│   └── animations.css
├── types/           # TypeScript типы
│   └── index.ts
├── App.tsx          # Главный компонент
└── main.tsx         # Точка входа
```

## Функциональность

### 1. Главная страница (/)
- Список всех подключенных спортивных клубов
- Поиск по названию и городу
- Фильтрация по видам спорта
- Карточки с информацией о клубах

### 2. Форма заявки (/application)
- Многошаговая форма подачи заявки
- Валидация полей
- Выбор видов спорта
- Success состояние после отправки

### 3. CRM клуба (/crm)
- **Требует авторизации** (роль: club_admin)
- Dashboard со статистикой
- Список членов клуба
- Расписание тренировок
- Mock данные для демонстрации

### 4. Админ панель (/admin)
- **Требует авторизации** (роль: super_admin)
- Просмотр всех заявок
- Фильтрация по статусу
- Одобрение/отклонение заявок

## Mock авторизация

Для входа используйте следующие учетные данные:

**Администратор (super_admin):**
- Email: `admin@gymcrm.ru`
- Пароль: `password`

**Менеджер клуба (club_admin):**
- Email: `club@titan.ru`
- Пароль: `password`

**Другие клубы:**
- Email: `club@champions.ru`
- Пароль: `password`

## Дизайн

Приложение использует современный дизайн с:
- Glassmorphism эффектами
- Vibrant градиентами
- Анимированным фоном
- Smooth transitions и micro-animations
- Адаптивным дизайном
- Dark mode

## Lazy Loading

Все страницы загружаются динамически с помощью React.lazy() и Suspense для оптимизации производительности.

## Разработка

Проект настроен с:
- Hot Module Replacement (HMR)
- TypeScript strict mode
- ESLint для линтинга
- Path aliases (@/*)

## Лицензия

MIT
