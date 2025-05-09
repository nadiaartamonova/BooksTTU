import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(login, password);
      localStorage.setItem('token', data.token); 
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка входа');
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        padding: 2
      }}
    >
      <Paper 
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: '100%',
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" textAlign="center" mb={3} color="#1976d2">
          Вход
        </Typography>
        <Box 
          component="form" 
          onSubmit={handleLogin} 
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <TextField
            label="Логин"
            variant="outlined"
            fullWidth
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Пароль"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          {error && <Typography color="error" mb={2}>{error}</Typography>}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{
              padding: "10px 0",
              fontWeight: "bold",
              textTransform: "none",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#1565c0",
              }
            }}
          >
            Войти
          </Button>
        </Box>
        <Typography textAlign="center" mt={2}>
          Нет аккаунта?{" "}
          <Link 
            onClick={() => navigate('/register')} 
            sx={{ cursor: "pointer", color: "#1976d2", textDecoration: "underline" }}
          >
            Зарегистрироваться
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginForm;
