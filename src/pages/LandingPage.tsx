import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/layered-waves-haikei-landing.svg";
import landingImage from "../assets/landing.png";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

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
          pt: { xs: "7.5rem", sm: "7rem" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            textAlign: "center",
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: "3vh",
              fontWeight: 700,
              fontSize: {
                xs: "2.5rem",
                md: "3rem",
              },
            }}
          >
            ⚡ Welcome to KeepActive!
          </Typography>
          <Typography
            sx={{
              mb: "1rem",
              fontWeight: 600,
              fontSize: {
                xs: "1.25rem",
                sm: "1.5rem",
                md: "1.75rem",
              },
            }}
          >
            Always Keep Your Free Websites Active.
          </Typography>
          <Typography
            sx={{
              mb: "2vh",
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
                md: "1.25rem",
              },
            }}
          >
            Are you tired of your free hosted websites going to sleep due to
            inactivity? KeepActive keeps your websites running smoothly by
            automatically sending periodic requests!
          </Typography>
          <Box
            sx={{
              pl: 2,
              pr: 2,
              mt: 3,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/register")}
              sx={{
                px: 3,
                py: 1,
                fontWeight: 500,
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
                width: "auto",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Get Started
              </Typography>
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/login")}
              sx={{
                backgroundColor: "white",
                px: 3,
                py: 1,
                fontWeight: 500,
                width: "auto",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Log In
              </Typography>
            </Button>
          </Box>

          <Box sx={{ mt: { xs: "3rem", sm: "1.5rem" } }}>
            <img
              src={landingImage}
              alt="Sample Web Page"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
