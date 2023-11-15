import React, { useState, useEffect, useContext } from 'react';
import './Scroller.css'; // Same CSS styling as wetsuit
import axios from 'axios';
import { UserContext } from "../App";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function WetsuitScroller() {
  const wetsuits = [
    'Wetsuit 1',
    'Wetsuit 2',
    'Wetsuit 3',
    'Wetsuit 4',
    'Wetsuit 5',
    'Wetsuit 6',
    'Wetsuit 7',
    // Add more wetsuits as needed
  ];
  
    const { userID } = useContext(UserContext);
    const navigate = useNavigate();
  
    const [Wetsuits, setWetsuits] = useState(null);
    const [selectedWetsuit, setSelectedWetsuit] = useState(null);
    const [Wetsuit, setWetsuit] = useState([]);
  
    useEffect(() => {
      axios.get(`https://localhost:7177/api/Wetsuit`)
        .then((response2) => {
          setWetsuits(response2.data);
          console.log("NAME: " + response2.data[0].name);
          
          return response2.data;
        })
        .catch((error) => {
          console.error("Error fetching Wetsuits: ", error);
          return null;
        })
      }, [userID]);
  
      useEffect(() => {
        let data = [];
        if (Wetsuits && Wetsuits.length > 0) {
          for (let i = 0; i < Wetsuits.length; i++) {
            console.log("EEEEEEEE" + Wetsuits[i].name);
            data.push((Wetsuits[i].brand + ", " + Wetsuits[i].name));
          }
          setWetsuit(data);
        }
        }, [Wetsuits]);


        const handleWetsuitClick = (wetsuit, index) => {
          setSelectedWetsuit(wetsuit - 1);
          index = index + 1;
          navigate(`/Wetsuit/${index}`,{state: {index}});
        };
        
        return (
          <div align="center" className="wetsuit-scroller-container">
            <div className="wetsuit-list">
              {Wetsuit.map((wetsuit, index) => (
                <div
                  key={index}
                  className={`wetsuit-item ${selectedWetsuit === wetsuit ? 'selected' : ''}`}
                  onClick={() => handleWetsuitClick(wetsuit, index)}
                >
                  {wetsuit}
                </div>
              ))}
            </div>
          </div>
        );
        
}

export default WetsuitScroller;
