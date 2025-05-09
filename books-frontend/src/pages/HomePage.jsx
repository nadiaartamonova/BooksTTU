
import "../components/HomePage.css";
// src/pages/HomePage.jsx
import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import BookCard from "../components/BookCard";

const HomePage = ({ books, notFound }) => {
  console.log("Rendering HomePage with books:", books);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Список книг
      </Typography>
      {notFound ? (
        <Typography variant="h6" align="center">
          Книги не найдены.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
