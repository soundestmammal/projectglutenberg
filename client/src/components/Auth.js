import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
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
        this.props.signup(this.state.email, this.state.password, () => {
            this.setState({ toDashboard: true });
        });
    }

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
        console.log(this.state.email);
    }

    handleChangePassword = (e) => {
        this.setState({ password: e.target.value });
        console.log(this.state.password)
    }

    render() {
        if(this.state.toDashboard === true) {
            return <Redirect to="/profile" />
        }

        return(
            <div className="auth-wrapper">
                <div className="auth-container">
                    <div className="auth-lock"><FontAwesomeIcon size="2x" icon={['fas', 'lock']}/></div>
                    <span className="auth-title">Sign up</span>
                    <input type="text" placeholder="Email Address" value={this.state.email} onChange={this.handleChangeEmail} />
                    <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
                    <div>{this.props.errorMessage}</div>
                    <button className="auth-button" text="SIGN IN" onClick={() => this.onSubmit()} >Sign Up</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default connect(mapStateToProps, actions)(Auth);