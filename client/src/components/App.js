import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router } from 'react-router-dom';
// import ReactGA from 'react-ga';

import * as actions from '../actions';
import List from './List';
import NewMap from './NewMap';
import NavBar from './NavBar';
import Business from './Business';
import Auth from './Auth';
import Profile from './Profile';
import Signout from './Signout';
import Signin from './Signin';
import Landing from './Landing';
import Footer from './Footer';

import { API_ROOT } from '../api-config';

// Removed from 0.3 production
// import AdminAuth from '../admin/components/AdminAuth';
// import AdminDashboard from '../admin/components/AdminDashboard';
import '../styles/app.css';
library.add(fas);

// const MIMI = "";
// ReactGA.initialize(MIMI);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientLat: 0,
            clientLong: 0,
            mapLat: 0,
            mapLong: 0,
            loading: true,
            restaurants: [],
            searchbox: '',
            searchLocation: '',
            currentRestaurant: '',
            currentRestaurantData: null,
            searchCheckbox: false,
            mimi: '',
            googleMapsKey: ''
        };
    }

    /* Asynchronous function to my express server
    Passes as query parameters
        * Lat
        * Long
        * Searchbox

    Hm, is this the best way to be passing this information? 
  */
    getYelpData = async () => {
        if (!this.state.loading) {
            const response = await axios.get(
                `${API_ROOT}/yelp/?latitude=${this.state.mapLat}&longitude=${this.state.mapLong}&searchbox=${this.state.searchbox}`
            );
            this.setState({ restaurants: response.data });
        }
    };

    /* 
    The Map component must be provided an object that contains the center coordinates for the map.
    This function packages loosely held state into a clean predictable data structure.
    { lat: Number, lng: Number }
  */
    returnCenter = () => {
        const lat = this.state.mapLat;
        const long = this.state.mapLong;
        const center = {};
        center['lat'] = lat;
        center['lng'] = long;
        return center;
    };

    // Why: I use ip-api.com because the window.geolocation was not reliable
    getLocationV4 = async () => {
        const response = await axios.get(`${API_ROOT}/location/client`);
        let latitude = parseFloat(response.data.latitude);
        let longitude = parseFloat(response.data.longitude);
        this.setState({
            clientLat: latitude,
            clientLong: longitude,
            mapLat: latitude,
            mapLong: longitude,
            loading: false,
        });
    };

    // handleChange & handleSubmit are used in the searchbar feature of NavBar component
    handleChange = (e) => {
        this.setState({ searchbox: e.target.value });
    };

    handleLocationChange = (e) => {
        this.setState({ searchLocation: e.target.value });
    };

    forwardGeocode = async () => {
        const { clientLat, clientLong, searchLocation } = this.state;
        const response = await axios.get(
            `${API_ROOT}/location/forwardgeocode/?lat=${clientLat}&lng=${clientLong}&location=${searchLocation}`
        );
        this.setState({
            mapLat: response.data.lat,
            mapLong: response.data.lng,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // getYelpData has access to the application state, and does not need to be passed any information.
        this.forwardGeocode().then(this.getYelpData);
    };

    // When I click on the list card
    handleRestaurantSelection = async () => {
        // setState to null bc otherwise the "previous" currentRestaurantData will render to the page while the async function is running.
        // Its a poor user experience to show wrong and then quickly cut out
        // Instead since the state will be null, I can condidtionally render a loading component :)
        this.setState({ currentRestaurantData: null });

        // Request to my express server for the specific business information
        const response = await axios.get(
            `${API_ROOT}/yelp/business/${this.state.currentRestaurant}`
        );
        this.setState({ currentRestaurantData: response.data });
    };

    // This is the function that runs when I hover
    setCurrentRestaurant = (key) => {
        this.setState({ currentRestaurant: key });
    };

    setMapCoords = (coordinates) => {
        if (this.state.searchCheckbox) {
            const { lat, lng } = coordinates;
            this.setState({ mapLat: lat, mapLong: lng });
        }
    };

    // Toggle the search feature
    toggleSearchOnMapMove = () => {
        if (this.state.searchCheckbox === true) {
            this.setState({ searchCheckbox: false });
        } else {
            this.setState({ searchCheckbox: true });
        }
    };

    fetchMapsApiKey = async () => {
        const response = await axios.get(`${API_ROOT}/googleMapsKey`);
        // const response = await axios.get('/api/googleMapsKey');

        this.setState({ googleMapsKey: response.data });
    }

    componentDidMount() {
        // Check the authentication status. If the user is authenticated I want to fetchUser information
        // I did this because I can only run the getYelp data once I get the lat and long
        this.getLocationV4().then(this.getYelpData);
        if (this.props.auth.authenticated) {
            this.props.fetchUser(this.props.auth.authenticated);
        }

        this.fetchMapsApiKey()
        // ReactGA.pageview(window.location.pathname);
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <Landing />
                        </Route>
                        <Route exact path='/app'>
                            <div style={{ margin: 0, padding: 0 }}>
                                <NavBar
                                    value={this.state.searchbox}
                                    submit={this.handleSubmit}
                                    change={this.handleChange}
                                    location={this.state.searchLocation}
                                    changeLocation={this.handleLocationChange}
                                />
                            </div>
                            <div className='map-list-wrapper'>
                                <List
                                    restaurants={this.state.restaurants}
                                    hover={this.setCurrentRestaurant}
                                    navigate={this.handleRestaurantSelection}
                                />
                                <NewMap
                                    center={this.returnCenter()}
                                    loading={this.state.loading}
                                    restaurants={this.state.restaurants}
                                    currentRestaurant={
                                        this.state.currentRestaurant
                                    }
                                    onDragMap={this.setMapCoords}
                                    getNewData={this.getYelpData}
                                    toggle={this.toggleSearchOnMapMove}
                                    checked={this.state.searchCheckbox}
                                    hover={this.setCurrentRestaurant}
                                    navigate={this.handleRestaurantSelection}
                                    googleMapsKey={this.state.googleMapsKey}
                                />
                            </div>
                        </Route>

                        <Route
                            path={`/app/biz/${this.state.currentRestaurant}`}
                        >
                            <div style={{ margin: 0, padding: 0 }}>
                                <NavBar
                                    value={this.state.searchbox}
                                    submit={this.handleSubmit}
                                    change={this.handleChange}
                                />
                            </div>
                            <Business rest={this.state.currentRestaurantData} googleMapsKey={this.state.googleMapsKey} />
                        </Route>

                        <Route path='/auth'>
                            <div style={{ margin: 0, padding: 0 }}>
                                <NavBar
                                    value={this.state.searchbox}
                                    submit={this.handleSubmit}
                                    change={this.handleChange}
                                />
                                <Auth />
                            </div>
                        </Route>

                        <Route path='/profile'>
                            <NavBar
                                value={this.state.searchbox}
                                submit={this.handleSubmit}
                                change={this.handleChange}
                            />
                            <Profile
                                uuid={this.state.uuid}
                                token={this.state.token}
                            />
                        </Route>

                        <Route path='/signin'>
                            <NavBar
                                value={this.state.searchbox}
                                submit={this.handleSubmit}
                                change={this.handleChange}
                            />
                            <Signin />
                        </Route>

                        <Route path='/signout'>
                            <NavBar
                                value={this.state.searchbox}
                                submit={this.handleSubmit}
                                change={this.handleChange}
                            />
                            <Signout />
                        </Route>
                        {/* <Route path="/admin">
            <NavBar 
              value={this.state.searchbox}
              submit={this.handleSubmit}
              change={this.handleChange}
            />
            <AdminAuth />
          </Route>

          <Route path="/admin/dashboard">
            <NavBar 
              value={this.state.searchbox}
              submit={this.handleSubmit}
              change={this.handleChange}
            />
            <AdminDashboard />
          </Route> */}
                    </Switch>
                </Router>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(App);
