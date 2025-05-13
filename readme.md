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
