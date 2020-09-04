import React from 'react';
import { Link } from 'react-router-dom';
import singleSource from '../image-assets/server.png';
import restaurant from '../image-assets/restaurant.jpg';
import "../styles/landing.css";

const Landing = () => {
    return(
        <div className="landing">
            <div className="nav">
                <div className="left"></div>
                <div className="logo">Oasis</div>
                <div className="right">
                    <Link to="/signin" className="login">Log in</Link>
                    <Link to="/auth" className="get-started">Get Started</Link>
                </div>
            </div>
            <div className="hero-container">
                <div className="hero-image">
                    <div className="hero-content">
                        <div className="hero-title">The Future of Gluten Free</div>
                        <div className="hero-subtitle">Our voices, our restaurants, our experiences, our favorites, our way. Together.</div>
                        <Link className="hero-beta" to="/app">
                            <div>Try it now</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="value-props">
                <div className="value-props-content">
                    <h2 className="value-props-title">The Modern Way to Eat</h2>
                    <p className="value-props-subtitle">Oasis makes eating out stress-free. Our platform promotes transparency so you know what to expect at the restaurant.</p>
                </div>
            </div>
            <div className="rest-image">
                <img src={restaurant} alt="restaurant" style={{ height: '400px'}}/>
            </div>
        </div>
    );
}

export default Landing;