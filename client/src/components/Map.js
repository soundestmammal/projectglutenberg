import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import "../styles/map.css";

const Map = withScriptjs(withGoogleMap((props) => {
    return (
            <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 40.695, lng: -73.5 }}
            >
                {props.isMarkerShown && <Marker position={{ lat: 40.695, lng: -73.5}} />}
            </GoogleMap>
    )
}));

export default Map;