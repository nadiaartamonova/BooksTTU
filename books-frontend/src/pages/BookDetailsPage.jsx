// // src/pages/BookDetailsPage.jsx
// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { AuthContext } from "../context/AuthContext";
// import { Box, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem, Paper, CircularProgress } from "@mui/material";

// const BookDetailsPage = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [book, setBook] = useState(null);
//   const [title, setTitle] = useState("");
//   const [year, setYear] = useState("");
//   const [authorIds, setAuthorIds] = useState([]);
//   const [categoryIds, setCategoryIds] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchBook();
//     fetchAuthorsAndCategories();
//   }, [id]);

//   const fetchBook = async () => {
//     try {
//       const response = await api.get(`/books/${id}`);
//       setBook(response.data);
//       setTitle(response.data.title);
//       setYear(response.data.year);
//       setAuthorIds(response.data.Authors.map((a) => a.id));
//       setCategoryIds(response.data.Categories.map((c) => c.id));
//     } catch (err) {
//       console.error("Ошибка при загрузке книги:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAuthorsAndCategories = async () => {
//     try {
//       const [authorsRes, categoriesRes] = await Promise.all([
//         api.get("/authors"),
//         api.get("/categories"),
//       ]);
//       setAuthors(authorsRes.data);
//       setCategories(categoriesRes.data);
//     } catch (err) {
//       console.error("Ошибка при загрузке данных:", err);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!title.trim()) {
//       setError("Название книги не может быть пустым.");
//       return;
//     }

//     const currentYear = new Date().getFullYear();
//     if (isNaN(year) || year < 1500 || year > currentYear) {
//       setError(`Год должен быть числом между 1500 и ${currentYear}.`);
//       return;
//     }

//     if (authorIds.length === 0) {
//       setError("Выберите хотя бы одного автора.");
//       return;
//     }

//     if (categoryIds.length === 0) {
//       setError("Выберите хотя бы одну категорию.");
//       return;
//     }

//     try {
//       setUpdating(true);
//       await api.put(`/books/${id}`, {
//         title,
//         year,
//         authorIds,
//         categoryIds,
//       });
//       navigate(`/books/${id}`);
//     } catch (err) {
//       console.error("Ошибка при обновлении книги:", err);
//       setError("Ошибка при обновлении книги.");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <Typography textAlign="center">Загрузка...</Typography>;

//   return (
//     <Box 
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "80vh",
//         padding: 2
//       }}
//     >
//       <Paper 
//         elevation={3}
//         sx={{
//           padding: 4,
//           maxWidth: 500,
//           width: "100%",
//           borderRadius: 2,
//           backgroundColor: "#f5f5f5",
//           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <Typography variant="h4" textAlign="center" mb={3} color="#1976d2">
//           Редактировать книгу
//         </Typography>

//         <Box component="form" onSubmit={handleUpdate} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           <TextField
//             label="Название книги"
//             variant="outlined"
//             fullWidth
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           <TextField
//             label="Год издания"
//             variant="outlined"
//             type="number"
//             fullWidth
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             required
//           />

//           <FormControl fullWidth>
//             <InputLabel>Авторы</InputLabel>
//             <Select
//               multiple
//               value={authorIds}
//               onChange={(e) => setAuthorIds(e.target.value)}
//               renderValue={(selected) => 
//                 selected
//                   .map((id) => {
//                     const author = authors.find((a) => a.id === id);
//                     return author ? `${author.firstName} ${author.lastName}` : "";
//                   })
//                   .join(", ")
//               }
//             >
//               {authors.map((author) => (
//                 <MenuItem key={author.id} value={author.id}>
//                   {author.firstName} {author.lastName}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel>Категории</InputLabel>
//             <Select
//               multiple
//               value={categoryIds}
//               onChange={(e) => setCategoryIds(e.target.value)}
//               renderValue={(selected) => 
//                 selected
//                   .map((id) => {
//                     const category = categories.find((c) => c.id === id);
//                     return category ? category.name : "";
//                   })
//                   .join(", ")
//               }
//             >
//               {categories.map((category) => (
//                 <MenuItem key={category.id} value={category.id}>
//                   {category.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           {error && <Typography color="error">{error}</Typography>}
          
//           <Button 
//             type="submit" 
//             variant="contained" 
//             color="primary" 
//             fullWidth 
//             disabled={updating}
//             sx={{
//               padding: "10px 0",
//               fontWeight: "bold",
//               textTransform: "none",
//               transition: "0.3s",
//               "&:hover": {
//                 backgroundColor: "#1565c0",
//               }
//             }}
//           >
//             {updating ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Сохранить изменения"}
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default BookDetailsPage;

// src/pages/BookDetailsPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Box, Typography, Button, Paper, Divider, TextField, CircularProgress, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BookDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [_, setError] = useState("");

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      setBook(response.data);
      setComments(response.data.Comments || []);
    } catch (err) {
      console.error("Ошибка при загрузке книги:", err);
      setError("Ошибка при загрузке книги.");
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await api.post("/comments", {
        content: newComment,
        BookID: book.id,
      });

      // Добавляем новый комментарий в список с указанием текущего пользователя
      const newCommentWithUser = {
        ...response.data,
        User: { login: user.login }
      };

      setComments([...comments, newCommentWithUser]);
      setNewComment("");
    } catch (err) {
      console.error("Ошибка при добавлении комментария:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить эту книгу?")) return;
    setDeleting(true);

    try {
      await api.delete(`/books/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Ошибка при удалении книги:", err);
      setError("Ошибка при удалении книги.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Typography textAlign="center">Загрузка...</Typography>;

  return (
    <Box sx={{ maxWidth: 700, margin: "0 auto", padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" color="#1976d2" gutterBottom>
          {book.title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Год издания:</strong> {book.year}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Авторы:</strong> {book.Authors?.map((author) => `${author.firstName} ${author.lastName}`).join(", ")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Категории:</strong> {book.Categories?.map((category) => category.name).join(", ")}
        </Typography>

        {user?.roles?.includes("Admin") && (
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mb: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<EditIcon />} 
              onClick={() => navigate(`/books/${id}/edit`)}
            >
              Редактировать
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              startIcon={<DeleteIcon />} 
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? <CircularProgress size={20} sx={{ color: "#e53935" }} /> : "Удалить"}
            </Button>
          </Box>
        )}
      </Paper>

      <Paper elevation={2} sx={{ padding: 3, mt: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Комментарии</Typography>
        <Divider sx={{ mb: 2 }} />
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Box key={comment.id} sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>{comment.User?.login || "Пользователь"}:</strong> {comment.content}
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </Box>
          ))
        ) : (
          <Typography>Комментариев пока нет.</Typography>
        )}

        {user && (
          <Box 
            component="form" 
            onSubmit={handleCommentSubmit} 
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
          >
            <TextField
              label="Ваш комментарий..."
              variant="outlined"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              multiline
              minRows={2}
            />
            <Button variant="contained" color="primary" type="submit">
              Отправить
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default BookDetailsPage;

