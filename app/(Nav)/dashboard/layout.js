"use client";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

import { useRouter } from "next/navigation";
import { use, useContext, useState, useEffect } from "react";
import { ClimbContext } from "@/app/components/climbContext";

export default function Layout({ children }) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {user} = useContext(ClimbContext)
useEffect(()=>{
  if(!user){
    router.push("/")
  }
}
, [user])
  const menuItems = [
    { text: "Home", path: "/dashboard", icon: <HomeIcon /> },
    { text: "Logout", path: "/"},
    { text: "Stats", path: "/dashboard/stats" },
  ];

  return (
    
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgb(33, 150, 243)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Bouldering Points
          </Typography>
          <Typography variant="h6" noWrap>
            Hello, {user?.name || "User"}!
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        open={true}
        PaperProps={{
          sx: {
            backgroundColor: "rgb(138, 206, 255)",
            color: "white",
            width: 180, // Wider drawer for better readability
          },
        }}
        anchor="left"
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => router.push(item.path)}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f5f5f5",
          padding: 3,
          marginLeft: "180px" , // Adjust content based on drawer state
          transition: "margin-left 0.3s ease", // Smooth transition for drawer
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}