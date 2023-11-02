import React, { useState, useEffect } from "react";
import ForecastTable from "../Components/ForecastTable";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import JsPDF from 'jspdf';
import './HomePage.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


function ForecastPage() {

  

    const { location } = useParams();
    const realLocation = parseInt(location) + 1; //GETS the actual location pos
    const [surfLocation, setSurfLocation] = useState("null");
    const [conditionData, setconditionData] = useState("null");
    const [DataName, setDataName] = useState([]);
    const end = moment().add(5, 'days').startOf('day');
    const api_key = '554bb738-2ed3-11ee-a26f-0242ac130002-554bb7a6-2ed3-11ee-a26f-0242ac130002';
    const postUrl = 'https://localhost:7177/api/LocationConditions';
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let conlen;

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

    useEffect(() => {
      // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
      try {
        for(let i = 0; i < conditionData.data.hours.length; i = i + 1)
        {
          const postData = { //Gather data
            condtionID: 0,
            windspeed: String(conditionData.data.hours[i].windSpeed.sg),
            windDirection: String(conditionData.data.hours[i].windDirection.sg),
            swellSize: String(conditionData.data.hours[i].swellHeight.sg),
            swellDirection: String(conditionData.data.hours[i].swellDirection.sg),
            swellPeriod: String(conditionData.data.hours[i].swellPeriod.sg),
            temp: String(conditionData.data.hours[i].airTemperature.sg),
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
      console.log(error.response);
    }
  }, [conditionData]);

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
          console.log(error.response);
      });

      //Storglass API gets data every ttime flag variable changes
      flag = flag + 1; 
      //The Try catches the error of initial loading the conditionData

          //INSERT DATA
            
      }

      //WRITE PDF REPORT OF FORECASTS
      const generatePDF = () => {
        const fileName = "Forecast_" + now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear() + ".pdf";
      
        // Define the scaling factor (adjust as needed)
        const scaleFactor = 0.75; // 0.75 means 75% of the original size
      
        const contentElement = document.querySelector('#report');
        const originalWidth = contentElement.clientWidth;
        const originalHeight = contentElement.clientHeight;
      
        // Calculate the scaled dimensions
        const scaledWidth = originalWidth * scaleFactor;
        const scaledHeight = originalHeight * scaleFactor;
      

      
        const report = new JsPDF('landscape', 'pt', 'a4');
        report.html(contentElement).then(() => {
          report.save(fileName);
      
          // Restore the original dimensions after generating the PDF
          contentElement.style.width = originalWidth + 'px';
          contentElement.style.height = originalHeight + 'px';
        });
      }
      

  return (
    <div id="report" class="forecastBack">
      <p class="title">{surfLocation.name}, {surfLocation.country}</p>
      <hr style={{ width: '50%' }}/>

      <p align="center" style={{ padding: '0.5% 10% 0.5% 10%' }}>{surfLocation.description}</p>

      <p class="dates">{now.getDate()}, {monthNames[now.getMonth()]}, {now.getFullYear()}</p>
      <ForecastTable locationID={realLocation} forecastDay={date}/>
      <p class="dates">{date2.getDate()}, {monthNames[date2.getMonth()]}, {date2.getFullYear()}</p>
      <ForecastTable locationID={realLocation} forecastDay={(date2.getFullYear().toString()+"-"+(date2.getMonth() + 1).toString()+"-"+date2.getDate().toString()+"T00:00:00")}/>
      <p class="dates">{date3.getDate()}, {monthNames[date3.getMonth()]}, {date3.getFullYear()}</p>
      <ForecastTable locationID={realLocation} forecastDay={(date3.getFullYear().toString()+"-"+(date3.getMonth() + 1).toString()+"-"+date3.getDate().toString()+"T00:00:00")}/>
      <p class="dates">{date4.getDate()}, {monthNames[date4.getMonth()]}, {date4.getFullYear()}</p>
      <ForecastTable locationID={realLocation} forecastDay={(date4.getFullYear().toString()+"-"+(date4.getMonth() + 1).toString()+"-"+date4.getDate().toString()+"T00:00:00")}/>
      <p class="dates">{date5.getDate()}, {monthNames[date5.getMonth()]}, {date5.getFullYear()}</p>
      <ForecastTable locationID={realLocation} forecastDay={(date5.getFullYear().toString()+"-"+(date5.getMonth() + 1).toString()+"-"+date5.getDate().toString()+"T00:00:00")}/>
      <div class="botForeButtons">
      <div class="footerText">
      <p class="coords">latitude: {surfLocation.latitude}</p>
      <p class="coords">longitude: {surfLocation.longitude}</p>
      </div>
      <button onClick={StormGlassDATA} class="button-5">Update database</button>
      <button onClick={generatePDF} class="button-5">Export PDF</button>
      </div>
      <p class="coords">
        ft - feet
        s - seconds
        °C - Degrees celsius
        m/s - meters per second
      </p>
    </div>
  );
}

export default ForecastPage;