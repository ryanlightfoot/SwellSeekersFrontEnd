import React, { useContext, useState } from "react";
import {AppBar, Typography, Button, Container, TextField, Box, Link} from "@mui/material";
import axios from "axios";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const ChangeUserName = () => {
    const [newUsername, setNewUsername] = useState(""); // State to store the new username
    const { userID } = useContext(UserContext);
    const handleUsernameChange = (event) => {
      setNewUsername(event.target.value);

      axios.put(`https://localhost:7177/api/Auth/ChangeUsername/${userID}`, { newUsername });
    };
  
    return (
      <Container maxWidth="xs">
        <Typography class="title">Change Your Username</Typography>
        <TextField
          label="New Username"
          variant="outlined"
          fullWidth
          value={newUsername}
          onClick={handleUsernameChange}
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


