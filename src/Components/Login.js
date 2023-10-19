import React from "react";
import { AppBar, Toolbar, Typography, Button, createTheme, Container, TextField, Box } from '@mui/material';

const Login = () => {
  return (
    <Container maxWidth="xs">
      <div>
        <AppBar position="static">
        </AppBar>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom align = "center">
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
        </Box>
      </div>
    </Container>
  );
}

export default Login;
