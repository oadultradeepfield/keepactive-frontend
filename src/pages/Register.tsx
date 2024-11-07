import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import AuthLayout from "../components/AuthLayout";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
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

  const validatePassword = () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail() || !validatePassword()) return;

    try {
      await axios.post(`${apiUrl}/api/register`, {
        email,
        password,
      });
      setSuccess(true);
      setError("");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setError("Email already exists. Please try a different one.");
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <Typography textAlign="center" variant="h4" gutterBottom fontWeight="600">
        Register
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Registration successful! Redirecting to login...
        </Alert>
      )}
      <form onSubmit={handleRegister}>
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
            Register
          </Typography>
        </Button>
      </form>
      <Typography variant="body1" align="center" mt={2} color="656565">
        Already have an account? <Link to="/login">Login here</Link>
      </Typography>
    </AuthLayout>
  );
};

export default Register;
