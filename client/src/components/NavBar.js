import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from './Logo';
import * as actions from '../actions';
import Button from './Button';
import '../styles/navbar.css';

class NavBar extends Component {

    /**
     * Base64 Encoding
     * @param Buffer object
     * @return base64 string
     */
    arrayBufferToBase64 = (buffer) => {
        let binary = "";
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    /**
     * Generates string that can be passed to src={} in an img component
     * @return String
     */
    generateImageSrc = () => {
        const base64Flag = "data:image/png;base64,";
        const imageString = this.arrayBufferToBase64(this.props.auth.user.avatar.data);
        return base64Flag+imageString;
    }

    /**
     * Conditionally render avatar
     * 1. Default Icon
     * 2. User submitted avatar
     * @return JSX
     */
    renderAvatar = () => {
        if(this.props.auth.user === undefined || this.props.auth.user.avatar === undefined) {
            return <FontAwesomeIcon size="2x" icon={['fas', 'user']}/>
        }
        return <img className="nav-bar-avatar" src={this.generateImageSrc()} alt="random" />
    }

    render() {
        // If the user is authenticated: Show the avatar
        if (this.props.auth && this.props.auth.authenticated) {
            return(
                <nav className="nav-container">
                    <div className="navigation">
                        <Link to="/" style={{textDecoration: 'none'}}><Logo /></Link>
                        <form className="search-container" onSubmit={this.props.submit}>
                            <label className="search-label">
                                <input className="nav-searchbar" type='text' value={this.props.value} onChange={this.props.change} placeholder="tacos, cheap dinner, Cafe Mogador"></input>
                                <input className="nav-searchbar" type='text' value={this.props.location} onChange={this.props.changeLocation} placeholder="address, neighborhood, city, state, or zip"></input>
                            </label>
                                <input className="nav-search-button" type='submit' value="Go"></input>
                        </form>
                        {/* <Link to="/auth" className="signin" style={{textDecoration: 'none'}} >Sign in / Sign up</Link> */}
                        <Link to="/profile" className="profile-avatar">{this.renderAvatar()}</Link>
                    </div>
                </nav>
            );
        } 
        // If user is !authenticated show signin/signup buttons
        return(
            <nav className="nav-container">
                <div className="navigation">
                    <Link to="/" style={{textDecoration: 'none'}}><Logo /></Link>
                    <form className="search-container" onSubmit={this.props.submit}>
                        <label className="search-label">
                            <input className="nav-searchbar" type='text' value={this.props.value} onChange={this.props.change} placeholder="tacos, cheap dinner, Cafe Mogador"></input>
                            <input className="nav-searchbar" type='text' value={this.props.location} onChange={this.props.changeLocation} placeholder="address, neighborhood, city, state, or zip"></input>
                        </label>
                            <input className="nav-search-button" type='submit' value="Go"></input>
                    </form>
                    <div className="nav-auth-button-container">
                        <Button className="nav-auth-button" text="Sign In" dest="/signin" />
                        <Button className="nav-auth-button-acc" text="Sign Up" dest="/auth" />
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth};
}

export default connect(mapStateToProps, actions)(NavBar);