import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, TextField, Box } from '@mui/material';
import SearchBar from './SearchBar';

const Register = () => {
  return (
    <Container maxWidth="xs">
      <div>
        <AppBar position="static">
        </AppBar>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom align="center">
            Register
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
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