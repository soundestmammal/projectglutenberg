import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import * as actions from '../actions';
import Button from './Button';
import '../styles/navbar.css';

class NavBar extends React.Component {
    componentDidMount() {
        console.log("This is the token outside the if", this.props);
        if(this.props.auth !== "") {
            const token = this.props.auth + "";
            this.props.fetchUser(token);
        }
    }
    render() {
        if (this.props.auth) {
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
                        <Link to="/profile" className="profile-avatar"><FontAwesomeIcon size="2x" icon={['fas', 'user']}/></Link>
                    </div>
                </nav>
            );
        } 
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
    return { auth: state.auth.authenticated, uuid: state.auth.uuid }
}

export default connect(mapStateToProps, actions)(NavBar);