import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Container } from "@mui/material";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const Summary: React.FC = () => {
  const [status, setStatus] = useState<string>("Checking...");

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiUrl}/api/websites`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.length === 0) {
          setStatus("❓ No websites found");
        } else {
          const allOk = response.data.every(
            (website: any) => website.Status === "ok"
          );

          const lastChecked = new Date().toLocaleString();
          setStatus(
            allOk
              ? `✅ All websites are active (${lastChecked})`
              : `❌ Some websites have issues (${lastChecked})`
          );
        }
      } catch (error) {
        console.error(error);
        setStatus("❌ Error checking website status");
      }
    };
    fetchWebsites();
  }, []);

  return (
    <Container>
      <Typography variant="h4" fontWeight="700" textAlign="center" gutterBottom>
        👋 Welcome Back!
      </Typography>
      <Typography
        variant="h5"
        fontWeight="600"
        textAlign="center"
        color="#656565"
        gutterBottom
      >
        {status}
      </Typography>
    </Container>
  );
};

export default Summary;
