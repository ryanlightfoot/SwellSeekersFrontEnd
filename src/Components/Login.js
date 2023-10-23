import React, { useContext, useState } from "react";
import {AppBar, Typography, Button, Container, TextField, Box, Link} from "@mui/material";
import axios from "axios";
import { UserContext } from "../App";

const Login = () => {
  
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const handleLoginClick = () => {
    // Prepare the data to be sent to the API.
    const data = {
      username: username,
      password: password,
    };

    // Send a POST request to the API.
    axios
      .post("https://localhost:7177/api/auth/login", data)
      .then((response) => {
        // Handle the success response here (e.g., store tokens, redirect, etc.).
        setUser(username); //GLOBAL USER NAME VARIABLE SET

        console.log("API Response Message:", response.data);
        console.log("Authentication successful");
      })
      .catch((error) => {
        // Handle authentication error (e.g., show an error message).
        setLoginError("Login details incorrect");
        console.error("Login failed", error);
      });
  };

  return (
    <Container maxWidth="xs">
      <div>
        <AppBar position="static"></AppBar>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom align="center">
            Login
          </Typography>
          <form>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError && (
              <div style={{ color: "red", textAlign: "center" }}>
                {loginError}
              </div>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleLoginClick}
            >
              Login
            </Button>

          </form>
        </Box>
      </div>
    </Container>

  );
};

export default Login;


