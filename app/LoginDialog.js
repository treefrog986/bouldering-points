"use client"
import { Alert, Dialog, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import { useEffect, useState, useContext } from "react"
import { ClimbContext } from "./components/climbContext"
import { Button}from "@mui/material"
import { useRouter } from "next/navigation"


export default function LoginDialog({login, loginBool, setUser, loginUser}){
  const router = useRouter()
    const [credentials, setCredentials] = useState({
        email:"",
        password:""
    })
    const [error, setError] = useState(false)
    const setCred = e=>setCredentials(x=>({...x, [e.target.name]: e.target.value}))
    useEffect(()=>{
        setCredentials({
            email:"",
            password:""
        })
        setError(false)
    },[login])
    const{fetchClimbs} = useContext(ClimbContext)
    return <Dialog
    open={login}
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
      Login
    </DialogTitle>
    <DialogContent>
<Stack spacing={2} sx={{ marginTop: "10px" }}>

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


</Stack>
{error && <Alert severity="error">Invalid email or password</Alert>}
<div style={{alignContent:"center",justifyContent:"center", display:"flex"}}>
<Button onClick={loginBool}>Close</Button>

<Button onClick={async()=>{
setError(false)
const res= await loginUser(credentials)
if(!res){
    setError(true)
    return
}
await fetchClimbs(res.id)
console.log(res)
if(!res){
    return
}
setUser(res)
router.push("/dashboard")
}}>Login</Button>
</div>
</DialogContent>
  </Dialog>
}