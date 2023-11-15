import React, { useContext, useState } from "react";
import {AppBar, Typography, Button, Container, TextField, Box, Link} from "@mui/material";
import axios from "axios";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const ChangeUserName = () => {
    const [newUsername, setNewUsername] = useState(""); // State to store the new username
  
    const handleUsernameChange = (event) => {
      setNewUsername(event.target.value);
    };
  
    const handleSubmit = () => {
      // You can add the logic here to send a request to the server to update the username
      console.log("New username:", newUsername);
    };
  
    return (
      <Container maxWidth="xs">
        <Typography class="title">Change Your Username</Typography>
        <TextField
          label="New Username"
          variant="outlined"
          fullWidth
          value={newUsername}
          onChange={handleUsernameChange}
          margin="normal"
        />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
            Change username
            </Button>
      </Container>
    );
  };

export default ChangeUserName;


