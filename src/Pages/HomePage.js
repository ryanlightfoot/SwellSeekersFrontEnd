import React, { useContext, useEffect, useState} from "react";
import { UserContext } from "../App";
import WetsuitScroller from "../Components/WetsuitScroller";
import SurfBoardScroller from "../Components/SurfBoardScroller";
import LocationScroller from "../Components/LocationScroller";
import img1 from "../assets/HomePage1.jpg";
import img2 from "../assets/HomePage2.jpg";
import img3 from "../assets/Homepage3.jpg";
import './HomePage.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import OwnedSurfboardScroller from "../Components/OwnedSurfboardscroller";
import OwnedWetsuitScroller from "../Components/OwnedWetsuitScroller";

function HomePage() {

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  let locationNames = []

  const navJBay = () => {
    // Perform the action you want when the div is clicked
    navigate(`/Forecast/0`);
  };

  const navMun = () => {
    // Perform the action you want when the div is clicked
    navigate(`/Forecast/1`);
  };

  useEffect(() => {
    // Assuming your API endpoint for fetching a surf location by ID is something like '/api/surflocations/{locationId}'
    axios.get(`https://localhost:7177/api/SurfLocation`)
        .then((response) => {
            for(let i = 0; i < response.data.length; i = i + 1)
            {
                locationNames.push(response.data[i].name);

            }
        })
        .catch((error) => {
            console.error("Error fetching surf location: ", error);
        });
    }, [user]);

    console.log(locationNames[0]);
  return (
    <div class="allBack" >


        {user ? (
            <>
              <p class="title">Your Favourite Locations</p>
              <LocationScroller/>
              <p class="title">Your Wetsuits</p>
              <OwnedWetsuitScroller/>
              <p class="title">Your Surfboards</p>
              <OwnedSurfboardScroller/>
            </>

        ) : (
            <>
            <p class="title">About us</p>
            <div class="content">
              <img src={img1} alt="SwellSeekers Image" class="left-image"></img>
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
            </> 
        )}
      <p class="title">Spots to check out</p>
      <div class="clickablecontent" onClick={navJBay}>
              <img src={img2} alt="SwellSeekers Image" class="left-image"></img>
                <p align="center" style={{ padding: '0.5% 6% 0.5% 6%' }}>
                  <b class="biggerfont">Jeffreys Bay</b><br/>
                  Jeffreys Bay, located on the Eastern Cape of South Africa, 
                  is renowned as one of the world's premier surfing destinations. 
                  This coastal town boasts consistent and world-class surf breaks,
                   most notably the famous Supertubes, which attract surfers from 
                   across the globe. With its laid-back atmosphere, stunning beaches, 
                   and a vibrant surf culture, Jeffreys Bay offers an idyllic setting 
                   for surf enthusiasts and beach lovers alike.
                </p>
              </div>
              <div class="clickablecontent" onClick={navMun}>
              <img src={img3} alt="SwellSeekers Image" class="left-image"></img>
                <p align="center" style={{ padding: '0.5% 6% 0.5% 6%' }}>
                  <b class="biggerfont">Mundaka</b><br/>
                  Mundaka, located in the Basque Country of northern Spain, 
                  is a picturesque coastal town renowned for its world-class 
                  surfing conditions. It is often referred to as one of the top 
                  surf destinations in Europe, attracting surfers from around 
                  the globe. With its stunning natural beauty, charming streets, 
                  and vibrant local culture, Mundaka offers not only thrilling waves
                   but also a delightful experience for visitors exploring its
                    unique coastal setting.
                </p>
              </div>
              
              <p class="title">Wetsuits</p>
              <WetsuitScroller/>
              <p class="title">Surfboards</p>
              <SurfBoardScroller/>
      <div class="extend"></div>

    </div>
  );
}

export default HomePage;