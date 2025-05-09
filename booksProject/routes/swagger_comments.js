/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Регистрация и вход
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Регистрация нового пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 example: nadia
 *               password:
 *                 type: string
 *                 example: 123
 *     responses:
 *       201:
 *         description: Пользователь создан
 *       400:
 *         description: Неверные данные
 *       500:
 *         description: Ошибка сервера
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Вход пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 example: nadia
 *               password:
 *                 type: string
 *                 example: 123
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверные учётные данные
 *       500:
 *         description: Ошибка сервера
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Выход пользователя (в Swagger фиктивный)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Получить данные текущего пользователя
 *     description: Возвращает информацию о текущем пользователе (id, login, роли).
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешный ответ с данными пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 login:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Пользователь не авторизован
 *       403:
 *         description: Недействительный токен
 */


/**
 * @swagger
 * /api/authors:
 *   get:
 *     tags: [Authors]
 *     summary: Получить список всех авторов
 *     responses:
 *       200:
 *         description: Список авторов
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     tags: [Authors]
 *     summary: Получить автора по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Автор найден
 *       404:
 *         description: Автор не найден
 */

/**
 * @swagger
 * /api/authors:
 *   post:
 *     tags: [Authors]
 *     summary: Создать автора (только Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Лев
 *               lastName:
 *                 type: string
 *                 example: Толстой
 *     responses:
 *       201:
 *         description: Автор создан
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     tags: [Authors]
 *     summary: Обновить данные автора (только Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Автор обновлён
 *       404:
 *         description: Автор не найден
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     tags: [Authors]
 *     summary: Удалить автора (только Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Автор удалён
 *       404:
 *         description: Автор не найден
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: CRUD операции с книгами (с авторами и категориями)
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags: [Books]
 *     summary: Получить список всех книг с авторами и категориями
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список книг
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags: [Books]
 *     summary: Получить список всех книг с авторами и категориями
 *     responses:
 *       200:
 *         description: Список книг
 */

/**
 * @swagger
 * /api/books/search:
 *   get:
 *     tags: [Books]
 *     summary: Поиск книг по названию
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Строка поиска по названию книги
 *     responses:
 *       200:
 *         description: Список найденных книг
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   year:
 *                     type: integer
 *                   Authors:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                   Categories:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 */


/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Получить книгу по ID с авторами и категориями
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Книга найдена
 *       404:
 *         description: Книга не найдена
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     tags: [Books]
 *     summary: Создать новую книгу с авторами и категориями (только Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - year
 *               - authorIds
 *               - categoryIds
 *             properties:
 *               title:
 *                 type: string
 *                 example: Преступление и наказание
 *               year:
 *                 type: integer
 *                 example: 1866
 *               authorIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [3, 4]
 *     responses:
 *       201:
 *         description: Книга создана
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Ошибка сервера
 */

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     tags: [Books]
 *     summary: Обновить книгу с авторами и категориями (только Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               year:
 *                 type: integer
 *               authorIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1]
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [2, 3]
 *     responses:
 *       200:
 *         description: Книга обновлена
 *       404:
 *         description: Книга не найдена
 */

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     tags: [Books]
 *     summary: Удалить книгу с авторами и категориями (только Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Книга удалена
 *       404:
 *         description: Книга не найдена
 */


/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Работа с комментариями к книгам
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     tags: [Comments]
 *     summary: Добавить комментарий к книге (только для залогиненных пользователей)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - BookID
 *             properties:
 *               content:
 *                 type: string
 *                 example: Очень понравилась книга
 *               BookID:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Комментарий создан
 *       400:
 *         description: Неверные данные
 *       401:
 *         description: Необходима авторизация
 */

/**
 * @swagger
 * /api/comments/book/{bookId}:
 *   get:
 *     tags: [Comments]
 *     summary: Получить комментарии к книге по ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Список комментариев
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: Обновить комментарий (только автор комментария)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Обновлённый текст комментария
 *     responses:
 *       200:
 *         description: Комментарий обновлён
 *       403:
 *         description: Можно редактировать только свои комментарии
 *       404:
 *         description: Комментарий не найден
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Удалить комментарий (можно автору или админу)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Комментарий удалён
 *       403:
 *         description: Можно удалить только свои комментарии или быть админом
 *       404:
 *         description: Комментарий не найден
 */



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление ролями пользователей
 */

/**
 * @swagger
 * /api/users/{userId}/roles:
 *   post:
 *     tags: [Users]
 *     summary: Назначить роль пользователю (только для админа)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *             properties:
 *               roleId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Роль назначена пользователю
 *       400:
 *         description: Роль уже назначена
 *       403:
 *         description: Требуется роль администратора
 *       404:
 *         description: Пользователь или роль не найдены
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Управление категориями книг
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Получить список всех категорий
 *     responses:
 *       200:
 *         description: Список категорий
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Получить категорию по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Категория найдена
 *       404:
 *         description: Категория не найдена
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     summary: Создать категорию (только Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Роман
 *     responses:
 *       201:
 *         description: Категория создана
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Обновить данные категории (только Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Приключения
 *     responses:
 *       200:
 *         description: Категория обновлена
 *       404:
 *         description: Категория не найдена
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Удалить категорию (только Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Категория удалена
 *       404:
 *         description: Категория не найдена
 */

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Логирование действий пользователей
 */

/**
 * @swagger
 * /api/logs:
 *   get:
 *     tags: [Logs]
 *     summary: Получить список логов действий пользователей (только Admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список логов
 *       403:
 *         description: Требуется роль администратора
 */


