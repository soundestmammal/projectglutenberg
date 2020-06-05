import React from 'react';
import "../styles/map.css";

const MapCheckbox = (props) => {
    return (
        <div className="map-checkbox-container">
            <input type="checkbox" checked={props.checked} onChange={props.toggle}></input>
            <span>Search as map moves</span>
        </div>
    );
}

export default MapCheckbox;