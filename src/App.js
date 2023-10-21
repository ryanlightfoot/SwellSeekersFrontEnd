import './App.css';
import axios from 'axios'
import { Button, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './Components/NavBar';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
import ForecastTable from './Components/ForecastTable';
import { createContext, useEffect, useState } from 'react';
import ProfilePage from './Pages/ProfilePage';

export const UserContext = createContext(null);

//BELOW IS THE THEME THE WEBSITE WILL BE RUNNING
const customTheme = createTheme( 
  {
    palette: {
      primary: {
        main: "#F2F4F3"
      },
      secondary: {
        main: "#c7d8ed"
      },
      text: {
        primary: "#000000" 
      },
    },
    typography: {
      fontFamily: [
        'Roboto'
      ],
      h4: {
        fontWeight: 600,
        fontSize: 28,
        lineHeight: '2rem',
      },
      h5: {
        fontWeight: 100,
        lineHeight: '2rem',
      },
    },
  });

//APPLICATION
function App() {
  const [user, setUser] = useState("");

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline /> {/* Add for global CSS reset */}
      <Router>
        <div>
        <UserContext.Provider value={{ user, setUser }}>
        {/* Your components, including the Login component */}
          <NavBar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/Profile" element={<ProfilePage />} />
          </Routes>
          </UserContext.Provider>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
