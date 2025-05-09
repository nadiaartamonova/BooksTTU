import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Box, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem, Paper, CircularProgress } from "@mui/material";

const EditBookPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [authorIds, setAuthorIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    if (!user?.roles.includes("Admin")) {
      navigate("/");
      return;
    }
    fetchBook();
    fetchAuthorsAndCategories();
  }, [id, user]);

  const fetchBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      setTitle(response.data.title);
      setYear(response.data.year);
      setAuthorIds(response.data.Authors.map(a => a.id));
      setCategoryIds(response.data.Categories.map(c => c.id));
    } catch (err) {
      console.error("Ошибка при загрузке книги:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setAuthorError("");
    setCategoryError("");

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
      setAuthorError("Выберите хотя бы одного автора.");
      return;
    }

    if (categoryIds.length === 0) {
      setCategoryError("Выберите хотя бы одну категорию.");
      return;
    }

    try {
      setUpdating(true);
      await api.put(`/books/${id}`, {
        title,
        year,
        authorIds,
        categoryIds,
      });
      navigate(`/books/${id}`);
    } catch (err) {
      console.error("Ошибка при обновлении книги:", err);
      setError("Ошибка при обновлении книги.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Typography textAlign="center">Загрузка...</Typography>;

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
          Редактировать книгу
        </Typography>

        {error && <Typography color="error" mb={2}>{error}</Typography>}

        <Box component="form" onSubmit={handleUpdate} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Название книги"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="Год издания"
            variant="outlined"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />

          <FormControl error={!!authorError}>
            <InputLabel>Авторы</InputLabel>
            <Select
              multiple
              value={authorIds}
              onChange={(e) => setAuthorIds(e.target.value)}
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.firstName} {author.lastName}
                </MenuItem>
              ))}
            </Select>
            {authorError && <Typography color="error">{authorError}</Typography>}
          </FormControl>

          <FormControl error={!!categoryError}>
            <InputLabel>Категории</InputLabel>
            <Select
              multiple
              value={categoryIds}
              onChange={(e) => setCategoryIds(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {categoryError && <Typography color="error">{categoryError}</Typography>}
          </FormControl>

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            disabled={updating}
          >
            {updating ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Сохранить изменения"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditBookPage;
