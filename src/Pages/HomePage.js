import React, { useContext, useEffect, useState} from "react";
import { UserContext } from "../App";
import WetsuitScroller from "../Components/WetsuitScroller";
import SurfBoardScroller from "../Components/SurfBoardScroller";
import LocationScroller from "../Components/LocationScroller";
import img1 from "../assets/HomePage1.jpg";
import img2 from "../assets/HomePage2.jpg";
import './HomePage.css';
import axios from "axios";

function HomePage() {

  const { user, setUser } = useContext(UserContext);
  let locationNames = []

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
      <p class="title">Welcome to SwellSeekers.</p>
      <hr width="25%"/>
      <LocationScroller/>
        {user ? (
            <>
              <p class="title">Your Favourite Locations</p>
              <WetsuitScroller/>
              <p class="title">Your Wetsuits</p>
              <WetsuitScroller/>
              <p class="title">Your Surfboards</p>
              <SurfBoardScroller/>
            </>

        ) : (
            <>
              <p class="title">Wetsuits</p>
              <WetsuitScroller/>
              <p class="title">Surfboards</p>
              <SurfBoardScroller/>
              <p class="title">Locations</p>
              <SurfBoardScroller/>
            </> 
        )}
        <p class="biggerfont"><b>About us</b></p>
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
      <div class="content">
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
      <div class="extend"></div>

    </div>
  );
}

export default HomePage;