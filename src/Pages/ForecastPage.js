import React, { useState, useEffect } from "react";
import ForecastTable from "../Components/ForecastTable";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ForecastPage() {
    const { location } = useParams();
    const realLocation = location + 1;
    const [surfLocation, setSurfLocation] = useState(null);


    useEffect(() => {
        // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
        axios.get(`https://localhost:7177/api/SurfLocation/${1}`)
            .then((response) => {
                console.log(response.data);
                console.log(realLocation);
                setSurfLocation(response.data);
                console.log(response.data.name);
            })
            .catch((error) => {
                console.error("Error fetching surf location: ", error);
            });
    });

  return (
    <div>
      <h1>{surfLocation.name}</h1>
      <ForecastTable/>
    </div>
  );
}

export default ForecastPage;