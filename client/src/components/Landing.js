import React from "react";
import Hero from "./Hero";
import Questions from "./Questions";
import restaurant from "../image-assets/restaurant.jpg";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div className="landing-wrapper">

      <div className="hero-container">
        <Hero/>
      </div>
      <div className="value-props">
        <div className="value-props-content">
          <h2 className="value-props-title">The Modern Way to Eat</h2>
          <p className="value-props-subtitle">
            Oasis makes eating out stress-free. Our platform promotes
            transparency so you know what to expect at the restaurant.
          </p>

        </div>
      </div>
      <div className="rest-image">
        <img src={restaurant} alt="restaurant" />
      </div>
      <Questions />
    </div>
  );
};

export default Landing;
