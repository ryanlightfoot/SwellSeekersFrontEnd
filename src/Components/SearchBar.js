import React, { useState, useEffect, useRef, setQuery } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [surfLocations, setSurfLocations] = useState([]);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1); 
  // Initialize with -1 to indicate no selection

  useEffect(() => {
    axios.get('https://localhost:7177/api/SurfLocation')
      .then((response) => {
        // Assuming the API response is an array of surf locations with a 'name' property
        const surfLocationNames = response.data.map(location => location.name);
        setSurfLocations(surfLocationNames);
        console.log(surfLocations)
      })
      .catch((error) => {
        console.error("Error fetching surf locations: ", error);
      });
  }, []);

  const handleClear = () => {
    navigate('/');
  };

  const handleInputChange = (event, newValue) => {
    setQuery(newValue);
  };

  //Takes user to the forecast page when selected
  //MAKE IT SEND THE LOCATION ID TOOO FOR THE FORECAST CONDITIONS
  const handleSuggestionClick = (event, value, index) => {
    setSelectedLocationIndex(index);
    const indexLocation = surfLocations.indexOf(value,0)
      console.log("Clicked: ", value, " :: ", indexLocation)
    
      if(indexLocation === -1)
      {
        navigate(`/`);
      }
      else
      {
        navigate(`/Forecast/${indexLocation}`);
      }
     //Sends over location selected
    // REPLACE ABOVE WITH ACTUAL INDEX FROM TABLE/DROPDOWN
  };

  const inputStyle = {
    width: '300px', // Adjust the width as needed
  };

  return (
    <div className="drop-down">
      <Autocomplete
        options={surfLocations}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Surf Locations"
            variant="outlined"
            onChange={(e) => handleInputChange(e, e.target.value)}
            style={inputStyle}
          />
        )}
        onClear={handleClear}
        onInputChange={handleInputChange}
        onSelected={(event, value, index) => handleSuggestionClick(event, value, index)}
        onChange={(_, value) => handleSuggestionClick(_, value)}
      />
    </div>
  );
}

export default SearchBar;
