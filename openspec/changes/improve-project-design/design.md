## Context

Приложение "Планета Электрика" — внутренний корпоративный каталог сотрудников на Vue 3 + Pinia + Naive UI. Текущее состояние кода характеризуется:

- **Монолитный store** (`stores/index.js`, 416 строк) без обработки ошибок
- **5 дубликатов** компонента CatalogRow в разных директориях
- **Отсутствует Axios instance** — каждый вызов вручную строит config
- **Нет route guards** — все маршруты редактирования открыты
- **59 `console.log`** в исходном коде
- **Stub-компоненты** (`LoginModel.vue` = "awd", `IconContact.vue` = "*")
- **Директория-копия** `OrgStructView copy/` импортируется в router

Все API вызова используют `await axios.request(config)` без try/catch. Токен авторизации сохраняется через `JSON.stringify(localStorage.getItem('token'))`, что добавляет лишние кавычки.

## Goals / Non-Goals

**Goals:**
- Создать единый Axios instance с auth interceptor и error interceptor
- Защитить маршруты редактирования через `router.beforeEach`
- Консолидировать дубликаты компонентов в один shared компонент
- Исправить критические баги (токен, HTTP метод `addRoles`, undefined переменные)
- Удалить dead code и stub-файлы
- Добавить prop validation во все компоненты
- Убрать все `console.log` из продакшн-кода

**Non-Goals:**
- Не добавлять новый функционал (только улучшение существующего)
- Не переводить на TypeScript (отдельная задача)
- Не добавлять тесты (отдельная задача)
- Не менять UI/UX дизайн (внешний вид остаётся прежним)
- Не рефакторить CSS архитектуру (отдельная задача)

## Decisions

### 1. Axios instance: отдельный модуль `src/api/client.js`

**Решение:** Создать `src/api/client.js` с `axios.create()`, настроить:
- `baseURL` из `import.meta.env.VITE_SERVER_HOST`
- Request interceptor: добавлять `Authorization: Bearer <token>` из localStorage
- Response interceptor: ловить 401 (редирект на логин), 500 (toast ошибка)

**Альтернативы:**
- Встроить в store — отклонено, store должен управлять состоянием, а не HTTP
- Использовать Vue plugin — избыточно для одного клиента

### 2. Route guards: `beforeEach` в `router/index.js`

**Решение:** Добавить `router.beforeEach`, который проверяет наличие токена в localStorage для всех маршрутов кроме `/catalog`. Если токена нет — перенаправлять на `/catalog`.

**Альтернативы:**
- `beforeEnter` на каждый маршрут — больше дублирования
- Отдельный auth middleware — избыточно для frontend

### 3. Консолидация CatalogRow: оставить одну версию

**Решение:** Оставить `src/components/CatalogRow.vue` как основной. Удалить дубликаты из:
- `src/views/WorkerCatalogView/components/CatalogRow.vue`
- Все `ItemBlock.vue` что импортируют свои локальные CatalogRow

Все импорты привести к `@/components/CatalogRow.vue`.

**Альтернативы:**
- Создать новый унифицированный компонент — больше работы, тот же результат
- Оставить как есть — технический долг растёт

### 4. Обработка ошибок: try/catch + Naive UI notification

**Решение:** В каждую async функцию store добавить try/catch. При ошибке — `window.$notification?.error()` с сообщением. При успехе — без уведомлений (тихий режим).

**Альтернативы:**
- Создать отдельную утилиту уведомлений — избыточно, Naive UI уже подключён
- Пробрасывать ошибки вверх — компоненты не готовы к обработке

### 5. Удаление `OrgStructView copy/`: удалить полностью

**Решение:** Директория содержит копию RolesView. Удалить директорию целиком, импорты в router изменить на `@/views/RolesView/` (переместитьRolesView в отдельную директорию).

**Альтернативы:**
- Переименовать в `RolesView/` — то же самое, но требует аккуратного перемещения

### 6. S3 URL: вынести в `.env`

**Решение:** Добавить `VITE_S3_URL=https://s3.twcstorage.ru/136703eb-05e89941-0f10-4e65-b543-d67d43f62dea` в `.env`. Заменить hardcoded URL в компонентах на `import.meta.env.VITE_S3_URL`.

## Risks / Trade-offs

| Риск | Митигация |
|------|-----------|
| Axios interceptor может сломать существующие запросы с кастомными headers | Протестировать все endpoints после добавления interceptor |
| Удаление `console.log` затруднит отладку | Заменить на условный logger, который пишет только в dev режиме |
| Консолидация CatalogRow может сломать стили в разных view | Проверить все 4 view после замены импортов |
| Route guards могут заблокировать легитимных пользователей | Guards проверяют только наличие токена, не валидность |
| Удаление `OrgStructView copy/` сломает `/edit_roles` маршрут | Убедиться что RolesView корректно импортируется из нового места |
