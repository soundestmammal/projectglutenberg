import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import List from './List';
import NewMap from './NewMap';
import NavBar from './NavBar';
import Business from './Business';
import Auth from './Auth';
import Feature from './Feature';
import "../styles/app.css";
library.add(fas);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      long: 0,
      loading: true,
      restaurants: [],
      searchbox: '',
      searchLocation: '',
      currentRestaurant: '',
      currentRestaurantData: null, 
      uuid: null,
      token: null,
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
      const response = await axios.get(`http://localhost:3090/yelp/?latitude=${this.state.lat}&longitude=${this.state.long}&searchbox=${this.state.searchbox}`);
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
    const lat = this.state.lat;
    const long = this.state.long;
    const center = {};
    center["lat"] = lat;
    center["lng"] = long;
    return center;
  }

  // Why: I use ip-api.com because the window.geolocation was not reliable
  getLocation = async () => {
    const response = await axios.get("http://ip-api.com/json");
    this.setState({ lat: response.data.lat, long: response.data.lon, loading: false })
  }

  // handleChange & handleSubmit are used in the searchbar feature of NavBar component
  handleChange = (e) => {
    this.setState({ searchbox: e.target.value });
  }

  handleLocationChange = (e) => {
    this.setState({ searchLocation: e.target.value });
    console.log(this.state.searchLocation);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // getYelpData has access to the application state, and does not need to be passed any information.
    this.getYelpData();
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
    console.log(this.state.currentRestaurant);
  }

  /* 
    I have to do a sequence of things.

    1. I need to pass a function to the auth component for when I want to submit
    2. I need to call that funciton in the auth component
    3. I need to hit the correct route
    4. I need to pass the correct information to the api
    5. I need to receive the response
    6. I need to setState for uuid and token
  */

  submitUserSignup = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:3090/users`, { "email": email, "password": password });
        this.setState({ uuid: response.data.user._id, token: response.data.token });
        localStorage.setItem('token', response.data.token);
      // Once I set the state, I want to send the user to another page
    } catch(e) {
      console.log(e);
    }
    
  }

  componentDidMount() {
    // I did this because I can only run the getYelp data once I get the lat and long
    this.getLocation().then(this.getYelpData);
    this.setState({ token: localStorage.getItem('token')})
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
              <Auth 
                trythis={this.submitUserSignup}
              />
            </div>
          </Route>
          <Route>
            <Feature 
              uuid={this.state.uuid}
              token={this.state.token}
            />
          </Route>
      </Switch>  
    </div>
    );
  }
}

export default App;