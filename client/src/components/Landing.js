import React from 'react';
import "../styles/landing.css";

const Landing = () => {
    return(
        <div className="landing">
            <div className="nav">
                <div className="logo">Oasis</div>
            </div>
            <div className="hero-container">
                <div className="hero-image">
                    <div className="hero-content">
                        <div className="hero-title">The Future of Gluten Free</div>
                        <div className="hero-subtitle">Our voices, our restaurants, our experiences, our favorites, our way. Together.</div>
                        <div className="hero-beta">Try it now</div>
                    </div>
                </div>
            </div>
            <div className="press">
                <h3>Featured in</h3>
                <div className="outlets">
                    <p className="the-sprueliac-times">The Sprueliac Times</p>
                    <p className="the-gluten-free-journal">The Gluten Free Journal</p>
                    <p className="silly-act-magazine">Silly Act Magazine</p>
                </div>
            </div>
            <div className="value-props">
                <h2>The Modern Way to Eat</h2>
                <p>Oasis makes eating out stress-free. Learn more about nearby gluten free options.</p>
            </div>
            <div className="motivations">These are the motivations</div>
            <div className="comparison">Here is how we match up agains competitors</div>
            <div className="faq">Any questions?</div>
        </div>
    );
}

export default Landing;