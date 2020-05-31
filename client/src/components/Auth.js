import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect, Link } from 'react-router-dom';
// import Button from './Button';
import "../styles/auth.css"

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            toDashboard: false
        }
    }

    onSubmit = () => {
        this.props.signup(this.state.email, this.state.password);
    }

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
        console.log(this.state.email);
    }

    handleChangePassword = (e) => {
        this.setState({ password: e.target.value });
        console.log(this.state.password)
    }

    submitAuthRequest = () => {
        console.log("This is the auth request", this.state.email, this.state.password);
    }

    render() {
        if(this.state.toDashboard === true) {
            return <Redirect to="/feature" />
        }

        return(
            <div className="auth-wrapper">
                <div className="auth-container">
                    <div className="auth-lock"><FontAwesomeIcon size="2x" icon={['fas', 'lock']}/></div>
                    <span className="auth-title">Sign in</span>
                    <input type="text" placeholder="Email Address" value={this.state.email} onChange={this.handleChangeEmail} />
                    <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
                    {/* <button className="auth-button" text="SIGN IN" onClick={() => this.props.trythis(this.state.email, this.state.password).then( this.setState({toDashboard: true}))}>Submit!!!</button> */}
                    <button className="auth-button" text="SIGN IN" onClick={() => this.onSubmit()} >Submit!!!</button>
                    <div className="auth-troubleshoot">
                        <Link style={{textDecoration: 'none'}}>Forgot Password</Link>
                        <Link style={{textDecoration: 'none'}}>Don't have an account? Sign Up</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Auth);