import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { key } from '../KEYS';
import "../styles/map.css";
import "../styles/minimap.css";

class MiniMap extends Component {

  static defaultProps = {
    zoom: 15
  };

    renderMarker = () => {
        return(
            <div className="pin" lat={this.props.center.lat} lng={this.props.center.lng} >
                <div className="marker-content">
                </div>
            </div>
        );
    }

  renderMap = () => {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: key}}
        center={this.props.center}
        zoom={this.props.zoom}
      >
        {this.renderMarker()}
      </GoogleMapReact> );
  }

  render() {
    return (
      <div className="minimap-container">
        {this.renderMap()}
        <div className="map-overlay"></div>
      </div>
    );
  }
}

export default MiniMap;