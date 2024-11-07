import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import AuthLayout from "../components/AuthLayout";

interface LoginProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const apiUrl = import.meta.env.VITE_APP_API_URL;

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [navigate]);

  const validateEmail = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;

    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <Typography textAlign="center" variant="h4" fontWeight="600" gutterBottom>
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleLogin}>
        <Box mt="1vh" mb="1vh">
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail();
            }}
            error={!!emailError}
            helperText={emailError}
            required
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ px: 3, py: 1 }}
        >
          <Typography variant="body1" fontWeight="500">
            Login
          </Typography>
        </Button>
      </form>
      <Typography variant="body1" align="center" mt={2} color="656565">
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </AuthLayout>
  );
};

export default Login;
