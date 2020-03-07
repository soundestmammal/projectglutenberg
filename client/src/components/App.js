import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Header from './Header';
import List from './List';
import Map from './Map';
import "../styles/app.css";

/*
  I am using React Router Dom to help with my navigation around my application.
  I wrapped my entire application in a Router tag so the entire application is right here. If I need to nest any routes then I can do that right here.
*/

const App = () => {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/product">Product</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/product">
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
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
         
      </Router>
    );
}

export default App;