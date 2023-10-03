import './App.css';
import axios from 'axios'
import { Button, ThemeProvider, createTheme } from '@mui/material';
import NavBar from './Components/NavBar';
import { useEffect } from 'react';

//BELOW IS THE THEME THE WEBSITE WILL BE RUNNING
const theme = createTheme( 
  {
    palette: {
      primary: {
        main: "#F2F4F3"
      },
      secondary: {
        main: "#c7d8ed"
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

  useEffect(() => {
    axios.get('https://localhost:7177/api/Login')
    .then((response) => {console.log(response.data);})
  })

  return (
    <ThemeProvider theme={theme}>
      <div>
        <NavBar />
      </div>
    </ThemeProvider>
  );
}

export default App;
