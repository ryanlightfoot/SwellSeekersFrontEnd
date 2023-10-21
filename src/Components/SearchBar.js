import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [surfLocations, setSurfLocations] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7177/api/SurfLocation')
      .then((response) => {
        // Assuming the API response is an array of surf locations with a 'name' property
        const surfLocationNames = response.data.map(location => location.name);
        setSurfLocations(surfLocationNames);
      })
      .catch((error) => {
        console.error("Error fetching surf locations: ", error);
      });
  }, []);

  const handleInputChange = (event, newValue) => {
    setQuery(newValue);
  };

  const handleSuggestionClick = (event, value) => {
    // Add your action here when a suggestion is clicked
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
        onInputChange={handleInputChange}
        onSelected={handleSuggestionClick}
      />
    </div>
  );
}

export default SearchBar;
