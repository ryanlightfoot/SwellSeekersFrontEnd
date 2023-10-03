import React from "react"
import { AppBar, Toolbar, Typography, Button, createTheme } from '@mui/material';
import SearchBar from './SearchBar';


function NavBar() {
  const handleSearch = (searchTerm) => {
    // Replace console.log with the API request
    console.log('Search term:', searchTerm);
  };


    return(
        <AppBar position="static" sx={{ paddingTop: '1.15rem', backgroundColor: '#F2F4F3' }}>
        <Toolbar>
          <Typography variant="h6">SwellSeekers.</Typography>
          <SearchBar onSearch={handleSearch} />
          <Button color="inherit">Login</Button>
          <Button color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
    )
}

export default NavBar