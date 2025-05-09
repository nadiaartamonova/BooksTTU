// src/components/BookCard.jsx
import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <Card 
      sx={{ 
        width: "250px", 
        height: "370px", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        boxShadow: 3,
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      <Box 
        sx={{ 
          backgroundColor: "#1976d2", 
          color: "#fff", 
          p: 1, 
          textAlign: "center", 
          height: "50px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center"
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {book.title}
        </Typography>
      </Box>
      <CardContent 
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "flex-start",
          padding: "16px",
          flexGrow: 1
        }}
      >
        <Typography variant="body2" color="textSecondary">
          <strong>Год издания:</strong> {book.year}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: "8px" }}>
          <strong>Авторы:</strong> {book.Authors?.map((author) => `${author.firstName} ${author.lastName}`).join(", ")}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: "8px" }}>
          <strong>Категории:</strong> {book.Categories?.map((category) => category.name).join(", ")}
        </Typography>
      </CardContent>
      <Divider sx={{ my: 1 }} />
      <Box 
  sx={{ 
    padding: "20px 15px", 
    display: "flex", 
    justifyContent: "flex-end" 
  }}
>
  <Typography 
    variant="body2" 
    sx={{ 
      color: "#1976d2", 
      cursor: "pointer", 
      textDecoration: "underline", 
      "&:hover": { textDecoration: "none", opacity: 0.8 }
    }}
    onClick={() => navigate(`/books/${book.id}`)}
  >
    Подробнее
  </Typography>
</Box>
    </Card>
  );
};

export default BookCard;
