import React, { useState } from "react";
import { Button, TextField, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("admin");  
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (email === "admin" && password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      setError("");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url(https://www.sagatraining.ca/wp-content/uploads/2018/10/background-images-for-login-form-8.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          height: "360px",
          padding: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
        }}
      >
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#3f51b5" }}
          >
            Login
          </Typography>
        </Box>
        <Typography>Enter Your Email</Typography>
        <TextField
          variant="outlined"
          fullWidth
        //   sx={{ marginTop: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography sx={{mt:2}}>Enter Your Password</Typography>
        <TextField
          variant="outlined"
          type="password"
          fullWidth
        //   sx={{ marginTop: 5 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography
            sx={{ color: "red", marginBottom: 2, textAlign: "center" }}
          >
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{
            marginTop: 6,
            padding: "10px",
            backgroundColor: "#3f51b5",
            "&:hover": {
              backgroundColor: "#303f9f",
            },
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
