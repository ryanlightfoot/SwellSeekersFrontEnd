import React, { useState, useEffect, useContext } from 'react';
import './Scroller.css'; // Same CSS styling as wetsuit
import axios from 'axios';
import { UserContext } from "../App";

function LocationScroller() {

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
        axios.get(`https://localhost:7177/api/Favourite/ByUser?_userId=1`)
            .then((response) => {
                    console.log("FAVS");
                    console.log(response);
            })
            .catch((error) => {
                console.error("Error fetching surf location: ", error);
            });
        }, [user]);



  const Locations = [
    'Loc 1',
    'Loc 2',
    'Loc 3',
    'Loc 4',
    'Loc 5',
    'Loc 6',
    'Loc 7',
    // Add more SurfBoard as needed
  ];

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSurfBoardClick = (SurfBoard) => {
    setSelectedLocation(SurfBoard);
  };

  return (
    <div align="center" className="wetsuit-scroller-container">
      <div className="wetsuit-list">
        {Locations.map((Location, index) => (
          <div
            key={index}
            className={`wetsuit-item ${selectedLocation === Location ? 'selected' : ''}`}
            onClick={() => handleSurfBoardClick(Location)}
          >
            {Location}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationScroller;
