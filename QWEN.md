# QWEN.md — Проект: Каталог сотрудников (Planet Elektrica)

## Обзор проекта

**Название:** worker_catalog  
**Описание:** Веб-приложение для каталогизации сотрудников компании "Планета Электрика". Предоставляет возможность просмотра организационной структуры, управления сотрудниками, редактирования ролей и структурных подразделений.

## Технологический стек

- **Фреймворк:** Vue 3 (Composition API)
- **Сборщик:** Vite 5
- **Роутинг:** Vue Router 4
- **Состояние:** Pinia
- **UI библиотека:** Naive UI
- **HTTP клиент:** Axios
- **Компоненты:** Vue Datepicker (@vuepic/vue-datepicker)
- **Линтинг:** ESLint + Prettier
- **Контейнеризация:** Docker (Nginx для production)

## Структура проекта

```
users_catalog_planet_elektrica/
├── src/
│   ├── assets/              # Шрифты (circe family) и статические ресурсы
│   ├── components/          # Переиспользуемые компоненты
│   │   ├── BranchTree.vue   # Дерево филиалов/отделов
│   │   ├── CatalogRow.vue   # Строка каталога
│   │   ├── EditTimeComponent.vue    # Редактор времени
│   │   └── WorkTimeComponent.vue    # Отображение рабочего времени
│   ├── router/              # Vue Router конфигурация
│   │   └── index.js         # Определение маршрутов
│   ├── stores/              # Pinia stores
│   │   ├── index.js         # Основной store для работников (useWorkerStore)
│   │   ├── user.js          # Store для аутентификации пользователей
│   │   └── counter.js       # (вероятно, демонстрационный store)
│   ├── views/               # Страницы приложения
│   │   ├── WorkerCatalogView/       # Основной каталог работников
│   │   │   ├── WorkerCatalogView.vue
│   │   │   └── components/         # Компоненты каталога
│   │   │       ├── BranchInfo.vue   # Информация о филиале
│   │   │       ├── CatalogRow.vue
│   │   │       ├── IconContact.vue  # Иконки контактов
│   │   │       ├── SearchBar.vue    # Поиск по каталогу
│   │   │       └── WorkerCard.vue   # Карточка работника
│   │   ├── LayoutView/             # Общий layout с навигацией
│   │   ├── EditUsersView/          # Редактирование пользователей
│   │   ├── OrgStructView/          # Редактор оргструктуры
│   │   └── OrgStructView copy/     # Редактор ролей (RolesView)
│   ├── App.vue              # Корневой компонент
│   └── main.js              # Точка входа приложения
├── public/                  # Публичные статические файлы
├── Dockerfile               # Multi-stage Docker build
├── nginx.conf               # Nginx конфигурация для production
├── .env                     # Переменные окружения
├── local.env                # Локальные переменные окружения
├── vite.config.js           # Vite конфигурация
├── package.json             # Зависимости и скрипты
├── .eslintrc.cjs            # ESLint настройки
├── .prettierrc.json         # Prettier настройки
└── jsconfig.json            # JS config для алиасов
```

## Маршруты приложения

- `/catalog` — Основной каталог сотрудников (WorkerCatalogView)
- `/edit_struct` — Редактор организационной структуры (OrgStructView)
- `/edit_workers` — Редактор пользователей (EditUsersView)
- `/edit_roles` — Редактор ролей (RolesView)

Все маршруты вложены в LayoutView.

## Хранилище состояния (Pinia Stores)

### useWorkerStore (`stores/index.js`)

Основной store, управляющий всем каталогом:

**Состояние:**
- `users` — список сотрудников
- `catalog` — иерархическое дерево филиалов/отделов
- `current_catalog` — текущий выбранный филиал
- `current_user` — текущий редактируемый сотрудник
- `roles` — список ролей
- `branch_buffer` — буфер для перемещения веток
- `finding` — флаг режима поиска

**Основные API методы (все запросы к `${VITE_SERVER_HOST}/catalog/*`):**
- `getBranches()` — получить дерево филиалов
- `getBranch(id)` — получить филиал по ID
- `getUsers()` — получить сотрудников текущего филиала
- `SearchUser(text, open, date)` — поиск сотрудников
- `addBranch()` / `deleteBranch()` / `updateBranch()` — управление филиалами
- `moveBranch(direction)` — перемещение ветки в дереве
- `insertBranch()` — вставка ветки
- `updateBranchStruct(newFather)` — изменение структуры
- `updateUser()` — обновление данных сотрудника
- `UpdateContact(contact)` — обновление контакта
- `uploadFile(image)` — загрузка фото сотрудника
- `addUser()` — добавление нового сотрудника
- `getRoles()` / `updateRole()` / `moveRoles()` / `addRoles()` — управление ролями

### useUserStore (`stores/user.js`)

Store для аутентификации:
- `user` — данные текущего пользователя (role, token, name)
- `Login()` — аутентификация
- `getUser()` — получение данных пользователя
- `setUser(token)` — сохранение токена

## Команды для разработки

### Установка зависимостей
```sh
npm install
```

### Запуск dev-сервера (с hot-reload)
```sh
npm run dev
```
Сервер запускается на порту **8080** (настроено в `vite.config.js`).

### Сборка для production
```sh
npm run build
```
Результат собирается в `/dist` директорию.

### Preview production сборки
```sh
npm run preview
```

### Линтинг кода
```sh
npm run lint
```

### Форматирование кода
```sh
npm run format
```

## Docker

### Сборка и запуск
```sh
# Сборка образа
docker build -t worker_catalog .

# Запуск контейнера
docker run -p 80:80 -d worker_catalog
```

Dockerfile использует multi-stage build:
1. **build-stage:** Node.js Alpine для сборки (`npm run build`)
2. **production-stage:** Nginx Alpine для раздачи статики

## Переменные окружения

Файл `.env` содержит настройку API сервера:

```env
VITE_SERVER_HOST = http://api.elektro.ru  # production
# VITE_SERVER_HOST = http://localhost:3000  # local dev
```

Для переключения на локальный API раскомментируйте нужную строку.

## API интеграция

Все API запросы идут через Axios к серверу, указанному в `VITE_SERVER_HOST`. Основные эндпоинты:

- `/auth/login` — аутентификация
- `/catalog/branches` — дерево филиалов
- `/catalog/branch` — работа с филиалом
- `/catalog` — сотрудники филиала
- `/catalog/search` — поиск сотрудников
- `/catalog/user` — обновление сотрудника
- `/catalog/contact` — обновление контактов
- `/catalog/upload_photo/:id` — загрузка фото
- `/catalog/add_user` — добавление сотрудника
- `/catalog/roles` / `/catalog/role` — управление ролями
- `/catalog/userRole` — назначение роли

## Соглашения по коду

- **Composition API** используется повсеместно (`<script setup>`)
- **Алиасы:** `@/` указывает на `src/` директорию
- **Шрифты:** Кастомные шрифты Circe (bold, extrabold, light, thin) загружаются как assets
- **Стили:** CSS scoped в Vue компонентах, глобальные стили в `index.html` (reset)
- **Цвет фона:** `#d3d3d3` для основного layout
- **UI компоненты:** Naive UI для стандартных элементов (формы, модалки, таблицы)
- **Russian language:** Весь пользовательский интерфейс на русском языке

## Важные замечания

1. **Внешний API:** Проект зависит от backend API сервера (Node.js/Express, судя по структуре эндпоинтов)
2. **Отсутствуют тесты:** В проекте нет тестовой конфигурации
3. **Нет TypeScript:** Проект использует чистый JavaScript (jsconfig.json настроен для алиасов)
4. **localStorage:** Токен аутентификации хранится в localStorage
5. **Vite алиас:** `@/` маппится на `src/` для удобных импортов
6. **Навигация:** LayoutView содержит навигацию между всеми view через RouterLink
