import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../actions';
import List from './List';
import NewMap from './NewMap';
import NavBar from './NavBar';
import Business from './Business';
import Auth from './Auth';
import Profile from './Profile';
import Signout from './Signout';
import Signin from './Signin';
import "../styles/app.css";
library.add(fas);

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
      searchCheckbox: false
    }
  }

  /* Asynchronous function to my express server
    Passes as query parameters
        * Lat
        * Long
        * Searchbox

    Hm, is this the best way to be passing this information? 
  */
  getYelpData = async () => {
    if(!this.state.loading) {
      const response = await axios.get(`http://localhost:3090/yelp/?latitude=${this.state.mapLat}&longitude=${this.state.mapLong}&searchbox=${this.state.searchbox}`);
      console.log("This is the response from the GET /yelp api call ", response);
      this.setState({ restaurants: response.data });
    }
  }

  /* 
    The Map component must be provided an object that contains the center coordinates for the map.
    This function packages loosely held state into a clean predictable data structure.
    { lat: Number, lng: Number }
  */
  returnCenter = () => {
    const lat = this.state.mapLat;
    const long = this.state.mapLong;
    const center = {};
    center["lat"] = lat;
    center["lng"] = long;
    return center;
  }

  // Why: I use ip-api.com because the window.geolocation was not reliable
  getLocation = async () => {
    const response = await axios.get("http://ip-api.com/json");
    this.setState({ clientLat: response.data.lat, 
                    clientLong: response.data.lon, 
                    mapLat: response.data.lat,
                    mapLong: response.data.lon,
                    loading: false 
                  });
  }

  // handleChange & handleSubmit are used in the searchbar feature of NavBar component
  handleChange = (e) => {
    this.setState({ searchbox: e.target.value });
  }

  handleLocationChange = (e) => {
    this.setState({ searchLocation: e.target.value });
  }

  forwardGeocode = async () => {
    const { clientLat, clientLong, searchLocation } = this.state;
    const response = await axios.get(`http://localhost:3090/forwardgeocode/?lat=${clientLat}&lng=${clientLong}&location=${searchLocation}`);
    this.setState({ mapLat: response.data.lat, mapLong: response.data.lng });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // getYelpData has access to the application state, and does not need to be passed any information.
    this.forwardGeocode().then(this.getYelpData);
  }

  // When I click on the list card
  handleRestaurantSelection = async() => {
    // setState to null bc otherwise the "previous" currentRestaurantData will render to the page while the async function is running.
    // Its a poor user experience to show wrong and then quickly cut out
    // Instead since the state will be null, I can condidtionally render a loading component :)
    this.setState({ currentRestaurantData: null});

    // Request to my express server for the specific business information
    const response = await axios.get(`http://localhost:3090/yelp/business/${this.state.currentRestaurant}`);
    this.setState({ currentRestaurantData: response.data});
  }

  // This is the function that runs when I hover
  setCurrentRestaurant = (key) => {
    this.setState({ currentRestaurant: key });
  }

  setMapCoords = (coordinates) => {
    if(this.state.searchCheckbox) {
      const {lat, lng} = coordinates;
      this.setState({ mapLat: lat, mapLong: lng });
    }
  }

  // Toggle the search feature
  toggleSearchOnMapMove = () => {
    if(this.state.searchCheckbox === true) {
      this.setState({searchCheckbox: false});
    } else {
      this.setState({ searchCheckbox: true})
    }
  }

  componentDidMount() {
    // Check the authentication status. If the user is authenticated I want to fetchUser information
    // I did this because I can only run the getYelp data once I get the lat and long
    this.getLocation().then(this.getYelpData);
    if(this.props.auth.authenticated) {
      this.props.fetchUser(this.props.auth.authenticated);
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <div style={{margin: 0, padding: 0}}>
              <NavBar 
                value={this.state.searchbox}
                submit={this.handleSubmit}
                change={this.handleChange}
                location={this.state.searchLocation}
                changeLocation={this.handleLocationChange}
              />
            </div>
            <div className="map-list-wrapper">
              <List 
                restaurants={this.state.restaurants}
                hover={this.setCurrentRestaurant}
                navigate={this.handleRestaurantSelection}
              />
              <NewMap
                center={this.returnCenter()}
                loading={this.state.loading}
                restaurants={this.state.restaurants}
                currentRestaurant={this.state.currentRestaurant}
                onDragMap={this.setMapCoords}
                getNewData={this.getYelpData}
                toggle={this.toggleSearchOnMapMove}
                checked={this.state.searchCheckbox}
                hover={this.setCurrentRestaurant}
                navigate={this.handleRestaurantSelection}
              />
            </div>
          </Route>
        <Route path={`/biz/${this.state.currentRestaurant}`}>
          <div style={{margin: 0, padding: 0}}>
            <NavBar 
              value={this.state.searchbox}
              submit={this.handleSubmit}
              change={this.handleChange}
            />
          </div>
            <Business 
              rest={this.state.currentRestaurantData}
            />
          </Route>
          <Route path="/auth">
            <div style={{margin: 0, padding: 0}}>
              <NavBar 
                value={this.state.searchbox}
                submit={this.handleSubmit}
                change={this.handleChange}
              />
              <Auth />
            </div>
          </Route>
          <Route path="/profile">
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
          
          <Route path="/signin">
            <NavBar 
              value={this.state.searchbox}
              submit={this.handleSubmit}
              change={this.handleChange}
            />
            <Signin />
          </Route>
          <Route path="/signout">
            <NavBar 
              value={this.state.searchbox}
              submit={this.handleSubmit}
              change={this.handleChange}
            />
            <Signout />
          </Route>
      </Switch>  
    </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(App);