import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import '../styles/navbar.css';

const NavBar = (props) => {
    if (props.auth) {
        return(
            <nav className="nav-container">
                <div className="navigation">
                    <Link to="/" style={{textDecoration: 'none'}}><Logo /></Link>
                    <form className="search-container" onSubmit={props.submit}>
                        <label className="search-label">
                            <input className="nav-searchbar" type='text' value={props.value} onChange={props.change} placeholder="tacos, cheap dinner, Cafe Mogador"></input>
                            <input className="nav-searchbar" type='text' value={props.location} onChange={props.changeLocation} placeholder="address, neighborhood, city, state, or zip"></input>
                        </label>
                            <input className="nav-search-button" type='submit' value="Go"></input>
                    </form>
                    {/* <Link to="/auth" className="signin" style={{textDecoration: 'none'}} >Sign in / Sign up</Link> */}
                    <Button className="nav-auth-button" text="Sign out" dest="/signout" />
                </div>
            </nav>
        );
    } 
    return(
        <nav className="nav-container">
            <div className="navigation">
                <Link to="/" style={{textDecoration: 'none'}}><Logo /></Link>
                <form className="search-container" onSubmit={props.submit}>
                    <label className="search-label">
                        <input className="nav-searchbar" type='text' value={props.value} onChange={props.change} placeholder="tacos, cheap dinner, Cafe Mogador"></input>
                        <input className="nav-searchbar" type='text' value={props.location} onChange={props.changeLocation} placeholder="address, neighborhood, city, state, or zip"></input>
                    </label>
                        <input className="nav-search-button" type='submit' value="Go"></input>
                </form>
                {/* <Link to="/auth" className="signin" style={{textDecoration: 'none'}} >Sign in / Sign up</Link> */}
                <Button className="nav-auth-button" text="Sign In" dest="/signin" />
                <Button className="nav-auth-button-acc" text="Sign Up" dest="/auth" />
            </div>
        </nav>
    );
}

function mapStateToProps(state) {
    return { auth: state.auth.authenticated }
}

export default connect(mapStateToProps)(NavBar);