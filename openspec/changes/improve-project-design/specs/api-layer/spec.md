## ADDED Requirements

### Requirement: Единый Axios instance с базовым URL
Система ДОЛЖНА использовать единый экземпляр Axios, созданный через `axios.create()`, с `baseURL`, загружаемым из `import.meta.env.VITE_SERVER_HOST`. Все API вызовы в приложении ДОЛЖНЫ использовать этот instance вместо прямых вызовов `axios.request()`.

#### Scenario: Создание Axios instance
- **WHEN** приложение инициализируется
- **THEN** создаётся единый Axios instance с `baseURL` из переменной окружения

#### Scenario: Использование instance в store
- **WHEN** store вызывает API
- **THEN** используется импортированный instance, а не `axios.request()`

### Requirement: Request interceptor для авторизации
Axios instance ДОЛЖЕН добавлять заголовок `Authorization: Bearer <token>` ко всем запросам, если токен присутствует в `localStorage`. Токен ДОЛЖЕН читаться как строка без `JSON.stringify`.

#### Scenario: Запрос с токеном
- **WHEN** токен существует в localStorage
- **THEN** заголовок `Authorization: Bearer <token>` добавляется к запросу

#### Scenario: Запрос без токена
- **WHEN** токен отсутствует в localStorage
- **THEN** запрос отправляется без заголовка Authorization

### Requirement: Response interceptor для обработки ошибок
Axios instance ДОЛЖЕН обрабатывать HTTP ошибки: при статусе 401 — перенаправлять пользователя на `/catalog` и удалять токен из localStorage; при статусе 500 — выводить уведомление об ошибке сервера.

#### Scenario: Ошибка 401 Unauthorized
- **WHEN** сервер возвращает статус 401
- **THEN** токен удаляется из localStorage и пользователь перенаправляется на `/catalog`

#### Scenario: Ошибка 500 Server Error
- **WHEN** сервер возвращает статус 500
- **THEN** выводится уведомление об ошибке сервера
