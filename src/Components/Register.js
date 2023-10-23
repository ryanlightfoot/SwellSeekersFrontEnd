import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Container, TextField, Box } from '@mui/material';
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    password: "",
    email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    // Send a POST request to the API with the form data
    axios
      .post("https://localhost:7177/api/Auth/InsertLoginUser", formData)
      .then((response) => {
        // Handle the success response here (e.g., show a success message or redirect).
        console.log("Registration successful", response.data);
      })
      .catch((error) => {
        // Handle registration error (e.g., show an error message).
        console.error("Registration failed", error);
      });
  };

  return (
    <Container maxWidth="xs">
      <div>
        <AppBar position="static"></AppBar>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom align="center">
            Register
          </Typography>
          <form>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              margin="normal"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="surname"
              label="Surname"
              name="surname"
              margin="normal"
              value={formData.surname}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              margin="normal"
              value={formData.username}
              onChange={handleInputChange}
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
              value={formData.password}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
          </form>
        </Box>
      </div>
    </Container>
  );
}

export default Register;
