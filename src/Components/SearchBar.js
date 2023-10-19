import React, { useState } from 'react';
import { IconButton, InputAdornment, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const surfLocations = [
  'Location 1',
  'Location 2',
  'Location 3',
  'Location 4',
  // Add more surf locations as needed
];

const aquaticCreatures = [
  { label: 'Shark', value: 'Shark' },
  { label: 'Dolphin', value: 'Dolphin' },
  { label: 'Whale', value: 'Whale' },
  { label: 'Octopus', value: 'Octopus' },
  { label: 'Crab', value: 'Crab' },
  { label: 'Lobster', value: 'Lobster' },
];

function SearchBar() {
  return (
    <div className="App">
    <Select
      options={aquaticCreatures}
      onChange={opt => console.log(opt.label, opt.value)}
    />
    </div>
  );
}

export default SearchBar;