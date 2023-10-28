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
    let flag = 0;

    useEffect(() => {
        // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
        axios.get(`https://localhost:7177/api/SurfLocation/${realLocation}`)
            .then((response) => {
                setSurfLocation(response.data);
                
                console.log(surfLocation.latitude)
                console.log(surfLocation.longitude)
            })
            .catch((error) => {
                console.error("Error fetching surf location: ", error);
            });
    }, [location]);

    useEffect(() => {
      // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
      axios.get('https://api.stormglass.io/v2/weather/point', {
        params: {
          lat: (surfLocation.latitude),
          lng: (surfLocation.longitude),
          params: 'windSpeed,swellHeight,swellDirection,swellPeriod,airTemperature',
          end: end.utc().format('X'),
        },
        headers: {
          Authorization: api_key,
        },
      }).then((response) => {
        setconditionData(response);
      });
  }, [flag]); //every time stormglassData btn is clicke it runs through the above

    const StormGlassDATA = () => {
          flag = flag + 1;
          console.log("DATA: ");
          console.log(conditionData);
          console.log(conditionData.data);
          console.log(conditionData.data.hours);
          /*console.log(conditionData.data.hours[0]);
          console.log(conditionData.data.hours[0].swellDirection);
          console.log(conditionData.data.hours[0].swellDirection.meteo);
          console.log(conditionData.data.hours[0].swellDirection.time); //SUCCESSFULLY GETS METEO VALUE OF
          console.log(conditionData.data.hours.length);*/
          const conlen = conditionData.data.hours.length
          
          for(let i = 0; i < conlen; i = i + 1)
          {
            const postData = { //Gather data
              condtionID: 0,
              windspeed: String(conditionData.data.hours[i].windSpeed.meteo),
              swellSize: String(conditionData.data.hours[i].swellHeight.meteo),
              swellDirection: String(conditionData.data.hours[i].swellDirection.meteo),
              swellPeriod: String(conditionData.data.hours[i].swellPeriod.meteo),
              dateTime: String(conditionData.data.hours[i].time),
              locationID: 2,
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
            try {
              const response = await axios.post(postUrl, postData);
              console.log('Data posted successfully:', response.data);
            } catch (error) {
              console.error('Error posting data:', error);
            }
          }

          postDataToServer();
        }
          


          //INSERT DATA


            
        }
      


  return (
    <div>
      <h1>{surfLocation.name}</h1>
      <ForecastTable locationID={realLocation}/>
      <Button onClick={StormGlassDATA}>Update database</Button>
      
    </div>
  );
}

export default ForecastPage;