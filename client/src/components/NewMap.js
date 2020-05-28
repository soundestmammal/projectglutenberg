import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { key } from '../KEYS';
import "../styles/map.css";

/*
  May 26, 2020
  Note to future developer:
    1. Marker refactor into a new component?
    2. Fix the defaultProps, check the documentation
    3. Style the markers
    4. Add card when hover is activated
    5. Match the highlighting when hovered map and list
    6. Fix the height - it is currently randomly 80vh (think about what the correct height would be.)
    7. Loading component should be loaded into here
    8. What happens when you click on a marker?
    9. How can I make this component more dynamic so I can use it as a minimap.
*/

const Marker = (props) => <div className={props.className} onClick={() => alert("You clicked me")}>{props.text}</div>;

class NewMap extends Component {

  static defaultProps = {
    zoom: 12
  };

  renderMap = () => {
    if(this.props.loading) return null;
    return (
    <GoogleMapReact
          bootstrapURLKeys={{ key: key}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {
            this.props.restaurants.map(rest => {
              let currentStyle = "pin";
              if(this.props.currentRestaurant === rest.id) {
                console.log("This runs here!");
                currentStyle = "pin-highlighted"
              }
              return <Marker lat={rest.coordinates.latitude} lng={rest.coordinates.longitude} text={rest.name}  className={currentStyle}/>
            }
            )
          }<Marker
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            text="Robert Checco"
          />
    </GoogleMapReact> );
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="map-container">
        {this.renderMap()}
      </div>
    );
  }
}

export default NewMap;