// src/pages/RegisterPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { TextField, Button, Box, Typography, Paper, Link as MuiLink, CircularProgress } from "@mui/material";

const RegisterPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", { login, password });
      setSuccess(true);
      setError("");
    } catch (err) {
      setError("Ошибка при регистрации. Возможно, логин уже используется.",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: 2
      }}
    >
      <Paper 
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" textAlign="center" mb={3} color="#1976d2">
          Регистрация
        </Typography>

        {!success ? (
          <Box component="form" onSubmit={handleRegister} sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Логин"
              variant="outlined"
              fullWidth
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Пароль"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Подтвердите пароль"
              variant="outlined"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 2 }}
              required
            />

            {error && <Typography color="error" mb={2}>{error}</Typography>}
            
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              disabled={loading}
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
              {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Зарегистрироваться"}
            </Button>
          </Box>
        ) : (
          <Box textAlign="center">
            <Typography variant="h5" color="success.main" mb={2}>
              Регистрация успешна!
            </Typography>
            <Typography>
              Вы будете перенаправлены на страницу входа через 3 секунды...
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default RegisterPage;
