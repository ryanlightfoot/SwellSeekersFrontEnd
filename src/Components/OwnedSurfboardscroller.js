import React, { useState, useEffect, useContext } from 'react';
import './Scroller.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../App";

function OwnedSurfboardScroller() {
    const navigate = useNavigate();
    const { userID } = useContext(UserContext); // No need for user and setUser in this component
    const [Board, setBoard] = useState([]);
    const [SurfBoard, setSurfBoard] = useState([]);
    const [BoardName, setBoardName] = useState([]);
    const [selectedSurfBoard, setSelectedSurfBoard] = useState(0);

    useEffect(() => {
        axios.get(`https://localhost:7177/api/OwnedSurfboards/ByUser?_userId=${userID}`)
            .then((response) => {
                setBoard(response.data);
            })
            .catch((error) => {
                console.error("Error fetching favorite locations: ", error);
            });
    }, [userID]);

    useEffect(() => {
        let data = [];
        for(let i = 1; i < Board.length + 1; i++)
        {
            axios.get(`https://localhost:7177/api/SurfBoard/${i}`)
            .then((response) => {
                setBoardName(response.data);
                console.log("CHICKKEN");
                console.log(response.data.size + ", " + response.data.type);
                data.push(response.data.size + ", " + response.data.type)
            })
            .catch((error) => {
                console.error("Error fetching favorite locations: ", error);
            });
        }
        setSurfBoard(data);
    }, [Board]);

    const handleSurfBoardClick = (SurfBoard) => {
        setSelectedSurfBoard(SurfBoard);
        navigate(`/SurfBoard/1`);
      };
      return (
        <div align="center" className="wetsuit-scroller-container">
          <div className="wetsuit-list">
            {SurfBoard.map((SurfBoard, index) => (
              <div
                key={index}
                className={`wetsuit-item ${selectedSurfBoard === SurfBoard ? 'selected' : ''}`}
                onClick={() => handleSurfBoardClick(SurfBoard)}
              >
                {SurfBoard}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    export default OwnedSurfboardScroller;