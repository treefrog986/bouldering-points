"use client";
import { Button, Container, Typography, Box } from "@mui/material";
import useBool from "./components/useBool";
import LoginDialog from "./LoginDialog";
import SignupDialog from "./SignupDialog";
import { ClimbContext } from "./components/climbContext";
import { useContext, useEffect } from "react";

export default function Home({loginUser, signUp}) {
  const [logIn, toggleLogin] = useBool();
  const [signup, toggleSignup] = useBool();
  const { setUser, clearClimbs } = useContext(ClimbContext);
  useEffect(() => {
    setUser(null);
    clearClimbs();
  },[])
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        marginTop: "50px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Bouldering Points
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: "30px",
          color: "#555",
        }}
      >
        Track your climbing progress and achievements with ease.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleLogin}
          sx={{
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={toggleSignup}
          sx={{
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Sign Up
        </Button>
      </Box>
      <LoginDialog login={logIn} loginBool={toggleLogin} setUser={setUser} loginUser={loginUser}/>
      <SignupDialog signup={signup} signupBool={toggleSignup} setUser={setUser} signUp={signUp} />
    </Container>
  );
}