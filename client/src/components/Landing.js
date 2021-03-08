import React from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import restaurant from "../image-assets/restaurant.jpg";
import Logo from "./Logo";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <div className="nav-wrapper">
        <div className="nav-content">
          <div className="left">
            <Logo />
          </div>

          <div className="right">
            <Link to="/signin" className="login">
              Log in
            </Link>
            <Link to="/auth" className="get-started">
              Get Started
            </Link>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default Landing;
