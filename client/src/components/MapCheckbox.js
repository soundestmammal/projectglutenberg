import React from 'react';
import "../styles/map.css";

const MapCheckbox = () => {
    return (
        <div className="map-checkbox-container">
            <input type="checkbox"></input>
            <span>Search as map moves</span>
        </div>
    );
}

export default MapCheckbox;