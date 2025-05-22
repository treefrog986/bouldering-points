"use client";
import { useContext, useState } from "react";
import { Button, Stack, Typography, Box, Paper, Divider, Grid, Snackbar } from "@mui/material";
import { ClimbContext } from "@/app/components/climbContext";

export default function Dashboard() {
  
  const { user, climbs, editClimbs, saveClimbs, getMonday } = useContext(ClimbContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Render a loading state if user or climbs are not yet available
  if (!user || !climbs) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafc",
        }}
      >
        <Typography variant="h6" color="textSecondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f5f5f5", // Matches the layout's background
        minHeight: "calc(100vh - 64px)", // Adjust height to account for AppBar

        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* Header Section */}
      <Paper
        elevation={4}
        sx={{
          padding: "20px",
          textAlign: "center",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          marginBottom: "20px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Week: <strong>{getMonday()}</strong>
        </Typography>
      </Paper>

      {/* Climbs Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Grid container spacing={2}>
          {Object.entries(climbs).map(([color, data]) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={color}>
              <Paper
                elevation={3}
                sx={{
                  padding: "15px",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#2FE0CC",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      textTransform: "capitalize",
                      color: color || "#000", // Fallback color
                      minWidth: "70px",
                    }}
                  >
                    {color}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Stack direction="column" spacing={1}>
                    <Typography variant="body2">
                      <strong>Completed:</strong>
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => editClimbs(color, "completed", -1)}
                        sx={{
                          padding: "2px 6px", // Smaller button padding
                          fontWeight: "bold",
                          minWidth: "30px", // Smaller button width
                        }}
                      >
                        -
                      </Button>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          padding: "0 2px",
                        }}
                      >
                        {data?.completed?.count || 0} {/* Fallback value */}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => editClimbs(color, "completed", 1)}
                        sx={{
                          padding: "2px 6px", // Smaller button padding
                          fontWeight: "bold",
                          minWidth: "30px", // Smaller button width
                        }}
                      >
                        +
                      </Button>
                    </Stack>
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack direction="column" spacing={1}>
                    <Typography variant="body2">
                      <strong>Attempted:</strong>
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => editClimbs(color, "attempted", -1)}
                        sx={{
                          padding: "2px 6px", // Smaller button padding
                          fontWeight: "bold",
                          minWidth: "30px", // Smaller button width
                        }}
                      >
                        -
                      </Button>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          padding: "0 2px",
                        }}
                      >
                        {data?.attempted?.count || 0} {/* Fallback value */}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => editClimbs(color, "attempted", 1)}
                        sx={{
                          padding: "2px 6px", // Smaller button padding
                          fontWeight: "bold",
                          minWidth: "30px", // Smaller button width
                        }}
                      >
                        +
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Save Button */}
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={async () => {
          await saveClimbs();
          setSnackbarOpen(true);
        }}
        sx={{
          marginTop: "20px",
          padding: "10px 20px",
          fontWeight: "bold",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        Save Progress
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Progress saved successfully!"
        action={
          <Button color="inherit" onClick={() => setSnackbarOpen(false)}>
            Close
          </Button>
        }
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#4caf50",
            color: "#fff",
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
}