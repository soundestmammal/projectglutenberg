import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import '../styles/navbar.css';

const NavBar = (props) => {
    return(
        <nav className="nav-container">
            <div className="navigation">
                <Link to="/" style={{textDecoration: 'none'}}><Logo /></Link>
                <form className="search" onSubmit={props.submit}>
                    <label>
                        <input className="nav-searchbar" type='text' value={props.value} onChange={props.change}></input>
                    </label>
                        <input className="nav-search-button" type='submit' value='Submit'></input>
                </form>
                {/* <Link to="/auth" className="signin" style={{textDecoration: 'none'}} >Sign in / Sign up</Link> */}
                <Button text="Sign In" />
                <Button text="Sign Up" />
            </div>
        </nav>
    );
}

export default NavBar;