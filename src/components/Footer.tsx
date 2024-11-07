import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        p: 4,
        mt: "auto",
        textAlign: "center",
        bgcolor: "white",
      }}
    >
      <Typography variant="body1" color="textSecondary">
        © {new Date().getFullYear()} KeepActive. All rights reserved. Made with
        💥 by{" "}
        <Link
          href="https://github.com/oadultradeepfield"
          target="_blank"
          rel="noopener noreferrer"
        >
          oadultradeepfield
        </Link>
        .
      </Typography>
    </Box>
  );
};

export default Footer;
