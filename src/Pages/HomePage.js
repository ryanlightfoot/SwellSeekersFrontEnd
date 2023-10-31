import React, { useContext } from "react";
import { UserContext } from "../App";
import WetsuitScroller from "../Components/WetsuitScroller";
import SurfBoardScroller from "../Components/SurfBoardScroller";
import {Typography} from '@mui/material';
import img1 from "../assets/HomePage1.jpg";
import './HomePage.css';

function HomePage() {

  const { user, setUser } = useContext(UserContext);

  return (
    <div class="allBack" >
      <p class="title">Welcome to SwellSeekers.</p>
      <hr width="25%"/>
      <div class="content">
      <img src={img1} alt="SwellSeekers Image" class="left-image"></img>
      <p align="center" style={{ padding: '0.5% 6% 0.5% 6%' }}><b class="biggerfont">About us</b><br/>Welcome to SwellSeekers, your premier destination for 
        surf enthusiasts. Our dedicated team of expert forecasters 
        provides real-time wave predictions, expert insights, and 
        precise data on tide, wind, and water conditions, ensuring 
        you're always prepared for the perfect ride. With a community 
        of surfers at your fingertips and access to surfing destinations 
        worldwide, SwellSeekers is your go-to source for a seamless and 
        informed surfing experience. Join us and stay in the know because 
        every wave matters.</p>
      </div>
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
              <p class="title">Locations</p>
              <WetsuitScroller/>
              <p class="title">Wetsuits</p>
              <WetsuitScroller/>
              <p class="title">Surfboards</p>
              <SurfBoardScroller/>
            </> 
        )}

    </div>
  );
}

export default HomePage;