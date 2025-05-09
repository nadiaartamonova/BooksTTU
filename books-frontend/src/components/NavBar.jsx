import "./NavBar.css";
import React, { useState, useContext, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography, TextField, Container, Menu, MenuItem, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AccountCircle from '@mui/icons-material/AccountCircle';


const NavBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (location.pathname !== "/") {
      setQuery("");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/") {
      setQuery("");
      onSearch("");
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography 
            variant="h5" 
            sx={{ flexGrow: 1, cursor: "pointer", fontWeight: "bold" }} 
            onClick={() => {
              navigate("/");
              setQuery(""); 
              onSearch("");
            }}
          >
            Библиотека
          </Typography>

          <form onSubmit={handleSubmit} style={{ marginRight: "15px" }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Поиск..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1, minWidth: "250px" }}
            />
          </form>

          {user ? (
            <>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled>{user.login} ({user.roles.join(", ")})</MenuItem>
                {user.roles.includes("Admin") && <MenuItem onClick={() => {navigate("/new-book"); handleMenuClose();}}>Добавить книгу</MenuItem>}
                {user.roles.includes("Admin") && <MenuItem onClick={() => {navigate("/logs"); handleMenuClose();}}>Логи</MenuItem>}
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>Войти</Button>
              <Button color="inherit" onClick={() => navigate("/register")}>Регистрация</Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

