import React, { useState, useEffect } from "react";
import ForecastTable from "../Components/ForecastTable";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ForecastPage() {
    const { location } = useParams();
    const realLocation = parseInt(location) + 1; //GETS the actual location pos
    const [surfLocation, setSurfLocation] = useState("null");


    useEffect(() => {
        // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
        axios.get(`https://localhost:7177/api/SurfLocation/${realLocation}`)
            .then((response) => {

                setSurfLocation(response.data);
            })
            .catch((error) => {
                console.error("Error fetching surf location: ", error);
            });
    }, [location]);


  return (
    <div>
      <h1>{surfLocation.name}</h1>
      <ForecastTable locationID={realLocation}/>
    </div>
  );
}

export default ForecastPage;