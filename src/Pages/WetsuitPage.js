import React, { useContext, useEffect, useState} from "react";
import OwnedWetsuitScroller from "../Components/OwnedWetsuitScroller";
import { UserContext } from "../App";
import WetsuitPage1 from "../assets/WetsuitPage1.jpg";
import "../Pages/HomePage.css";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';

function WetsuitPage(props) {
  const { userID } = useContext(UserContext);
  const location = useLocation();
  const { state } = location;
  const { index } = state || {};
  const [Wetsuit, setWetsuit] = useState("null");
  const [FavWetsuit, setFavWetsuit] = useState("null");
  const [OwnedWetID, setOwnedWetID] = useState("null");
  const [star, setStar] = useState(0);


  useEffect(() => {
    // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
    axios.get(`https://localhost:7177/api/Wetsuit/${index}`)
        .then((response) => {
            setWetsuit(response.data);
        })
        .catch((error) => {
            console.error("Error fetching surf location: ", error);
        });

              // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
      axios.get(`https://localhost:7177/api/OwnedWetsuits/${userID}/${index}`)
      .then((response) => {
          setFavWetsuit(response);

          if(FavWetsuit.data.ownedWetID === null)
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

      console.log("CHEESSE2");
      console.log(FavWetsuit.data);

      
      try {
        if (FavWetsuit.data.ownedWetID === null) {
          setStar(0);
        } else {
          setStar(1);
        }
      } catch (error) {
        // Handle the error here, you can log it or perform any other actions
        console.error("The owned wetsuit record does not exist");
      } 
    }
  
  console.log(index);
  return (
    <div class="allBack">
      <div> 
      <p class="title">{Wetsuit.name} details 
      {userID ? (
      <StarIcon
          onClick={handleStarClick}
          style={{ color: star === 0 ? '#424141' : '#e87a5e', cursor: 'pointer' }}
          fontSize="medium"
        />
        ) : (<></>)}</p>
      <div class="content3">
        <p>Brand: {Wetsuit.brand}</p>
        <p>Model: {Wetsuit.name}</p>
        <p>Max temp: {Wetsuit.hightemp}°C</p>
        <p>Min temp: {Wetsuit.lowtemp}°C</p>
        <p>Thickness: {Wetsuit.thickness}</p>
        <p>Wetsuit type type: {Wetsuit.type}</p>      
      </div>
        {userID ? (
        <OwnedWetsuitScroller/>
        ):(<></>)}
      </div>
      <div class="content">
      <img src={WetsuitPage1} alt="wetsuit Image" class="left-image"></img>
      <p align="center" style={{ padding: '0.5% 6% 0.5% 6%' }}>Welcome to SwellSeekers, your premier destination for 
        surf enthusiasts. Our dedicated team of expert forecasters 
        provides real-time wave predictions, expert insights, and 
        precise data on tide, wind, and water conditions, ensuring 
        you're always prepared for the perfect ride. With a community 
        of surfers at your fingertips and access to surfing destinations 
        worldwide, SwellSeekers is your go-to source for a seamless and 
        informed surfing experience. Join us and stay in the know because 
        every wave matters.</p>
        </div>
      </div>
  );
}

export default WetsuitPage;