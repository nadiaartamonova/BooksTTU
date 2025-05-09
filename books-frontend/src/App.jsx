// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import NavBar from "./components/NavBar";
import NewBookPage from "./pages/NewBookPage";
import LogsPage from "./pages/LogsPage";
import EditBookPage from "./pages/EditBookPage";
import NotFoundPage from "./pages/NotFoundPage";
import api from "./services/api";

function App() {
  const [books, setBooks] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    console.log("Initial fetch of all books...");
    fetchBooks();
  }, []);

  const fetchBooks = async (query = "") => {
    console.log("Fetching books with query:", query);
    try {
      const response = query.trim()
        ? await api.get("/books/search", { params: { query } })
        : await api.get("/books");

      console.log("Fetched books:", response.data);
      setBooks(response.data);
      setNotFound(response.data.length === 0);
    } catch (err) {
      console.error("Ошибка при получении книг:", err);
      setBooks([]);
      setNotFound(true);
    }
  };

  return (
    <Router>
      <NavBar onSearch={fetchBooks} />
      <Routes>
        <Route path="/" element={<HomePage books={books} notFound={notFound} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/books/:id/edit" element={<EditBookPage />} />
        <Route path="/new-book" element={<NewBookPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
