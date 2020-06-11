import React, { Component } from 'react';
import Loading from './Loading';
import "../styles/business.css";

const ReturnComponent = (props) => {

    function renderCategories() {
        let returnMe = "";
        for(let i = 0; i < props.rest.categories.length; i++) {
            if(i+1 === props.rest.categories.length) {
                returnMe = returnMe + props.rest.categories[i].title;
            } else {
                returnMe = returnMe + props.rest.categories[i].title + ", ";
            }
        }
        return returnMe;
    }

    function renderHours() {

        const dateDictionary = {
            0: "Mon",
            1: "Tue",
            2: "Wed",
            3: "Thu",
            4: "Fri",
            5: "Sat",
            6: "Sun"
        }
        return(
        // Loop through array
        props.rest.hours[0].open.map((day) => {
            // Populate each span with properly formatted time
            let dayOfWeek = dateDictionary[day.day];
            // If it is open now, then add the open now text to span
            // Generate 7 spans
            return(
                <div>
                    <span>{dayOfWeek}</span>
                </div>
            );
        })
        );
    }
    console.log(props.rest);
    return(
        <div>
        <div className="business-photos">
            {props.rest.photos.map(pic => <img src={pic} alt="restaurant" className="individual-photo" key={pic}></img>)}
            <img src={props.rest.photos[0]} alt="restaurant" className="individual-photo" ></img>
        </div>
        <div className="business-content">
            <div className="business-left">
                <div className="business-title">{props.rest.name}</div>
                <div>
                    <span className="business-price">{props.rest.price}</span>
                    <span className="middle">-</span>
                    <span className="business-categories">{renderCategories()}</span>
                </div>
                <div className="business-interaction">
                    <div className="business-button" style={{background: 'red', color: 'white'}}>Write a Review</div>
                    <div className="business-button">Add Photo</div>
                    <div className="business-button">Share</div>
                    <div className="business-button">Save</div>
                </div>
                <div className="covid-update">
                    <h2>COVID-19 Update: Business operations may be affected</h2>
                    <p>Due to ongoing precautionary measures, please contact the business directly for updated hours and availability</p>
                </div>

                <div className="business-review">
                    <h2>Review Highlights</h2>
                    <div className="business-review-card">
                        <img className="business-review-image" src="https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80" alt="review experience" />
                        <p>	
                            “From pour overs to nitro cold brew to kombucha to even masala chai they seem to have nailed just about anything your caffeine craving heart could desire"</p>
                    </div>
                    <div className="business-review-card">
                        <img className="business-review-image" src="https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80" alt="review experience" />
                        <p>	
                            “From pour overs to nitro cold brew to kombucha to even masala chai they seem to have nailed just about anything your caffeine craving heart could desire"</p>
                    </div>
                    <div className="business-review-card">
                        <img className="business-review-image" src="https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80" alt="review experience" />
                        <p>	
                            “From pour overs to nitro cold brew to kombucha to even masala chai they seem to have nailed just about anything your caffeine craving heart could desire"</p>
                    </div>
                </div>

                <div className="business-location">
                    <h2>Location & Hours</h2>
                    <div className="business-location-information">
                        <div className="business-minimap">Put a minimap here</div>
                        {/* Wrap them in a div */}
                        <div className="business-hours-container">
                            {renderHours()}
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </div>
    );
}

class Business extends Component {

    conditionalRender = () => {
        if(this.props.rest !== null) {
            return <ReturnComponent rest={this.props.rest} />
        } else {
            return <Loading />
        }
    }

    render() {
        return(
            <div className="business-container">
                {this.conditionalRender()}
            </div>
        );
    }
};

export default Business;