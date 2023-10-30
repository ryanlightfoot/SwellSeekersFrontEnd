import React, { useState, useEffect } from "react";
import {Button} from "@mui/material";
import ForecastTable from "../Components/ForecastTable";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function ForecastPage() {
    const { location } = useParams();
    const realLocation = parseInt(location) + 1; //GETS the actual location pos
    const [surfLocation, setSurfLocation] = useState("null");
    const [conditionData, setconditionData] = useState("null");
    const end = moment().add(5, 'days').startOf('day');
    const api_key = '554bb738-2ed3-11ee-a26f-0242ac130002-554bb7a6-2ed3-11ee-a26f-0242ac130002';
    const postUrl = 'https://localhost:7177/api/LocationConditions';
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let firstCheck = false;

    console.log("REAL LOC: " + location);
    console.log();

    const now = new Date();
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

    useEffect(() => {
        // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
   
        axios.get(`https://localhost:7177/api/SurfLocation/${realLocation}`)
            .then((response) => {
                setSurfLocation(response.data);
                console.log("LOC: " + realLocation);
                console.log("Resp: ");
                console.log(response.data);
                console.log(surfLocation.longitude);
                console.log(surfLocation.latitude);
            })
            .catch((error) => {
                console.error("Error fetching surf location: ", error);
            });
    }, [location]);
    let flag = 0;
    flag = flag + 1;

    const StormGlassDATA = () => {
      // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
      axios.get('https://api.stormglass.io/v2/weather/point', {
        params: {
          lat: (surfLocation.latitude),
          lng: (surfLocation.longitude),
          params: 'windSpeed,windDirection,swellHeight,swellDirection,swellPeriod,airTemperature',
          end: end.utc().format('X'),
        },
        headers: {
          Authorization: api_key,
        },
      }).then((response) => {
        setconditionData(response);
        console.log(response);
      })
      .catch((error) => {
          console.error("Error fetching surf location: ", error);
      });

      //Storglass API gets data every ttime flag variable changes
      flag = flag + 1; 
      //The Try catches the error of initial loading the conditionData
      try {
          const conlen = conditionData.data.hours.length;
          
          for(let i = 0; i < conlen; i = i + 1)
          {
            const postData = { //Gather data
              condtionID: 0,
              windspeed: String(conditionData.data.hours[i].windSpeed.noaa),
              windDirection: String(conditionData.data.hours[i].windDirection.noaa),
              swellSize: String(conditionData.data.hours[i].swellHeight.meteo),
              swellDirection: String(conditionData.data.hours[i].swellDirection.meteo),
              swellPeriod: String(conditionData.data.hours[i].swellPeriod.meteo),
              dateTime: String(conditionData.data.hours[i].time),
              locationID: realLocation,
              wetsuitID: 1,
              surfboardID: 1,
              location: {
                locationID: 0,
                name: "string",
                country: "string",
                description: "string",
                longitude: "string",
                latitude: "string"
              },
              suit: {
                wetsuitID: 0,
                type: "string",
                thickness: "string",
                hightemp: "string",
                lowtemp: "string",
                name: "string",
                brand: "string"
              },
              board: {
                surfBoardID: 0,
                size: "string",
                type: "string",
                highSwell: "string",
                lowSwell: "string",
                name: "string",
                brand: "string"
              }
          }
          console.log(postData)
          async function postDataToServer() {
            
              const response = await axios.post(postUrl, postData);
              console.log('Data posted successfully:', response.data);
          }

          postDataToServer();


        }

      } catch (error)
      {
        console.error('Error loading data:', error)
      }
          //INSERT DATA
            
        }

  return (
    <div>
      <h1>{surfLocation.name}</h1>
      <p>{now.getDate()}, {monthNames[now.getMonth()]}, {now.getFullYear()}</p>
      <ForecastTable locationID={realLocation} forecastDay={date}/>
      <p>{date2.toString()}</p>
      <ForecastTable locationID={realLocation} forecastDay={(date2.getFullYear().toString()+"-"+(date2.getMonth() + 1).toString()+"-"+date2.getDate().toString()+"T00:00:00")}/>
      <p>{date3.toString()}</p>
      <ForecastTable locationID={realLocation} forecastDay={(date3.getFullYear().toString()+"-"+(date3.getMonth() + 1).toString()+"-"+date3.getDate().toString()+"T00:00:00")}/>
      <p>{date4.toString()}</p>
      <ForecastTable locationID={realLocation} forecastDay={(date4.getFullYear().toString()+"-"+(date4.getMonth() + 1).toString()+"-"+date4.getDate().toString()+"T00:00:00")}/>
      <p>{date5.toString()}</p>
      <ForecastTable locationID={realLocation} forecastDay={(date5.getFullYear().toString()+"-"+(date5.getMonth() + 1).toString()+"-"+date5.getDate().toString()+"T00:00:00")}/>
      <Button onClick={StormGlassDATA}>Update database</Button>
      <p></p>
    </div>
  );
}

export default ForecastPage;