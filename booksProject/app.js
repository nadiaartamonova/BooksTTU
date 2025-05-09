// app.js
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerSpec');

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

app.use(express.json());

// Swagger документация
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Подключаем маршруты
const authRoutes = require('./routes/authRoutes');
const booksRoutes = require('./routes/booksRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const authorRoutes = require('./routes/authorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const logsRoutes = require('./routes/logsRoutes');

// Проверка работы API
app.get('/api', (req, res) => {
  res.json({
    message: 'API работает! Используйте маршруты /api/books, /api/auth и другие.',
    documentation: '/api/docs'
  });
});

// Подключаем маршруты
app.use('/api/auth', authRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/logs', logsRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
