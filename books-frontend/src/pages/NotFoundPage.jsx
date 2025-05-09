// src/pages/NotFoundPage.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        minHeight: "80vh" 
      }}
    >
      <Typography variant="h3" color="#1976d2" mb={2}>
        404 - Страница не найдена
      </Typography>
      <Typography variant="body1" mb={3}>
        Похоже, что такой страницы не существует.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate("/")}
        sx={{
          padding: "10px 20px",
          textTransform: "none",
          fontWeight: "bold"
        }}
      >
        Вернуться на главную
      </Button>
    </Box>
  );
};

export default NotFoundPage;
