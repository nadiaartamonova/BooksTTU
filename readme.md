#  Веб-приложение для управления библиотекой книг

## Краткое описание

Этот проект представляет собой веб-приложение для управления библиотекой книг, которое позволяет пользователям просматривать, комментировать книги, а администраторам управлять книгами, категориями и пользователями.

---

TO START

terminal 1
start node server (folder booksProject)
` npm run dev  `


Start frontend (folder books-frontend)
`npx nodemon app.js `

For testing

ROle user

login: test1 
password: 123

ROle admin

login: admin 
password: 123


---

## Оглавление

1. [Архитектура проекта](#архитектура-проекта)
2. [Структура проекта](#структура-проекта)
    - [Backend](#backend-nodejs-express-sequelize-postgresql)
    - [Frontend](#frontend-react-material-ui)
    - [База данных (PostgreSQL)](#база-данных-postgresql)
3. [Функциональность приложения](#функциональность-приложения)
    - [NavBar](#navbar)
    - [BookCard](#bookcard-карточка-книги)
    - [SearchForm](#searchformjsx)
    - [BookDetailsPage](#bookdetailspagejsx)
    - [EditBookPage](#editbookpagejsx)
    - [HomePage](#homepagejsx)
    - [LoginPage](#loginpagejsx)
    - [LogsPage](#logspagejsx)
    - [NewBookPage](#newbookpagejsx)
    - [NotFoundPage](#notfoundpagejsx)
    - [RegisterPage](#registerpagejsx)
    - [AuthContext](#authcontextjsx)

---

## Архитектура проекта

- React Context API для управления состоянием авторизации.
- Компонентная структура с разделением логики (NavBar, BookCard и др.).
- Взаимодействие с сервером через Axios с централизованной настройкой API.
- Адаптивный интерфейс на базе Material-UI.

---

## Структура проекта

### Backend (Node.js, Express, Sequelize, PostgreSQL)

- `/controllers`
  - `authController.js`
  - `bookController.js`
  - `commentController.js`
  - `logController.js`
  - `authorController.js`
  - `categoryController.js`
- `/middlewares`
  - `authMiddleware.js`
  - `logAction.js`
- `/models`
  - `User.js`, `Role.js`, `UserRole.js`
  - `Book.js`, `Author.js`, `Category.js`
  - `Comment.js`, `Log.js`
- `/routes`
  - `authRoutes.js`, `booksRoutes.js`, `commentsRoutes.js`
  - `logsRoutes.js`, `authorRoutes.js`, `categoryRoutes.js`
- `/config`
  - `database.js`
- `swagger/swagger.json` — документация API
- `app.js`, `server.js`

---
## Авторизация

Используется JWT токен. Для авторизованных запросов необходимо передавать токен в заголовке

test
ˇˇˇ
user
{
  "title": "test 3",
  "year": "2345"
}
ˇˇˇ
admin
ˇˇˇ
login: admin 
password: 123
ˇˇˇ

## Секции

* [Auth](#auth)
* [Books](#books)
* [Comments](#comments)
* [Users](#users)
* [Categories](#categories)
* [Logs](#logs)
* [Authors](#authors)

---

## Auth

### `GET /api/auth/me`

Получение информации о текущем пользователе.

**Ответы:**

* `200 OK`: `{ id, login, roles }`
* `401 Unauthorized`
* `403 Forbidden`

---

### `POST /api/auth/register`

Регистрация нового пользователя.

**Body:**

```json
{
  "login": "nadia",
  "password": "123"
}
```

**Ответы:**

* `201 Created`
* `400 Bad Request`
* `500 Server Error`

---

### `POST /api/auth/login`

Аутентификация пользователя.

**Body:**

```json
{
  "login": "nadia",
  "password": "123"
}
```

**Ответы:**

* `200 OK`: возвращает JWT токен
* `401 Unauthorized`
* `500 Server Error`

---

## Books

### `GET /api/books`

Получить список всех книг с авторами и категориями.

### `POST /api/books`

Создать книгу (Admin).

```json
{
  "title": "Преступление и наказание",
  "year": 1866,
  "authorIds": [1, 2],
  "categoryIds": [3, 4]
}
```

### `GET /api/books/search?query=...`

Поиск книг по названию.

### `GET /api/books/:id`

Получить одну книгу по ID (с авторами и категориями).

### `PUT /api/books/:id`

Обновить книгу (Admin).

```json
{
  "title": "Новая книга",
  "year": 2020,
  "authorIds": [1],
  "categoryIds": [2, 3]
}
```

### `DELETE /api/books/:id`

Удалить книгу (Admin).

---

## Comments

### `POST /api/comments`

Создать комментарий (только авторизованные).

```json
{
  "content": "Отличная книга!",
  "BookID": 1
}
```

### `GET /api/comments/book/:bookId`

Получить комментарии к книге.

### `PUT /api/comments/:id`

Редактировать комментарий (только автор).

### `DELETE /api/comments/:id`

Удалить комментарий (автор или админ).

---

## Users

### `POST /api/users/:userId/roles`

Назначить роль пользователю (Admin).

```json
{
  "roleId": 2
}
```

---

## Categories

### `GET /api/categories`

Список категорий.

### `POST /api/categories`

Создание категории (Admin).

```json
{
  "name": "Роман"
}
```

### `GET /api/categories/:id`

Получение категории по ID.

### `PUT /api/categories/:id`

Обновление категории (Admin).

### `DELETE /api/categories/:id`

Удаление категории (Admin).

---

## Logs

### `GET /api/logs`

Получить список логов действий пользователей (Admin).

---

## Authors

### `GET /api/authors`

Получить список всех авторов.

### `POST /api/authors`

Создание автора (Admin).

```json
{
  "firstName": "Лев",
  "lastName": "Толстой"
}
```

### `GET /api/authors/:id`

Получение автора по ID.

### `PUT /api/authors/:id`

Обновление автора (Admin).

### `DELETE /api/authors/:id`

Удаление автора (Admin).

---

## Примечания

* Все Admin-only маршруты требуют авторизации и наличия роли Admin.
* Для авторизованных запросов необходимо передавать заголовок Authorization.


# Валидация данных (Backend)

## Автор (`/api/authors`)
### Создание автора
- `firstName`: **обязательное** строковое поле.
- `lastName`: **обязательное** строковое поле.

### Обновление автора
- Проверяется существование автора по `id`.
- Обновляются только переданные поля (`firstName`, `lastName`).

## Категория (`/api/categories`)
### Создание категории
- `name`: **обязательное** строковое поле.

### Обновление категории
- Проверяется наличие категории по `id`.
- Обновляется поле `name`.

## Книга (`/api/books`)
### Создание книги
- `title`: **обязательное** строковое поле (не должно быть пустым или состоять из пробелов).
- `year`: **обязательное** числовое поле. Допустимое значение — от `1500` до текущего года.
- `authorIds`: **обязательный массив ID** авторов. Должен содержать хотя бы одного автора.
- `categoryIds`: **обязательный массив ID** категорий. Должен содержать хотя бы одну категорию.

**Дополнительно:**
- Проверяется существование всех указанных `authorIds` и `categoryIds`.
- Если хотя бы один не существует — возвращается `400 Bad Request`.

### Обновление книги
- Проверяется, существует ли книга по `id`.
- Выполняются те же проверки, что и при создании.

## Комментарий (`/api/comments`)
### Создание комментария
- `content`: **обязательное** текстовое поле (не должно быть пустым).
- `BookID`: **обязательное** числовое поле. Должен указывать на существующую книгу.

### Обновление / Удаление
- Только автор комментария может редактировать или удалять его.
- Администратор также может удалять любой комментарий.

## Назначение роли (`/api/users/:userId/roles`)
- Проверяется существование пользователя (`userId`) и роли (`roleId`).
- Если у пользователя уже есть роль — она удаляется перед назначением новой.
- Только **администратор** может назначать роли.
- При попытке повторного назначения той же роли возвращается ошибка.

## Поиск книг (`/api/books/search`)
- `query`: **обязательный** параметр в строке запроса.
- Поиск осуществляется по:
  - названию книги;
  - имени или фамилии автора;
  - названию категории.
---

### Frontend (React, Material-UI)

- `/src/components`
  - `NavBar.jsx`, `BookCard.jsx`, `LoginForm.jsx`, `RegisterForm.jsx`
- `/src/context`
  - `AuthContext.jsx`
- `/src/pages`
  - `HomePage.jsx`, `BookDetailsPage.jsx`, `EditBookPage.jsx`, `NewBookPage.jsx`
  - `LoginPage.jsx`, `RegisterPage.jsx`, `LogsPage.jsx`, `NotFoundPage.jsx`
- `/src/services`
  - `api.js`
- `App.jsx`, `index.js`

---

### База данных (PostgreSQL)

- `User`, `Role`, `UserRole`
- `Book`, `Author`, `BookAuthor`
- `Category`, `BookCategory`
- `Comment`, `Log`

---

## Функциональность приложения

### Для гостей

- Просмотр всех книг
- Поиск по названию, автору, категории
- Сообщение, если книга не найдена
- Страница 404 при недопустимом маршруте

### Для авторизованных пользователей

- Комментирование книг
- Просмотр комментариев с именем автора

### Для администратора

- Добавление, редактирование, удаление книг
- Просмотр логов действий
- Фильтрация логов по действию

---

## NavBar

- Поле поиска
- Аутентификация (войти/выйти)
- Меню пользователя с действиями по ролям

### Валидация

- Контролируемое поле поиска
- Обнуление запроса при смене страницы

---

## BookCard (Карточка книги)

- Отображение информации: название, год, авторы, категории
- Переход на подробную страницу по клику

---

## SearchForm.jsx

- Поиск по названию, автору, категории
- Вызывает `onSearch` из родителя
- Без валидации — передаёт только заполненные поля

---

## BookDetailsPage.jsx

- Просмотр книги
- Отправка комментариев
- Редактирование/удаление (только для администратора)
- Защита по ролям

---

## EditBookPage.jsx

- Изменение данных книги
- Доступ только для администратора
- Клиентская валидация полей

---

## HomePage.jsx

- Список книг через `BookCard`
- Отображение сообщения при отсутствии книг

---

## LoginPage.jsx

- Ввод логина и пароля
- Валидация обязательных полей
- Отображение ошибок
- Сохранение токена в контексте

---

## LogsPage.jsx

- Отображение логов действий пользователей
- Фильтрация по действию
- Защищённая страница (только для администратора)

---

## NewBookPage.jsx

- Добавление новой книги
- Обязательные поля: название, год, авторы, категории
- Только для администратора

---

## NotFoundPage.jsx

- Обработка несуществующих маршрутов
- Сообщение 404 и кнопка возврата

---

## RegisterPage.jsx

- Регистрация нового пользователя
- Валидация совпадения паролей
- Отображение ошибок
- Автоматический переход на логин после успеха

---

## AuthContext.jsx

- Контекст авторизации
- Методы login/logout
- Проверка токена и получение пользователя
- Централизованное управление состоянием пользователя

---

## Примечание

- Проект использует JWT для авторизации.
- Все защищённые маршруты проверяются на стороне сервера.
- Интерфейс реализован с использованием Material-UI.

---
