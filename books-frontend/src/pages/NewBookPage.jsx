// src/pages/NewBookPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Box, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem, Paper, CircularProgress } from "@mui/material";

const NewBookPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [authorIds, setAuthorIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.roles?.includes("Admin")) {
      navigate("/");
    }
    fetchAuthorsAndCategories();
  }, [user]);

  const fetchAuthorsAndCategories = async () => {
    try {
      const [authorsRes, categoriesRes] = await Promise.all([
        api.get("/authors"),
        api.get("/categories"),
      ]);
      setAuthors(authorsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error("Ошибка при загрузке данных:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Название книги не может быть пустым.");
      return;
    }

    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1500 || year > currentYear) {
      setError(`Год должен быть числом между 1500 и ${currentYear}.`);
      return;
    }

    if (authorIds.length === 0) {
      setError("Выберите хотя бы одного автора.");
      return;
    }

    if (categoryIds.length === 0) {
      setError("Выберите хотя бы одну категорию.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/books", {
        title,
        year,
        authorIds,
        categoryIds,
      });
      navigate("/");
    } catch (err) {
      console.error("Ошибка при создании книги:", err);
      setError("Ошибка при создании книги.");
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
          maxWidth: 500,
          width: "100%",
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" textAlign="center" mb={3} color="#1976d2">
          Добавить новую книгу
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Название книги"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="Год издания"
            variant="outlined"
            type="number"
            fullWidth
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />

          <FormControl fullWidth>
            <InputLabel>Авторы</InputLabel>
            <Select
              multiple
              value={authorIds}
              onChange={(e) => setAuthorIds(e.target.value)}
              renderValue={(selected) => 
                selected
                  .map((id) => {
                    const author = authors.find((a) => a.id === id);
                    return author ? `${author.firstName} ${author.lastName}` : "";
                  })
                  .join(", ")
              }
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.firstName} {author.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Категории</InputLabel>
            <Select
              multiple
              value={categoryIds}
              onChange={(e) => setCategoryIds(e.target.value)}
              renderValue={(selected) => 
                selected
                  .map((id) => {
                    const category = categories.find((c) => c.id === id);
                    return category ? category.name : "";
                  })
                  .join(", ")
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {error && <Typography color="error">{error}</Typography>}
          
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
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Добавить книгу"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewBookPage;
