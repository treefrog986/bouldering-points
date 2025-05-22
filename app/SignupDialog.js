"use client"
import { Dialog, DialogTitle, TextField, DialogContent, Stack, Button, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function SignupDialog({signup, signupBool, setUser, signUp}){
    const router = useRouter()
    const [credentials, setCredentials] = useState({
        email:"",
        username:"",
        password:""
    })
    const setCred = e=>setCredentials(x=>({...x, [e.target.name]: e.target.value}))
    useEffect(()=>{
        setCredentials({
            email:"",
            username:"",
            password:""
        })
        setEmailError(false)
    },[signup])
    const [emailError, setEmailError] = useState(false)
    return ( <Dialog
        open={signup}
        sx={{
          "& .MuiPaper-root": {
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#333",
          }}
        >
          Sign Up
        </DialogTitle>
        <DialogContent>
  <Stack spacing={2} sx={{ marginTop: "10px" }}>
    {/* Username Field */}
    <Stack direction="row" spacing={2} alignItems="center">
      <p
        style={{
          fontWeight: "bold",
          color: "#555",
          minWidth: "80px", // Consistent label width
          textAlign: "right", // Align label text to the right
          margin: 0, // Remove default margin
        }}
      >
        Name
      </p>
      <TextField
        name="username"
        onChange={setCred}
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />
    </Stack>

    {/* Password Field */}
    <Stack direction="row" spacing={2} alignItems="center">
      <p
        style={{
          fontWeight: "bold",
          color: "#555",
          minWidth: "80px",
          textAlign: "right",
          margin: 0,
        }}
      >
        Password
      </p>
      <TextField
        name="password"
        type="password"
        onChange={setCred}
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />
    </Stack>

    {/* Email Field */}
    <Stack direction="row" spacing={2} alignItems="center">
      <p
        style={{
          fontWeight: "bold",
          color: "#555",
          minWidth: "80px",
          textAlign: "right",
          margin: 0,
        }}
      >
        Email
      </p>
      <TextField
        name="email"
        type="email"
        onChange={setCred}
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />
    </Stack>
  </Stack>
  {emailError && <Alert severity="error" >Email already in use</Alert>}
  <div style={{alignContent:"center",justifyContent:"center", display:"flex"}}>
  <Button onClick={signupBool}>Close</Button>

  <Button onClick={async()=>{
    setEmailError(false)
    const res = await signUp(credentials)
    if (res === "error") {
      setEmailError(true)
      return
    }
    setUser(res)
    router.push("/dashboard")
  }}>Sign Up</Button>

  </div>
</DialogContent>
      </Dialog>)
}