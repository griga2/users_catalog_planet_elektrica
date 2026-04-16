## ADDED Requirements

### Requirement: Консолидация компонента CatalogRow
В проекте ДОЛЖЕН существовать единственный компонент `CatalogRow` в `src/components/CatalogRow.vue`. Все дубликаты этого компонента в `src/views/*/components/` ДОЛЖНЫ быть удалены. Все импорты ДОЛЖНЫ указывать на `@/components/CatalogRow.vue`.

#### Scenario: Импорт из EditUsersView
- **WHEN** `EditUsersView` использует CatalogRow
- **THEN** он импортируется из `@/components/CatalogRow.vue`

#### Scenario: Удаление дубликата из WorkerCatalogView
- **WHEN** изменение применено
- **THEN** файл `src/views/WorkerCatalogView/components/CatalogRow.vue` удалён

### Requirement: Удаление dead code файлов
Файлы `src/components/LoginModel.vue` (содержит "awd") и `src/views/WorkerCatalogView/components/IconContact.vue` (содержит "*") ДОЛЖНЫ быть удалены. Директория `src/views/OrgStructView copy/` ДОЛЖНА быть удалена целиком, а `RolesView.vue` перемещён в `src/views/RolesView/`.

#### Scenario: Удаление LoginModel.vue
- **WHEN** изменение применено
- **THEN** файл `src/components/LoginModel.vue` удалён и не импортируется

#### Scenario: Перемещение RolesView
- **WHEN** изменение применено
- **THEN** `RolesView.vue` находится в `src/views/RolesView/RolesView.vue` и импортируется в router из нового пути

### Requirement: Исправление HTTP метода в addRoles
Функция `addRoles` в `useWorkerStore` ДОЛЖНА использовать HTTP метод `POST` вместо несуществующего метода `push`.

#### Scenario: Создание новой роли
- **WHEN** вызывается `addRoles()`
- **THEN** отправляется POST запрос на `${base_url}/catalog/role`

### Requirement: Вынос S3 URL в переменные окружения
URL S3 хранилища для фото сотрудников ДОЛЖЕН быть вынесен в переменную `VITE_S3_URL` в файле `.env`. Все hardcoded ссылки в компонентах ДОЛЖНЫ быть заменены на `import.meta.env.VITE_S3_URL`.

#### Scenario: Загрузка фото в WorkerCard
- **WHEN** `WorkerCard` отображает фото
- **THEN** URL формируется из `import.meta.env.VITE_S3_URL + user.Photo`

### Requirement: Prop validation во всех Vue компонентах
Все Vue компоненты ДОЛЖНЫ использовать object syntax в `defineProps` с указанием `type`, `required` и где применимо `default`. Массивный синтаксис `defineProps(['propName'])` ДОЛЖЕН быть заменён.

#### Scenario: Компонент с props
- **WHEN** компонент определён
- **THEN** `defineProps` использует `{ row: { type: Object, required: true } }` вместо `['row']`

### Requirement: Удаление console.log из продакшн-кода
Все `console.log` вызовы в исходном коде ДОЛЖНЫ быть удалены. Для отладочной информации ДОЛЖНА использоваться утилита `debug()`, которая логирует только когда `import.meta.env.DEV === true`.

#### Scenario: Production сборка
- **WHEN** запускается `npm run build`
- **THEN** в собранных файлах нет `console.log` вызовов

#### Scenario: Dev режим
- **WHEN** запускается `npm run dev`
- **THEN** отладочная информация выводится через `debug()` утилиту
