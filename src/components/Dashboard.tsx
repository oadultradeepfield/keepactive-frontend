import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TablePagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const apiUrl = import.meta.env.VITE_APP_API_URL;

interface Website {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Name: string;
  URL: string;
  Duration: number;
  Status: string;
  LastPinged: string | null;
  UserID: number;
}

const Dashboard: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [name, setName] = useState("Untitled Website");
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState<number>(7);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [durationError, setDurationError] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteWebsiteId, setDeleteWebsiteId] = useState<number | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/api/websites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedWebsites = response.data.sort((a: Website, b: Website) =>
        a.Status === "failed" ? -1 : b.Status === "failed" ? 1 : 0
      );
      setWebsites(sortedWebsites);
    } catch (error) {
      console.error(error);
    }
  };

  const addWebsite = async () => {
    setUrlError(null);
    setDurationError(null);

    if (duration < 2 || duration > 10) {
      setDurationError("Duration must be between 2 and 10 days.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${apiUrl}/api/websites`,
        { Name: name, URL: url, Duration: duration },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload();
    } catch (error: any) {
      if (error.response?.status === 400) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes("URL")) {
          setUrlError("Invalid URL or URL format.");
        } else if (errorMessage.includes("duration")) {
          setDurationError("Duration must be between 1 and 14 days.");
        } else {
          setUrlError("Failed to create website.");
        }
      } else {
        setUrlError("Something went wrong. Please try again.");
      }
    }
  };

  const deleteWebsite = async () => {
    if (deleteWebsiteId === null) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiUrl}/api/websites/${deleteWebsiteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteWebsiteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteWebsiteId(null);
    setOpenDeleteDialog(false);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setName("");
    setUrl("");
    setDuration(7);
    setUrlError(null);
    setDurationError(null);
    setOpenAddDialog(false);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Typography
        fontWeight="600"
        variant="h5"
        sx={{ my: 2, display: "flex", justifyContent: "space-between" }}
      >
        📊 Your Dashboard
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          onClick={handleOpenAddDialog}
          sx={{
            borderRadius: "10px",
            px: 2,
            py: 0.75,
          }}
        >
          <Typography variant="body1" fontWeight="500">
            New
          </Typography>
        </Button>
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          border: "2px solid #e0e0e0",
          boxShadow: "none",
        }}
      >
        <Table sx={{ minWidth: "auto" }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.light" }}>
              <TableCell>
                <Typography variant="body1" fontWeight="600">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="600">
                  URL
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="600">
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="600">
                  Last Pinged
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="600">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {websites
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((website) => (
                <TableRow
                  key={website.ID}
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <TableCell>
                    <Typography variant="body1">{website.Name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{website.URL}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {website.Status === "ok" ? "✅" : "❌"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {website.LastPinged
                        ? new Date(website.LastPinged).toLocaleString()
                        : "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenDeleteDialog(website.ID)}
                    >
                      <DeleteIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={websites.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle sx={{ mt: "1rem", paddingLeft: "2rem" }}>
          <Typography variant="h5">Add Website</Typography>
        </DialogTitle>
        <DialogContent sx={{ padding: "2rem" }}>
          <TextField
            label="Website Name"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 1, mb: 2 }}
          />
          <TextField
            label="Website URL"
            fullWidth
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{ mb: 2 }}
            error={urlError !== null}
            helperText={urlError}
          />
          <TextField
            label="Duration (days)"
            type="number"
            fullWidth
            required
            value={duration}
            onChange={(e) => {
              const newDuration = Number(e.target.value);
              if (newDuration >= 1 && newDuration <= 14) {
                setDuration(newDuration);
                setDurationError(null);
              } else {
                setDurationError("Duration must be between 1 and 14 days.");
              }
            }}
            error={durationError !== null}
            helperText={durationError}
          />
        </DialogContent>
        <DialogActions sx={{ mt: "-1rem", pr: "2rem", pb: "2rem" }}>
          <Button
            onClick={handleCloseAddDialog}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={addWebsite} color="primary" variant="contained">
            Add Website
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle sx={{ p: "1.5rem", mb: "-0.5rem" }}>
          <Typography fontWeight="500" variant="body1">
            Are you sure you want to delete this website?
          </Typography>
        </DialogTitle>
        <DialogActions sx={{ pr: "1.5rem", pb: "1.5rem" }}>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            sx={{ px: 3, py: 1 }}
            onClick={handleCloseDeleteDialog}
          >
            <Typography variant="body2" fontWeight="500">
              Cancel
            </Typography>
          </Button>
          <Button
            onClick={deleteWebsite}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ px: 3, py: 1 }}
          >
            <Typography variant="body2" fontWeight="500">
              Delete
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
