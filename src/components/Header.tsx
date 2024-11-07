import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const keepActiveIcon = "/keepactive_icon.png";

const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "2px solid #e0e0e0",
      }}
    >
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img
            src={keepActiveIcon}
            alt="KeepActive Logo"
            style={{ width: 30, height: 30, marginRight: 8 }}
          />
          <Typography fontWeight="600" variant="h6" color="textPrimary">
            KeepActive
          </Typography>
        </Box>
        <Box marginLeft="auto">
          {!isAuthenticated ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/login")}
                sx={{ px: 3, py: 1 }}
              >
                <Typography variant="body2" fontWeight="500">
                  Login / Register
                </Typography>
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{ px: 3, py: 1 }}
            >
              <Typography variant="body2" fontWeight="500">
                Log Out
              </Typography>
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
