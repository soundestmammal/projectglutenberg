import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MiniMarker from './MiniMarker';
import { key } from '../KEYS';
import "../styles/map.css";
import "../styles/minimap.css";

class MiniMap extends Component {

  static defaultProps = {
    zoom: 15
  };

  renderMap = () => {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: key}}
        center={this.props.center}
        zoom={this.props.zoom}
      >
        <MiniMarker lat={this.props.center.lat} lng={this.props.center.lng} />
      </GoogleMapReact>
    );
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