import React, {useEffect, useState} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Toolbar, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from "axios";
import { resolvePath } from "react-router-dom";

function ForecastTable(vars) {
const _locationID = parseInt(vars.locationID);
const [surfCondition, setSurfCondition] = useState("null");
let populatedChecker = false; //Checks if the the table has data
let data = [];


  useEffect(() => {
    // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
    axios.get(`https://localhost:7177/api/LocationConditions/ByLocation/${_locationID}`)
        .then((response) => {

            setSurfCondition(response.data);
        })
        .catch((error) => {
            console.error("Error fetching surf location: ", error);
        });
    }, [_locationID]);

    if (surfCondition && surfCondition[0] && surfCondition[0].dateTime !== null)
    {
      data = [
        { time: '9:00 AM', swellSize: 3, swellPeriod: '10 sec', swellDirection: 90, windSpeed: 10, windDirection: 200, temperature: '30°C' },
        { time: '12:00 PM', swellSize: 10, swellPeriod: '9 sec', swellDirection: 180, windSpeed: 12, windDirection: 120, temperature: '25°C' },
        { time: '9:00 AM', swellSize: 3, swellPeriod: '10 sec', swellDirection: 270, windSpeed: 10, windDirection: 24, temperature: '30°C' },
        { time: '12:00 PM', swellSize: 10, swellPeriod: '9 sec', swellDirection: 0, windSpeed: 12, windDirection: 32, temperature: '25°C' },
        { time: surfCondition[0].dateTime, swellSize: surfCondition[0].swellSize, swellPeriod: surfCondition[0].swellPeriod, swellDirection: surfCondition[0].swellDirection, windSpeed: surfCondition[0].windspeed, windDirection: surfCondition[0].windDirection, temperature: surfCondition[0].temperature },
      ];
      populatedChecker = true;
    }

  //Dynamically assigns windspeed bgColor
  const getWindSpeedColor = (windSpeed) => { 
    if (windSpeed >= 0 && windSpeed <= 5) {
      return '#B1E3F4'; 
    } else if (windSpeed > 5 && windSpeed <= 10) {
      return '#88ABD2'; 
    } else if (windSpeed > 10 && windSpeed <= 15) {
      return '#82A5FF'; 
    } else if (windSpeed > 15 && windSpeed <= 20) {
      return '#FFADCB'; 
    } else if (windSpeed > 20 && windSpeed <= 25) {
      return '#E05651'; 
    } else if (windSpeed > 25 && windSpeed <= 30) {
      return '#E00B03'; 
    } else {
      return '#262626'; 
    }
  };

  //Dynamically assigns the SwellSize bgcolor
  const getSwellSizeColor = (swellSize) => { 
    if (swellSize >= 0 && swellSize <= 1) {
      return '#B1E3F4'; 
    } else if (swellSize > 1 && swellSize <= 4) {
      return '#88ABD2'; 
    } else if (swellSize > 4 && swellSize <= 6) {
      return '#82A5FF'; 
    } else if (swellSize > 6 && swellSize <= 8) {
      return '#FFADCB'; 
    } else if (swellSize > 8 && swellSize <= 12) {
      return '#E05651'; 
    } else if (swellSize > 12 && swellSize <= 15) {
      return '#E00B03'; 
    } else {
      return '#262626'; 
    }
  };

  //Use data to point icon the correct  direction
  const getDirectionIcon = (degrees) => {
    const rotation = degrees  + 90;
    return <ArrowForwardIcon style={{ transform: `rotate(${rotation}deg)` }} />;
  };

  if (populatedChecker)
  {
  return (
    <div>
      <TableContainer component={Paper} sx={{ marginTop: '1rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Swell Size</TableCell>
              <TableCell>Swell Period</TableCell>
              <TableCell>Swell Direction</TableCell>
              <TableCell>Wind Speed</TableCell>
              <TableCell>Wind Direction</TableCell>
              <TableCell>Temperature</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.time}</TableCell>
                <TableCell sx={{ backgroundColor: getSwellSizeColor(row.swellSize) }}>{row.swellSize} ft</TableCell>
                <TableCell>{row.swellPeriod}</TableCell>
                <TableCell>{getDirectionIcon(row.swellDirection)}</TableCell>
                <TableCell sx={{ backgroundColor: getWindSpeedColor(row.windSpeed) }}>{row.windSpeed}</TableCell>
                <TableCell>{getDirectionIcon(row.windDirection)}</TableCell>
                <TableCell>{row.temperature}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
else
{
  return <div>No data to display</div>;
}
}

export default ForecastTable;
