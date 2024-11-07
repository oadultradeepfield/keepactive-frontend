import React from "react";
import Summary from "../components/Summary";
import Dashboard from "../components/Dashboard";
import { Box } from "@mui/material";
import backgroundImage from "../assets/layered-waves-haikei.svg";

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        pt: "6rem",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Summary />
      <Dashboard />
    </Box>
  );
};

export default Home;
