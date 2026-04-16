## Why

Текущее приложение каталога сотрудников "Планета Электрика" имеет ряд критических архитектурных проблем, которые накапливались в процессе разработки. Без их устранения технический долг будет продолжать расти, что затруднит поддержку и развитие системы. Основные проблемы: отсутствие обработки ошибок API, дублирование компонентов, небезопасное хранение токенов, отсутствие guard-ов на маршрутах редактирования, и множество отладочных `console.log` в продакшн-коде.

## What Changes

- **Добавить Axios instance** с interceptors для авторизации и централизованной обработки ошибок
- **Добавить route guards** для защиты маршрутов `/edit_struct`, `/edit_workers`, `/edit_roles`
- **Консолидировать дубликаты** компонентов CatalogRow (5 копий → 1) и удалить unused-файлы
- **Исправить обработку токенов** в localStorage (убрать некорректный JSON.stringify)
- **Добавить try/catch** во все async функции store с уведомлениями об ошибках
- **Удалить все `console.log`** из продакшн-кода
- **Исправить HTTP метод** в `addRoles` (с несуществующего `'push'` на `'POST'`)
- **Вынести S3 URL** в переменные окружения `.env`
- **Добавить prop validation** (object syntax) во все Vue компоненты
- **Удалить `OrgStructView copy`** директорию и stub-компоненты (`LoginModel.vue`, `IconContact.vue`)

## Capabilities

### New Capabilities
- `api-layer`: Единый Axios instance с авторизацией, базовым URL и обработкой ошибок
- `route-protection`: Guards на маршрутах редактирования, проверяющие аутентификацию
- `error-handling`: Try/catch во всех API вызовах с пользовательскими уведомлениями
- `code-cleanup`: Удаление дубликатов, stub-файлов, console.log, неиспользуемого кода

### Modified Capabilities
- Нет изменения существующих spec — все изменения являются улучшениями внутренней архитектуры без изменения внешнего поведения

## Impact

- **Затронутые файлы:** `src/stores/index.js`, `src/stores/user.js`, `src/router/index.js`, все Vue компоненты с `defineProps`
- **Новые файлы:** `src/api/client.js` (Axios instance)
- **Удаляемые файлы:** `src/views/OrgStructView copy/` (вся директория), `src/components/LoginModel.vue`, `src/components/CatalogRow.vue` (дубликаты)
- **Затронутые компоненты:** `WorkerCatalogView`, `EditUsersView`, `OrgStructView`, `RolesView`, `BranchTree`, `WorkerCard`
- **Переменные окружения:** Добавить `VITE_S3_URL` в `.env`
- **API поведение:** Не меняется — всё внешнее поведение сохраняется
