import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import '../styles/navbar.css';

const NavBar = (props) => {
    return(
        <nav className="nav-container">
            <div className="navigation">
                <Link to="/" style={{textDecoration: 'none'}}><Logo /></Link>
                <form className="search-container" onSubmit={props.submit}>
                    <label className="search-label">
                        <input className="nav-searchbar" type='text' value={props.value} onChange={props.change}></input>
                        <input className="nav-searchbar" type='text' value={props.location} onChange={props.changeLocation}></input>
                    </label>
                        <input className="nav-search-button" type='submit' value="Go"></input>
                </form>
                {/* <Link to="/auth" className="signin" style={{textDecoration: 'none'}} >Sign in / Sign up</Link> */}
                <Button className="nav-auth-button" text="Sign In" dest="/auth" />
                <Button className="nav-auth-button-acc" text="Sign Up" dest="/auth" />
            </div>
        </nav>
    );
}

export default NavBar;