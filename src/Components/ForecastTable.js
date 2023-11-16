import React, {useEffect, useState} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
import './Scroller.css'; // Same CSS styling as wetsuit

function ForecastTable(vars) {
const _locationID = parseInt(vars.locationID);
const _forecastDay = vars.forecastDay;
const [surfCondition, setSurfCondition] = useState("null");
const [surfBoard, setsurfBoard] = useState("null");
const [surfTemp, setsurfTemp] = useState("null");
let populatedChecker = false; //Checks if the the table has data
let data = [];
const feetconv = 3.28084; // Meter to feet conversion
const now = new Date(_forecastDay);
const date = now.getFullYear().toString()+"-"+(now.getMonth() + 1).toString()+"-"+now.getDate().toString()+"T00:00:00"; //GETS TODAYS DATE
const date2 = new Date(now);
date2.setDate(now.getDate() + 1);
const date3 = new Date(date2);
date3.setDate(date2.getDate() + 1);
const date4 = new Date(date3);
date4.setDate(date3.getDate() + 1);
const date5 = new Date(date4);
date5.setDate(date4.getDate() + 1);
console.log("TODAY " + date);
let totSwell = 0;
let totTemp = 0;
let n = 0;

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  useEffect(() => {
    // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
    axios.get(`https://localhost:7177/api/LocationConditions/ByLocation/${_locationID}?forecastDate=${_forecastDay}`)
        .then((response) => {
            setSurfCondition(response.data);
        })
        .catch((error) => {
            console.error("Error fetching surf location: ", error);
        });
    }, [_locationID]);

    if (surfCondition && surfCondition[0] && surfCondition[0].dateTime !== null)
    {
       //goes through surfcondition array
      let it = 0;
      while (it < surfCondition.length)
      {
        const date = new Date(surfCondition[it].dateTime);
        const hours = (date.getHours() + ":00");
        data.push({time: hours, swellSize: (surfCondition[it].swellSize*feetconv).toFixed(2), swellPeriod: surfCondition[it].swellPeriod,swellDirection: surfCondition[it].swellDirection, windSpeed: surfCondition[it].windspeed, windDirection: surfCondition[it].windDirection, temperature: surfCondition[it].temp})
        it = it + 1;
      }

      populatedChecker = true;
    }

    useEffect(() => {

      axios.get(`https://localhost:7177/api/LocationConditions/ByLocation/${_locationID}?forecastDate=${_forecastDay}`)
        .then((response) => {
            setSurfCondition(response.data);
        })
        .catch((error) => {
            console.error("Error fetching surf location: ", error);
        });
    }, [_locationID]);

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

  const groupedData = {}; // Create an object to group data by date

  // Organize data by date
  data.forEach((row) => {
    const date = row.date; // Replace 'date' with the actual property containing the date
    const valSwell = parseInt(row.swellSize);
    const valTemp = parseInt(row.temperature);
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    totSwell += valSwell;
    totTemp += valTemp;
    n += 1;
    groupedData[date].push(row);
  });

  const averageSwell = n === 0 ? 0 : (totSwell / n).toFixed(0);
  const averageTemp = n === 0 ? 0 : (totTemp / n).toFixed(0);

  useEffect(() => {

    axios.get(`https://localhost:7177/api/SurfBoard/average/${String(averageSwell)}`)
      .then((response) => {
          setsurfBoard(response.data);
          console.log("surfBoard");
          console.log(surfBoard);
      })
      .catch((error) => {
          console.error("Error fetching surf location: ", error);
      });
  }, [averageSwell]);

  useEffect(() => {

    axios.get(`https://localhost:7177/api/Wetsuit/average/${String(averageTemp)}`)
      .then((response) => {
        setsurfTemp(response.data);
      })
      .catch((error) => {
          console.error("Error fetching surf location: ", error);
      });
  }, [averageSwell]);

  //Use data to point icon the correct  direction
  const getDirectionIcon = (degrees) => {
    const rotation = parseInt(degrees)  + 90;
    return <ArrowForwardIcon style={{ transform: `rotate(${rotation}deg)` }} 
            alt={degrees}/>;
  };

  if (populatedChecker)
  {
  return (
    <div>
            <p class="dates">{now.getDate()}, {monthNames[now.getMonth()]}, {now.getFullYear()}</p>
      <TableContainer component={Paper} sx={{ marginTop: '1rem' }} class="forecastBack">
        <Table class="forecastTable">
          <TableHead>
            <TableRow class="forecastRows">
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Swell Size</TableCell>
              <TableCell align="center">Swell Period</TableCell>
              <TableCell align="center">Swell Direction</TableCell>
              <TableCell align="center">Wind Speed</TableCell>
              <TableCell align="center">Wind Direction</TableCell>
              <TableCell align="center">Water temperature</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              
              <TableRow key={index}>
                <TableCell align="center">{row.time}</TableCell>
                <TableCell align="center" sx={{ backgroundColor: getSwellSizeColor(row.swellSize) }}>{row.swellSize} ft</TableCell>
                <TableCell align="center">{row.swellPeriod} s</TableCell>
                <Tooltip title={`${row.swellDirection}°`} arrow>
                  <TableCell align="center">{getDirectionIcon(row.swellDirection)}</TableCell>
                </Tooltip>
                <TableCell align="center" sx={{ backgroundColor: getWindSpeedColor(row.windSpeed) }}>{row.windSpeed} m/s</TableCell>
                <Tooltip title={`${row.windDirection}°`} arrow>
                  <TableCell align="center">{getDirectionIcon(row.windDirection)}</TableCell>
                </Tooltip>
                <TableCell align="center">{row.temperature}°C</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div class="dates2"> 
      {surfBoard.type !== undefined ? (
  <p>Suggested Board: {surfBoard.type} {surfBoard.brand} {surfBoard.name}</p>
    ) : ( <p>Suggested Board: No suggestions</p>
    )}
      {surfBoard.type !== undefined ? (
      <p>Suggested Wetsuit:  {surfTemp.type} {surfTemp.brand} {surfTemp.name}</p>
      ) : (
      <p>Suggested Wetsuit: No suggestions</p>
      )}
      </div>

    </div>
  );
}
else
{
  return null;
}

}

export default ForecastTable;