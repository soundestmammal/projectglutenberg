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
                    <span>Log in</span>
                    <span>Get Started</span>
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
            <div className="motivations">
                <div className="motivations-content">
                    <div className="motivation-group">
                        <div className='motivation-card'>
                            <h3>Promote Transparency</h3>
                            <p>Establish stronger relationships with restaurants and make it easier than ever to share our experiences.</p>
                        </div>
                        <div className='motivation-card'>
                            <img src={singleSource}/>
                        </div>
                    </div>
                    <div className="motivation-card">
                        <div className='motivation-content'>
                        {/* Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
                            <h3>Single Source</h3>
                            <img src={singleSource} alt="cloud" style={{height: '200px'}}/>
                            <p>Oasis is the swiss army knife to help you escape from your gluten free food desert.</p>
                        </div>
                    </div>
                    <div className="motivation-card">
                        <div className='motivation-content'>
                            <img />
                            <h3>Data Driven</h3>
                            <p>We are the most ambitious platform to date to use data to map out the gluten free landscape</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="comparison">Here is how we match up against competitors</div>
            <div className="press">
                <h3>Featured in</h3>
                <div className="outlets">
                    <p className="the-sprueliac-times">The Sprueliac Times</p>
                    <p className="the-gluten-free-journal">The Gluten Free Journal</p>
                    <p className="silly-act-magazine">Silly Act Magazine</p>
                </div>
            </div>
            <div className="faq">Any questions?</div>
        </div>
    );
}

export default Landing;