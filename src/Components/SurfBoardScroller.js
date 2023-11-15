import React, { useState, useEffect, useContext } from 'react';
import './Scroller.css'; // Same CSS styling as wetsuit
import axios from 'axios';
import { UserContext } from "../App";
import { useNavigate } from 'react-router-dom';

function SurfBoardScroller() {

  const [SurfBoard, setSurfBoard] = useState([]);
  const { userID } = useContext(UserContext);
  const navigate = useNavigate();

  const [selectedSurfBoard, setSelectedSurfBoard] = useState(null);
  const [SurfBoards, setSurfBoards] = useState(null);

  useEffect(() => {
    axios.get(`https://localhost:7177/api/SurfBoard`)
      .then((response2) => {
        setSurfBoards(response2.data);
        console.log("NAME: " + response2.data[0].name);
        
        return response2.data;
      })
      .catch((error) => {
        console.error("Error fetching Surfboards: ", error);
        return null;
      })
    }, [userID]);

    useEffect(() => {
      let data = [];
      if (SurfBoards && SurfBoards.length > 0) {
        for (let i = 0; i < SurfBoards.length; i++) {
          console.log("EEEEEEEE" + SurfBoards[i].name);
          data.push((SurfBoards[i].size + ", " + SurfBoards[i].name));
        }
        setSurfBoard(data);
      }
      }, [SurfBoards]);


      const handleSurfBoardClick = (surfBoard, index) => {
        setSelectedSurfBoard(surfBoard - 1);
        index = index + 1;
        navigate(`/SurfBoard/${index}`,{state: {index}});
      };
      
      return (
        <div align="center" className="wetsuit-scroller-container">
          <div className="wetsuit-list">
            {SurfBoard.map((surfBoard, index) => (
              <div
                key={index}
                className={`wetsuit-item ${selectedSurfBoard === surfBoard ? 'selected' : ''}`}
                onClick={() => handleSurfBoardClick(surfBoard, index)}
              >
                {surfBoard}
              </div>
            ))}
          </div>
        </div>
      );
}

export default SurfBoardScroller;
