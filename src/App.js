import './App.css';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './Components/NavBar';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
import { createContext, useState } from 'react';
import ProfilePage from './Pages/ProfilePage';
import ForecastPage from './Pages/ForecastPage';
import WetsuitPage from './Pages/WetsuitPage'
import SurfboardPage from './Pages/SurfboardPage'
import ChangeUserName from './Pages/ChangeUserName';

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
  const [userID, setUserID] = useState("");
  const [userTypeID, setUserTypeID] = useState("");

  return (
    <>
      <CssBaseline class="all" /> {/* Add for global CSS reset */}
      <Router>
        <div class="all">
        <UserContext.Provider value={{ user, setUser, userID, setUserID, userTypeID, setUserTypeID }}>
        {/* Your components, including the Login component */}
          <NavBar />
          <Routes>
            <Route path="/Forecast/:location" element={<ForecastPage />} />{/*this will add location variable*/}
            <Route path="/Wetsuit/:wetsuitID" element={<WetsuitPage />} />
            <Route path="/Surfboard/:surfboardID" element={<SurfboardPage />} />
            <Route path="/ChangeUser" element={<ChangeUserName />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} /> {/* Catch-all route */}
            <Route path="/Profile" element={<ProfilePage />} />
          </Routes>

          </UserContext.Provider>
        </div>
      </Router>
    </>
  );
}

export default App;
