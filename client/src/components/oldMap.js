import React from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { KEYS } from '../KEYS';
import "../styles/map.css";
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const _ = require('lodash');

const Map = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${KEYS}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `90vh`, flexGrow: `3` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({
        componentWillMount() {

            // This is from when I was fetching the users location to set center of map

            const refs = {}

            this.setState({
                bounds: null,
                center: { 
                    lat: this.props.lat, lng: this.props.lng
                },
                markers: [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: _.debounce( () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                }, 200,
                { maxWait: 500}),
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new window.google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    // Future developer: Why is this highlighted? Can it be removed?
                    // refs.map.fitBounds(bounds);
                },
            })
        },
    }),
    withScriptjs,
    withGoogleMap
    )((props) => {
        if(props.loading) return null;
        return (
            <GoogleMap
                ref={props.onMapMounted}
                defaultZoom={15}
                center={props.center}
                onBoundsChanged={props.onBoundsChanged}
            >
                <SearchBox
                    ref={props.onSearchBoxMounted}
                    bounds={props.bounds}
                    controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
                    onPlacesChanged={props.onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Customized your placeholder"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            marginTop: `27px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0,0,0,0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`
                        }}
                    />
                </SearchBox>
                {props.markers.map((marker, index) =>
                    <Marker key={index} position={marker.position} />
                )}
            </GoogleMap>
        );
});

export default Map;