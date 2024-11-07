import React from "react";
import { Container, Paper, Box } from "@mui/material";
import backgroundImage from "../assets/layered-waves-haikei.svg";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: "5rem",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              padding: "32px",
              borderRadius: "12px",
              border: "2px solid #e0e0e0",
              backgroundColor: "rgba(255, 255, 255, 0.98)",
            }}
          >
            {children}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default AuthLayout;
