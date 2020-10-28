import React from "react";
import "../styles/score.css";

const Score = (props) => {
  function renderGreen() {
    let style = {};
    if (props.score > 2) {
      style = { border: "4px solid black" };
    }
    return <div className="box-low" style={style}></div>;
  }

  function renderYellow() {
    let style = {};
    if (props.score === 2) {
      style = { border: "4px solid black" };
    }
    return <div className="box-medium" style={style}></div>;
  }

  function renderOrange() {
    let style = {};
    if (props.score === 1) {
      style = { border: "4px solid black" };
    }
    return <div className="box-high" style={style}></div>;
  }

  function renderRed() {
    let style = {};
    if (props.score === 0) {
      style = { border: "4px solid black" };
    }
    return <div className="box-critical" style={style}></div>;
  }

  function returnRating() {
    let thisRating;
    if (props.score > 2) {
      thisRating = "Verified";
    } else if (props.score === 2) {
      thisRating = "Gluten Free Options";
    } else if (props.score === 1) {
      thisRating = "Has limited options";
    } else {
      thisRating = "Not accomodating";
    }
    return <div className="rating">{thisRating}</div>;
  }

  function renderScoreContainer() {
    return (
      <div className="score-container">
        {renderGreen()}
        {renderYellow()}
        {renderOrange()}
        {renderRed()}
      </div>
    );
  }

  return (
    <div className="box-container">
      {renderScoreContainer()}
      {returnRating()}
    </div>
  );
};

export default Score;
