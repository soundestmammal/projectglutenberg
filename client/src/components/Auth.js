import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Button from './Button';
import "../styles/auth.css"

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    handleChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }


    render() {
        return(
            <div className="auth-wrapper">
                <div className="auth-container">
                    <div className="auth-lock"><FontAwesomeIcon size="2x" icon={['fas', 'lock']}/></div>
                    <span className="auth-title">Sign in</span>
                    <input type="text" placeholder="Email Address" value={this.state.email} />
                    <input type="password" placeholder="Password" value={this.state.password} />
                    <Button className="auth-button" text="SIGN IN"/>
                    <div className="auth-troubleshoot">
                        <Link style={{textDecoration: 'none'}}>Forgot Password</Link>
                        <Link style={{textDecoration: 'none'}}>Don't have an account? Sign Up</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Auth;