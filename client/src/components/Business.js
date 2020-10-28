import React, { Component } from "react";
import Loading from "./Loading";
import MiniMap from "./MiniMap";
import "../styles/business.css";
import "../styles/map.css";

const ReturnComponent = (props) => {
  function renderAddress() {
    return (
      <div className="business-address">
        <span>{props.rest.location.display_address[0]}</span>
        <span>{props.rest.location.display_address[1]}</span>
      </div>
    );
  }

  function renderOpenNow(dayFromMap) {
    const d = new Date();
    let day = d.getDay();
    if (day === 0) {
      day = 6;
    } else {
      day--;
    }
    if (props.rest.hours[0].is_open_now && day === dayFromMap) {
      return <span className="open-now">Open now!!!</span>;
    }
  }

  function returnCenter() {
    let center = {};
    center["lat"] = props.rest.coordinates.latitude;
    center["lng"] = props.rest.coordinates.longitude;
    return center;
  }

  function renderCategories() {
    let returnMe = "";
    for (let i = 0; i < props.rest.categories.length; i++) {
      if (i + 1 === props.rest.categories.length) {
        returnMe = returnMe + props.rest.categories[i].title;
      } else {
        returnMe = returnMe + props.rest.categories[i].title + ", ";
      }
    }
    return returnMe;
  }

  function renderHours() {
    if (props.rest.hours === undefined || props.rest.hours.length === 0)
      return null;

    const dateDictionary = {
      0: "Mon",
      1: "Tue",
      2: "Wed",
      3: "Thu",
      4: "Fri",
      5: "Sat",
      6: "Sun",
    };
    return (
      // Loop through array
      props.rest.hours[0].open.map((day) => {
        // Populate each span with properly formatted day of week
        let dayOfWeek = dateDictionary[day.day];
        let newStart = day.start.split("");
        newStart.splice(2, 0, ":");
        newStart = newStart.join("");

        const open = new Date(`March 14, 2020 ${newStart}`);
        const options = {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };
        const openTimeString = open.toLocaleString("en-us", options);
        // transform the time to HH:MM

        let newClose = day.end.split("");
        newClose.splice(2, 0, ":");
        newClose = newClose.join("");
        const close = new Date(`March 14, 2020 ${newClose}`);
        const closeTimeString = close.toLocaleString("en-us", options);

        // If it is open now, then add the open now text to span
        // Generate 7 spans
        return (
          <div key={dayOfWeek}>
            <span className="hours-day">{dayOfWeek}</span>
            <span className="hours-time">{openTimeString}</span>
            <span> - </span>
            <span className="hours-time">{closeTimeString}</span>
            {renderOpenNow(day.day)}
          </div>
        );
      })
    );
  }

  return (
    <div>
      <div className="business-photos">
        {props.rest.photos.map((pic) => (
          <img
            src={pic}
            alt="restaurant"
            className="individual-photo"
            key={pic}
          ></img>
        ))}
        <img
          src={props.rest.photos[0]}
          alt="restaurant"
          className="individual-photo"
        ></img>
      </div>
      <div className="business-content">
        <div className="business-title">{props.rest.name}</div>
        <div>
          <span className="business-price">{props.rest.price}</span>
          <span className="middle">-</span>
          <span className="business-categories">{renderCategories()}</span>
        </div>
        <div
          className="business-interaction"
          onClick={() => alert("This feature is still under development")}
        >
          <div
            className="business-button"
            style={{ background: "red", color: "white" }}
          >
            Write a Review
          </div>
          <div className="business-button">Add Photo</div>
          <div className="business-button">Share</div>
          <div className="business-button">Save</div>
          <div className="business-button">{props.rest.phone}</div>
        </div>
        <div className="covid-update">
          <h2>COVID-19 Update: Business operations may be affected</h2>
          <p>
            Due to ongoing precautionary measures, please contact the business
            directly for updated hours and availability
          </p>
        </div>

        <div className="business-review">
          <h2>Verified Reviews</h2>
          <p>No reviews at this time</p>
        </div>

        <div className="business-location">
          <h2>Location & Hours</h2>
          <div className="business-location-information">
            <div className="business-minimap">
              <MiniMap center={returnCenter()} googleMapsKey={props.googleMapsKey} />
              {renderAddress()}
            </div>
            <div className="business-hours-container">{renderHours()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

class Business extends Component {
  conditionalRender = () => {
    if (this.props.rest !== null) {
      return <ReturnComponent rest={this.props.rest} />;
    } else {
      return <Loading />;
    }
  };

  render() {
    return <div className="business-container">{this.conditionalRender()}</div>;
  }
}

export default Business;
