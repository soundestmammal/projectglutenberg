import React from 'react';
import Header from './Header';
import List from './List';
import Map from './Map';
import "../styles/app.css";
import { KEYS } from "../KEYS";

const App = () => {
    return (
        <div style={{margin: 0, padding: 0}}>
            <Header />
            <div className="map-list-wrapper">
                <List />
                <Map
                    isMarkerShown
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${KEYS}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `90vh`, flexGrow: `3` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
            
        </div>
    );
}

export default App;