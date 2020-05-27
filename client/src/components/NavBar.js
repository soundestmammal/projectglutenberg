import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const NavBar = (props) => {
    return(
        <nav className="nav-container">
            <div className="navigation">
                <Link to="/">Project Glutenberg</Link>
                <form className="search" onSubmit={props.submit}>
                    <label>
                        <input className="nav-searchbar" type='text' value={props.value} onChange={props.change}></input>
                    </label>
                        <input className="nav-search-button" type='submit' value='Submit'></input>
                </form>
                <Link to="/auth">Sign in / Sign up</Link>
            </div>
        </nav>
    );
}

export default NavBar;