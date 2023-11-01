import React, { useState, useEffect, useContext } from 'react';
import './Scroller.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../App";

function OwnedWetsuitScroller() {
  const navigate = useNavigate();
  const { userID } = useContext(UserContext); // No need for user and setUser in this component
  const [Suit, SetSuit] = useState([]);
  const [Wetsuit, setWetsuit] = useState([]);
  const [WetsuitName, setWetsuitName] = useState([]);
  const [Locations, setLocations] = useState([]);
  const [selectedWetsuit, setSelectedWetsuit] = useState(0);

  useEffect(() => {
    axios.get(`https://localhost:7177/api/OwnedWetsuits/ByUser?_userId=${userID}`)
        .then((response) => {
          setWetsuit(response.data);
        })
        .catch((error) => {
            console.error("Error fetching favorite locations: ", error);
        });
}, [userID]);

useEffect(() => {
  let data = [];
  for(let i = 1; i < Wetsuit.length + 1; i++)
  {
      axios.get(`https://localhost:7177/api/Wetsuit/${i}`)
      .then((response) => {
        setWetsuitName(response.data);
          data.push(response.data.brand + ", " + response.data.name)
      })
      .catch((error) => {
          console.error("Error fetching favorite locations: ", error);
      });
  }
  SetSuit(data);
}, [Wetsuit]);


  const handleWetsuitClick = (Wetsuit) => {
    setSelectedWetsuit(Wetsuit);
    navigate(`/Wetsuit/1`);
  };

  return (
    <div align="center" className="wetsuit-scroller-container">
      <div className="wetsuit-list">
        {Suit.map((Suit, index) => (
          <div
            key={index}
            className={`wetsuit-item ${selectedWetsuit === Suit ? 'selected' : ''}`}
            onClick={() => handleWetsuitClick(Suit)}
          >
            {Suit}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnedWetsuitScroller;