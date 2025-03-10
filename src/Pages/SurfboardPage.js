import React, { useContext, useEffect, useState} from "react";
import { UserContext } from "../App";
import Register from "../Components/Register";
import OwnedSurfboardScroller from "../Components/OwnedSurfboardscroller";
import img1 from "../assets/SurfboardPage1.jpg";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';

function SurfboardPage() {
  const { userID } = useContext(UserContext);
  const location = useLocation();
  const { state } = location;
  const { index } = state || {};
  const [surfboard, setSurfboard] = useState("null");
  const [Favsurfboard, setFavsurfboard] = useState("null");
  const [star, setStar] = useState(0);

  console.log("PEEPEE: " + index);

  useEffect(() => {
    // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
    axios.get(`https://localhost:7177/api/SurfBoard/${index}`)
        .then((response) => {
            setSurfboard(response.data);
            console.log("DETEEE: " + response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Error fetching surf location: ", error);
        });

        axios.get(`https://localhost:7177/api/OwnedSurfboards/${userID}/${index}`)
        .then((response) => {
          setFavsurfboard(response);
  
            if(Favsurfboard.data.ownedBoardID === null)
            {
              setStar(0);
            }
            else
            {
              setStar(1);
            }
          
        })
        .catch((error) => {
            console.error("Error fetching surf location: ", error);
        });


    }, [location]);

    

    const handleStarClick  = () => {

    }

  return (
    <div class="allback" >
      <p class="title">{surfboard.brand}, {surfboard.name} details      
      {userID ? (
      <StarIcon
          onClick={handleStarClick}
          style={{ color: star === 0 ? '#424141' : '#e87a5e', cursor: 'pointer' }}
          fontSize="medium"
        />
        ) : (<></>)}</p>

      <div class="content3">
        <p>Brand: {surfboard.brand}</p>
        <p>Model: {surfboard.name}</p>
        <p>Max swell: {surfboard.highSwell} feet</p>
        <p>Min swell: {surfboard.lowSwell} feet</p>
        <p>Size: {surfboard.size}"</p>
        <p>Board type: {surfboard.type}</p>      
      </div>

      {userID ? (
        <>
          <p class="title">Your owned surfboards</p>
          <OwnedSurfboardScroller/>
        </>
        ):(<></>)}

      <div class="content">
      <img src={img1} alt="wetsuit Image" class="left-image"></img>
      <p align="center" style={{ padding: '0.5% 6% 0.5% 6%' }}>
        Surfboards are crucial for surfers as they serve as 
        the primary tool for riding and catching waves. These 
        specialized boards are designed to provide buoyancy, 
        stability, and control, allowing surfers to harness the 
        energy of ocean waves and ride them effectively. The shape, 
        size, and design of surfboards also influence a surfer's
        ability to perform maneuvers and have a direct impact on the 
        overall surfing experience.</p>
        </div>
    </div>
  );
}

export default SurfboardPage;