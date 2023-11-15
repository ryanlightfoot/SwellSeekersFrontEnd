import React, { useContext} from "react";
import OwnedWetsuitScroller from "../Components/OwnedWetsuitScroller";
import { UserContext } from "../App";
import WetsuitPage1 from "../assets/WetsuitPage1.jpg";
import "../Pages/HomePage.css";
import { useLocation } from 'react-router-dom';

function WetsuitPage(props) {
  const { userID } = useContext(UserContext);
  const location = useLocation();
  const { state } = location;
  const { index } = state || {};

  console.log(index);
  return (
    <div class="allBack">
      <div> 
        <p class="title">Wetsuits</p>
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