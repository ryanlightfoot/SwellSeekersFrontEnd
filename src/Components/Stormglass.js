import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Container, TextField, Box } from '@mui/material';
import axios from "axios";
import moment from 'moment'; // Import 'moment' separately

const StormGlass = () => {
  const fetchData = async () => {
    const end = moment().add(5, 'days').startOf('day');
    const api_key = 'fad773b0-7431-11ee-a26f-0242ac130002-fad7741e-7431-11ee-a26f-0242ac130002';

    try {
      const response = await axios.get('https://api.stormglass.io/v2/weather/point', {
        params: {
          lat: -34.033333,
          lng: 24.916668,
          params: 'windSpeed,swellHeight,swellDirection,swellPeriod,airTemperature',
          end: end.utc().format('X'),
        },
        headers: {
          Authorization: api_key,
        },
      });

      // Access swellDirection and swellSize directly from response.data
      const swellDirection = response.data.hours[0].swell.components.primary.direction;
      const swellSize = response.data.hours[0].swell.components.primary.height;

      console.log("Swell Direction: ", swellDirection);
      console.log("Swell Size: ", swellSize);
    } catch (error) {
      console.error('Request failed with error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
        <Button onClick={StormGlass}></Button>
    </div>
  );
}

export default StormGlass;
