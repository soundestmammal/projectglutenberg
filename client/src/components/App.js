import React from 'react';
import Header from './Header';
import List from './List';
import Map from './Map';
import "../styles/app.css";

const App = () => {
    return (
        <div style={{margin: 0, padding: 0}}>
            <Header />
            <div className="map-list-wrapper">
                <List />
                <Map
                    isMarkerShown
                    onIdle
                />
            </div>
            
        </div>
    );
}

export default App;