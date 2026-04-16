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
├── src/
│   ├── assets/              # Шрифты (Circe) и статические ресурсы
│   ├── components/          # Переиспользуемые компоненты
│   │   ├── BranchTree.vue         # Дерево структурных подразделений
│   │   ├── CatalogRow.vue         # Строка каталога
│   │   ├── EditTimeComponent.vue  # Редактирование рабочего времени
│   │   ├── LoginModel.vue         # Модальное окно авторизации
│   │   └── WorkTimeComponent.vue  # Отображение рабочего времени
│   ├── router/              # Конфигурация маршрутов
│   │   └── index.js
│   ├── stores/              # Pinia хранилища
│   │   ├── counter.js       # Пример стора (счётчик)
│   │   ├── index.js         # Основной стор для работы с сотрудниками
│   │   └── user.js          # Стор авторизации и данных пользователя
│   ├── views/               # Страницы приложения
│   │   ├── EditUsersView/       # Редактирование сотрудников
│   │   ├── LayoutView/          # Основной лейаут
│   │   ├── OrgStructView/       # Организационная структура
│   │   ├── OrgStructView copy/  # Редактирование ролей (RolesView)
│   │   └── WorkerCatalogView/   # Каталог сотрудников
│   ├── App.vue              # Корневой компонент
│   └── main.js              # Точка входа
├── public/                  # Публичные статические файлы
├── Dockerfile               # Многоступенчатая Docker сборка
├── nginx.conf               # Конфигурация Nginx для production
├── vite.config.js           # Конфигурация Vite
├── .eslintrc.cjs            # Конфигурация ESLint
├── .prettierrc.json         # Конфигурация Prettier
└── jsconfig.json            # Конфигурация JavaScript (алиасы @)
```

## Маршруты (Routing)

| Путь | Имя | Описание |
|------|-----|----------|
| `/catalog` | `catalog` | Каталог сотрудников |
| `/edit_struct` | `editor` | Редактирование организационной структуры |
| `/edit_workers` | `edit_workers` | Редактирование сотрудников |
| `/edit_roles` | `edit_roles` | Редактирование ролей |

Все маршруты являются дочерними относительно `LayoutView`.

## Хранилища (Pinia Stores)

### `useUserStore` (`stores/user.js`)
Управление авторизацией и данными текущего пользователя:
- `Login(login, pass)` — авторизация
- `getUser()` — получение данных пользователя по токену
- `UpdateBio(bio)` — обновление био пользователя
- `userExit()` — выход из системы
- `user` — реактивный объект с данными (id, name, role, token)

### `useWorkerStore` (`stores/index.js`)
Основной стор для работы с каталогом:
- `getBranches()` — получение структуры подразделений
- `getUsers()` — получение сотрудников подразделения
- `SearchUser(text, open, date)` — поиск сотрудников
- `updateBranch()` / `updateUser()` / `updateRole()` — обновление данных
- `addBranch()` / `deleteBranch()` / `moveBranch()` — управление подразделениями
- `uploadFile(image)` — загрузка фото сотрудника
- `hiringEmployer()` — оформление приема на работу
- `catalog` — дерево структурных подразделений
- `users` — список сотрудников
- `current_catalog` / `current_user` / `current_role` — текущие выбранные объекты

## Сборка и запуск

### Установка зависимостей
```sh
npm install
```

### Разработка (hot-reload, порт 8080)
```sh
npm run dev
```

### Сборка для production
```sh
npm run build
```

### Preview production сборки
```sh
npm run preview
```

### Линтинг
```sh
npm run lint
```

### Форматирование кода
```sh
npm run format
```

### Docker сборка
```sh
docker build -t worker_catalog .
docker run -p 8080:80 -d worker_catalog
```

## Переменные окружения

Приложение использует переменную окружения:
- `VITE_SERVER_HOST` — URL бэкенд-сервера для API запросов (авторизация, каталог, сотрудники)

> **Примечание:** Файл `.env` отсутствует в репозитории. Необходимо создать его локально:
> ```
> VITE_SERVER_HOST=http://localhost:3005
> ```

## Код-стайл и соглашения

### ESLint
- Расширяет `plugin:vue/vue3-essential` и `@vue/eslint-config-prettier`
- Поддержка современного синтакса ES

### Prettier
- Без точек с запятой (`semi: false`)
- Одинарные кавычки (`singleQuote: true`)
- Ширина строки: 100 символов
- Без trailing запятых
- Отступ: 2 пробела

### Алиасы импортов
- `@/` — алиас для `src/` (настроен в `jsconfig.json` и `vite.config.js`)

## API интеграция

Бэкенд API находится на отдельном сервере (определяется через `VITE_SERVER_HOST`). Основные эндпоинты:

### Авторизация
- `POST /auth/loginUser` — вход
- `POST /auth/getUserDate` — получение данных пользователя

### Каталог
- `GET /catalog/branches` — список подразделений
- `GET /catalog/branch` — данные подразделения
- `GET /catalog` — сотрудники подразделения
- `GET /catalog/search` — поиск сотрудников
- `GET /catalog/roles` — список ролей
- `PUT /catalog/branch` — обновление подразделения
- `PUT /catalog/user` — обновление сотрудника
- `PUT /catalog/updateRole` — обновление роли
- `PUT /catalog/insertBranch` — вставка подразделения
- `PUT /catalog/moveBranch` — перемещение подразделения
- `PUT /catalog/move_role` — перемещение роли
- `DELETE /catalog/deleteBranch` — удаление подразделения
- `POST /catalog/addBranch` — добавление подразделения
- `POST /catalog/addRole` — добавление роли
- `POST /catalog/add_user` — добавление сотрудника
- `POST /catalog/upload_photo/:id` — загрузка фото
- `POST /catalog/hiring_employer` — прием на работу
- `PUT /catalog/updateBio` — обновление био
- `PUT /catalog/contact` — обновление контактов
- `PUT /catalog/userRole` — обновление роли пользователя

## Особенности архитектуры

- **Docker:** Многоступенчатая сборка — сначала Node.js для build, затем Nginx для production
- **Nginx:** Конфигурация поддерживает SPA роутинг (`try_files $uri $uri/ /index.html`)
- **Шрифты:** Используются кастомные шрифты Circe (various weights), загружаются через `@font-face`
- **Авторизация:** Токен хранится в localStorage, передается в заголовке `Authorization`

## Примечания

- Папка `OrgStructView copy` содержит компонент `RolesView.vue` (вероятно, результат копирования при рефакторинге)
- В `stores/index.js` есть незавершенные функции (`removeUserStart`, `firstDayStart` содержат пустые или некорректные реализации)
- В `stores/index.js` импортируется `find` из `naive-ui/es/_utils/cssr` — это внутренняя утилита Naive UI, что может быть нестабильным
