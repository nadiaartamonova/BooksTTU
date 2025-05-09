// src/pages/LogsPage.jsx
import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box
} from "@mui/material";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.roles.includes("Admin")) {
      navigate("/");
      return;
    }
    fetchLogs();
  }, [user]);

  const fetchLogs = async () => {
    try {
      const response = await api.get("/logs");
      setLogs(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Ошибка при загрузке логов:", err);
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => 
    filter ? log.action.includes(filter) : true
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, color: "#1976d2" }}>
        Логи действий пользователей
      </Typography>

      <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
        <InputLabel id="filter-label">Фильтр по действию</InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="create">Создание</MenuItem>
          <MenuItem value="update">Обновление</MenuItem>
          <MenuItem value="delete">Удаление</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <Typography>Загрузка...</Typography>
      ) : (
        <TableContainer component={Paper} >
          <Table stickyHeader aria-label="Логи действий пользователей">
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "#fff", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "#fff", fontWeight: "bold" }}>Пользователь</TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "#fff", fontWeight: "bold" }}>Дата</TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "#fff", fontWeight: "bold" }}>Действие</TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "#fff", fontWeight: "bold" }}>Таблица</TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "#fff", fontWeight: "bold" }}>Детали</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, index) => (
                  <TableRow 
                    key={log.id} 
                    sx={{ 
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                      "&:hover": {
                        backgroundColor: "#e0e0e0"
                      }
                    }}
                  >
                    <TableCell>{log.id}</TableCell>
                    <TableCell>{log.User ? log.User.login : "Неизвестен"}</TableCell>
                    <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.table}</TableCell>
                    <TableCell>{log.details}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Логи не найдены.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default LogsPage;
