import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import SearchBar from './SearchBar';
import { Link } from "react-router-dom";
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom";
import './Scroller.css';

function NavBar() {

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);

  //Logout the user
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  }

  return (
    <AppBar position="static" sx={{ paddingTop: '1.15rem', paddingBottom: '1rem', backgroundColor: '#F2F4F3', boxShadow: 0 }}>
      <Toolbar class="navBarPos">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="h6" color="black" fontSize={"200%"}>SwellSeekers.</Typography>
        </Link>
        <SearchBar/>
        {user ? ( // Check if the user is authenticated
        <div>
          <Link to="/Profile">
          <button class="button-5">Welcome, {user}</button>
          </Link>
          <button onClick={handleLogout} class="button-5">Logout</button>
          </div>
        ) : (
          <>
            <div>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button class="button-5">Login</button>
            </Link>
            <Link to="/Register" style={{ textDecoration: 'none' }}>
              <button class="button-5">Register</button>
            </Link>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
