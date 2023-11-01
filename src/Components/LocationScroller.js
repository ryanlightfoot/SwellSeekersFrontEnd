import React, { useState, useEffect, useContext } from 'react';
import './Scroller.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../App";

function LocationScroller() {
    const navigate = useNavigate();
    const { userID } = useContext(UserContext); // No need for user and setUser in this component
    const [Location, setLocation] = useState([]);
    const [Locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(0);

    useEffect(() => {
        axios.get(`https://localhost:7177/api/Favourite/ByUser?_userId=${userID}`)
            .then((response) => {
                setLocation(response.data);
            })
            .catch((error) => {
                console.error("Error fetching favorite locations: ", error);
            });
    }, [userID]);

    useEffect(() => {
        if (Location.length > 0) {
            const locationPromises = [];

            for (let i = 1; i < Location.length + 2; i += 1) {
                locationPromises.push(
                    axios.get(`https://localhost:7177/api/SurfLocation/${i}`)
                        .then((response2) => {
                            return response2.data.name;
                        })
                        .catch((error) => {
                            console.error("Error fetching surf location: ", error);
                            return null;
                        })
                );
            }

            Promise.all(locationPromises)
                .then((locationNames) => {
                    const filteredLocationNames = locationNames.filter((name) => name !== null);
                    setLocations(filteredLocationNames);
                });
        }
    }, [Location]);

    const handleSurfBoardClick = (locationID) => {
        setSelectedLocation(parseInt(locationID) - 1 );
        const ID = parseInt(locationID);
        navigate(`/Forecast/${(ID)}`);
    };

    return (
        <div align="center" className="wetsuit-scroller-container">
          {Locations.length === 0 ? (
            <div>No favourited</div>
          ) : (
            <div className="wetsuit-list">
                {Locations.map((locationName, index) => (
                    <div
                        key={index}
                        className={`wetsuit-item ${selectedLocation === Location[index]?.locationID ? 'selected' : ''}`}
                        onClick={() => handleSurfBoardClick(index)}
                    >
                        {locationName}
                    </div>
                ))}
            </div>
          )}
        </div>
    );
}

export default LocationScroller;
