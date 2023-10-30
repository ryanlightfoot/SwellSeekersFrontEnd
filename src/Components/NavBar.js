import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import SearchBar from './SearchBar';
import { Link } from "react-router-dom";
import { UserContext } from '../App';


function NavBar() {

  const { user, setUser } = useContext(UserContext);
  console.log(user);

  //Logout the user
  const handleLogout = () => {
    setUser(null);
  }

  return (
    <AppBar position="static" sx={{ paddingTop: '1.15rem', backgroundColor: '#F2F4F3' }}>
      <Toolbar>
        <Link to="/HomePage" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="h6" color="black">SwellSeekers.</Typography>
        </Link>
        <SearchBar/>
        {user ? ( // Check if the user is authenticated
        <div>
          <Link to="/Profile">
          <Button color="inherit">Welcome, {user}</Button>
          </Link>
          <Button onClick={handleLogout} color="inherit">Logout</Button>
          </div>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/Register" style={{ textDecoration: 'none' }}>
              <Button color="inherit">Register</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
