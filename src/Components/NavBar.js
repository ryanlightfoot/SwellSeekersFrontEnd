import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import SearchBar from './SearchBar';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <AppBar position="static" sx={{ paddingTop: '1.15rem', backgroundColor: '#F2F4F3' }}>
      <Toolbar>
        <Link to="/HomePage" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="h6" color="black">SwellSeekers.</Typography>
        </Link>
        <SearchBar />
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button color="inherit">Login</Button>
        </Link>
        <Link to="/Register" style={{ textDecoration: 'none' }}>
        <Button color="inherit">Register</Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
