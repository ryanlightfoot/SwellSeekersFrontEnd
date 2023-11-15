import React, { useState, useEffect, useContext } from 'react';
import './Scroller.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../App";
import { Favorite } from '@mui/icons-material';

function LocationScroller() {
    const navigate = useNavigate();
    const { userID } = useContext(UserContext); // No need for user and setUser in this component
    const [Location, setLocation] = useState([]);
    const [Locations, setLocations] = useState([]);
    let [Names] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(0);

    useEffect(() => {
        axios.get(`https://localhost:7177/api/Favourite/ByUser?_userId=${userID}`)
            .then((response) => {

                console.log(response.data[0].locationID);
                setLocation(response.data);
            })
            .catch((error) => {
                console.error("Error fetching favorite locations: ", error);
            });
    }, [userID]);

    useEffect(() => {
        if (Location.length > 0) {
            const locationPromises = [];

            for (let i = 0; i < Location.length; i += 1) {
                console.log("TIKKKKK" + i);
                console.log(Location[i].locationID);
                locationPromises.push(
                    axios.get(`https://localhost:7177/api/SurfLocation/${Location[i].locationID}`)
                        .then((response2) => {
                            Names.push(response2.data.name);
                            return response2.data.locationID;
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

    console.log("CHEEEK");
    console.log(Names);

    const handleSurfBoardClick = (locationID) => {
        setSelectedLocation(parseInt(locationID));

        const ID = parseInt(locationID - 1);
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
                        onClick={() => handleSurfBoardClick(Locations[index])}
                    >
                        {Names[index]}
                    </div>
                ))}
            </div>
          )}
        </div>
    );
}

export default LocationScroller;
