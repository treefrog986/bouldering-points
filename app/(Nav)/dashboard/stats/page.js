"use client";
import { useContext, useState, useEffect } from "react";
import { ClimbContext } from "@/app/components/climbContext";
import { BarChart, PieChart } from "@mui/x-charts";
import { Box, Stack, Typography, Paper } from "@mui/material";
import { getWeeksClimb } from "@/app/api/api";

export default function Stats() {
  const { user, climbs } = useContext(ClimbContext);
  const [stats, setStats] = useState(null);

  async function getStats() {
    const weeks = await getWeeksClimb(user.id);
    const currentWeek = Object.keys(climbs)
      .reduce((p, c) => {
        return [
          ...p,
          {
            color: c,
            attempted: climbs[c].attempted.count,
            completed: climbs[c].completed.count,
          },
        ];
      }, [])
      .reduce(
        (p, c) => {
          if (!p.attempted[c.color]) {
            p.attempted[c.color] = 0;
          }
          if (!p.completed[c.color]) {
            p.completed[c.color] = 0;
          }
          p.attempted[c.color] += c.attempted;
          p.completed[c.color] += c.completed;
          return p;
        },
        { attempted: {}, completed: {} }
      );
    setStats({ currentWeek: currentWeek, weeks: weeks });
  }

  useEffect(() => {
    getStats();
  }, [user]);

  if (!stats) {
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
          Loading stats...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "5px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
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
          Climbing Stats
        </Typography>
        <Typography variant="body1" color="textSecondary">
          View your climbing progress and stats for the week.
        </Typography>
      </Paper>

      {/* Charts Section */}
      <Stack direction="row" spacing={4} justifyContent="center">
        {/* Attempted Climbs Pie Chart */}
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Attempted Climbs
          </Typography>
          <PieChart
            series={[
              {
                data: Object.keys(stats?.currentWeek.attempted)
                  .filter((color) => stats.currentWeek.attempted[color] > 0)
                  .map((color) => ({
                    label: color,
                    color: color,
                    value: stats.currentWeek.attempted[color],
                  })),
              },
            ]}
            width={200}
            height={200}
          />
        </Paper>

        {/* Completed Climbs Pie Chart */}
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Completed Climbs
          </Typography>
          <PieChart
            series={[
              {
                data: Object.keys(stats?.currentWeek.completed)
                  .filter((color) => stats.currentWeek.completed[color] > 0)
                  .map((color) => ({
                    label: color,
                    color: color,
                    value: stats.currentWeek.completed[color],
                  })),
              },
            ]}
            width={200}
            height={200}
          />
        </Paper>
  

      {/* Weekly Progress Bar Chart */}
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Weekly Progress
        </Typography>
        {stats.weeks && (
          <BarChart
            dataset={stats.weeks}
            series={[
              {
                dataKey: "climbs",
                label: "Climbs",
                valueFormatter: (v) => v.climbs,
              },
            ]}
            width={300}
            height={220}
            xAxis={[
              {
                data: stats.weeks.map((week) => week.week),
              },
            ]}
          />
        )}
      </Paper>
        </Stack>
    </Box>
  );
}