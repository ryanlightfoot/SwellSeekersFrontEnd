import React, { useState, useEffect, useContext } from 'react';
import './Scroller.css'; // Same CSS styling as wetsuit
import axios from 'axios';
import { UserContext } from "../App";

function LocationScroller() {

    const { user, setUser, userID, setUserID  } = useContext(UserContext);
    const [Location, setLocation] = useState("null");
    const [LocName, setLocName] = useState([]);
    const [Locations, setLocations] = useState([]);
    let Locations2 = [];
    let flag;


    useEffect(() => {
      axios.get(`https://localhost:7177/api/Favourite/ByUser?_userId=${userID}`)
          .then((response) => {
              setLocation(response.data);
              console.log("FAVS");
              console.log(Location.length);
  
              const locationPromises = [];
  
              for (let i = 1; i < (Location.length); i += 1) {
                  locationPromises.push(
                      axios.get(`https://localhost:7177/api/SurfLocation/${i}`)
                          .then((response2) => {
                              return response2.data.name;
                          })
                          .catch((error) => {
                              console.error("Error fetching surf location: ", error);
                              console.log(error.response);
                              return null;
                          })
                  );
              }
  
              Promise.all(locationPromises)
                  .then((locationNames) => {
                      const filteredLocationNames = locationNames.filter((name) => name !== null);
                      console.log("Locations");
                      console.log(filteredLocationNames);
                      setLocations(filteredLocationNames);
                  });
          })
          .catch((error) => {
              console.error("Error fetching favorite locations: ", error);
          });
  }, [user]);
  
        console.log("PPPP");
        console.log(LocName);

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
