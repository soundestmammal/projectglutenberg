import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapCheckbox from './MapCheckbox';
import Marker from './Marker';
import { googleMapsApiKey } from '../test';
import '../styles/map.css';

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

class NewMap extends Component {
    static defaultProps = {
        zoom: 13,
    };

    componentDidUpdate(prevProps) {
        if (
            this.props.center.lat !== prevProps.center.lat ||
            this.props.center.lng !== prevProps.center.lng
        ) {
            this.props.getNewData();
        }
    }

    onChange = ({ center }) => {
        this.props.onDragMap(center);
    };

    renderMap = () => {
        if (this.props.loading) return null;
        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key: googleMapsApiKey }}
                center={this.props.center}
                zoom={this.props.zoom}
                onChange={this.onChange}
            >
                {this.props.restaurants.map((rest, index) => {
                    let currentStyle = 'pin';
                    if (this.props.currentRestaurant === rest.id) {
                        currentStyle = 'pin-highlighted';
                    }
                    return (
                        <Marker
                            lat={rest.coordinates.latitude}
                            lng={rest.coordinates.longitude}
                            text={index + 1}
                            className={currentStyle}
                            key={rest.id}
                            data={rest}
                            hover={this.props.hover}
                            navigate={this.props.navigate}
                        />
                    );
                })}
            </GoogleMapReact>
        );
    };

    render() {
        return (
            <div className='map-container'>
                {this.renderMap()}
                <MapCheckbox
                    toggle={this.props.toggle}
                    checked={this.props.checked}
                />
                <div className='map-overlay'></div>
            </div>
        );
    }
}

export default NewMap;
