"use client";
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const patchNotes = [
  {
    date: "06/01/2025",
    notes: [
      "Added Patch Notes page",
      "Fixed Date UI issue in weekly climbs",
    ],
  },
  {
    date: "05/25/2025",
    notes: [
      "Initial release of Bouldering Points"
    ],
  },
];

export default function PatchNotes() {
  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 64px)",
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
          Patch Notes
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Stay updated with the latest changes and improvements.
        </Typography>
      </Paper>

      {/* Patch Notes Section */}
      {patchNotes.map((patch, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {patch.date}
          </Typography>
          <List>
            {patch.notes.map((note, noteIndex) => (
              <ListItem key={noteIndex} disablePadding>
                <ListItemText primary={`• ${note}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Box>
  );
}