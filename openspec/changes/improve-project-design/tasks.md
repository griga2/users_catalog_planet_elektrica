## 1. Подготовка и рефакторинг структуры

- [ ] 1.1 Создать директорию `src/api/` и файл `src/api/client.js`
- [ ] 1.2 Создать утилиту `src/utils/debug.js` для условного логирования (только dev режим)
- [ ] 1.3 Переместить `src/views/OrgStructView copy/RolesView.vue` в `src/views/RolesView/RolesView.vue`
- [ ] 1.4 Обновить импорт RolesView в `src/router/index.js` на новый путь
- [ ] 1.5 Удалить директорию `src/views/OrgStructView copy/` целиком
- [ ] 1.6 Удалить `src/components/LoginModel.vue`
- [ ] 1.7 Удалить `src/views/WorkerCatalogView/components/IconContact.vue`

## 2. Создание Axios instance (api-layer)

- [ ] 2.1 Создать `axios.create()` с `baseURL` из `import.meta.env.VITE_SERVER_HOST` в `src/api/client.js`
- [ ] 2.2 Добавить request interceptor: читать токен из localStorage и добавлять `Authorization: Bearer <token>` (без JSON.stringify)
- [ ] 2.3 Добавить response interceptor: обрабатывать 401 (удалить токен, редирект на `/catalog`)
- [ ] 2.4 Добавить response interceptor: обрабатывать 500 (вывести ошибку через Naive UI notification)
- [ ] 2.5 Добавить `VITE_S3_URL` в `.env` с текущим S3 URL

## 3. Миграция store на Axios instance (error-handling)

- [ ] 3.1 Заменить все `axios.request()` на импортированный instance в `src/stores/index.js`
- [ ] 3.2 Заменить все `axios.request()` на импортированный instance в `src/stores/user.js`
- [ ] 3.3 Убрать `maxBodyLength: Infinity` из индивидуальных запросов (настроить в instance)
- [ ] 3.4 Добавить try/catch в `getBranches()` с возвратом `[]` при ошибке
- [ ] 3.5 Добавить try/catch в `getUsers()` с возвратом `[]` при ошибке
- [ ] 3.6 Добавить try/catch в `SearchUser()` с возвратом `[]` при ошибке
- [ ] 3.7 Добавить try/catch в `updateUser()` с уведомлением об ошибке
- [ ] 3.8 Добавить try/catch в `uploadFile()` с уведомлением об ошибке
- [ ] 3.9 Добавить try/catch в `addUser()` с уведомлением об ошибке
- [ ] 3.10 Добавить try/catch в `addBranch()` / `deleteBranch()` / `updateBranch()` с уведомлениями
- [ ] 3.11 Добавить try/catch в `getRoles()` / `updateRole()` / `addRoles()` с уведомлениями
- [ ] 3.12 Исправить HTTP метод в `addRoles()` с `'push'` на `'POST'`
- [ ] 3.13 Исправить `firstDayStart()` — убрать ссылку на undefined `body`
- [ ] 3.14 Исправить `login_user` — инициализировать как `ref(null)` и заполнять при аутентификации
- [ ] 3.15 Добавить loading states (`isLoading`, `isUpdating`) в store
- [ ] 3.16 Заменить все `console.log` на вызовы `debug()` утилиты

## 4. Route guards (route-protection)

- [ ] 4.1 Добавить `router.beforeEach` в `src/router/index.js`
- [ ] 4.2 Реализовать проверку токена из localStorage для маршрутов `/edit_struct`, `/edit_workers`, `/edit_roles`
- [ ] 4.3 Добавить редирект на `/catalog` если токен отсутствует
- [ ] 4.4 Протестировать прямой ввод URL в браузере

## 5. Исправление token handling (code-cleanup)

- [ ] 5.1 Исправить `setUser()` в `src/stores/user.js` — убрать бессмысленный `async/await` у localStorage
- [ ] 5.2 Исправить `PutToken()` — убрать `JSON.stringify` вокруг строки токена
- [ ] 5.3 Протестировать что Authorization заголовок содержит токен без лишних кавычек

## 6. Консолидация CatalogRow (code-cleanup)

- [ ] 6.1 Удалить `src/views/WorkerCatalogView/components/CatalogRow.vue`
- [ ] 6.2 Обновить импорты в `WorkerCatalogView/WorkerCatalogView.vue` на `@/components/CatalogRow.vue`
- [ ] 6.3 Обновить импорты в `EditUsersView` компонентах на `@/components/CatalogRow.vue`
- [ ] 6.4 Обновить импорты в `OrgStructView` компонентах на `@/components/CatalogRow.vue`
- [ ] 6.5 Обновить импорты в `RolesView` компонентах на `@/components/CatalogRow.vue`

## 7. Prop validation во всех компонентах (code-cleanup)

- [ ] 7.1 Обновить `defineProps` в `src/components/BranchTree.vue` на object syntax
- [ ] 7.2 Обновить `defineProps` в `src/components/CatalogRow.vue` на object syntax
- [ ] 7.3 Обновить `defineProps` в `src/components/EditTimeComponent.vue` на object syntax
- [ ] 7.4 Обновить `defineProps` в `src/components/WorkTimeComponent.vue` на object syntax
- [ ] 7.5 Обновить `defineProps` в `src/views/WorkerCatalogView/components/WorkerCard.vue` на object syntax
- [ ] 7.6 Обновить `defineProps` в `src/views/WorkerCatalogView/components/SearchBar.vue` на object syntax
- [ ] 7.7 Обновить `defineProps` в `src/views/WorkerCatalogView/components/BranchInfo.vue` на object syntax
- [ ] 7.8 Обновить `defineProps` в `src/views/EditUsersView/components/*.vue` на object syntax
- [ ] 7.9 Обновить `defineProps` в `src/views/OrgStructView/components/*.vue` на object syntax
- [ ] 7.10 Обновить `defineProps` в `src/views/RolesView/components/*.vue` на object syntax

## 8. Вынос S3 URL (code-cleanup)

- [ ] 8.1 Заменить hardcoded S3 URL в `WorkerCard.vue` на `import.meta.env.VITE_S3_URL`
- [ ] 8.2 Найти и заменить все остальные hardcoded S3 URL в компонентах
- [ ] 8.3 Протестировать загрузку и отображение фото

## 9. Удаление console.log и unused кода (code-cleanup)

- [ ] 9.1 Удалить/заменить все `console.log` в `src/stores/index.js`
- [ ] 9.2 Удалить/заменить все `console.log` в `src/stores/user.js`
- [ ] 9.3 Удалить/заменить все `console.log` в компонентах BranchTree, CatalogRow, WorkerCard
- [ ] 9.4 Удалить unused импорты (`onMounted`, `computed`, `watch`, `defineStore`) из всех файлов
- [ ] 9.5 Исправить `timeoutID` в `EditBLock.vue` с `ref('')` на `ref(null)`
- [ ] 9.6 Переименовать `findAndChenchArrow` → `findAndChangeArrow` (исправить typo)

## 10. Финальная проверка

- [ ] 10.1 Запустить `npm run lint` и исправить все ошибки
- [ ] 10.2 Запустить `npm run build` и убедиться что сборка проходит
- [ ] 10.3 Запустить `npm run dev` и проверить все 4 маршрута
- [ ] 10.4 Проверить что авторизация работает и guard-ы не блокируют легитимных пользователей
- [ ] 10.5 Проверить что ошибки API отображают уведомления
